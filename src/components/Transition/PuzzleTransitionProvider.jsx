import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const PuzzleTransitionContext = createContext(null);

const routeComponents = new Set(['background', 'passions', 'skills', 'process', 'projects', 'next']);

const getRoute = () => {
  if (!window.location.hash.startsWith('#/')) return null;
  const route = window.location.hash.slice(2).split('/')[0];
  return routeComponents.has(route) ? route : null;
};

const getClockwiseUprightTarget = (currentRotation) => {
  const uprightTarget = Math.ceil((currentRotation + 1) / 360) * 360;
  return Math.max(uprightTarget, currentRotation + 360);
};

export function PuzzleTransitionProvider({ children }) {
  const [route, setRoute] = useState(getRoute);
  const [transition, setTransition] = useState({ active: false, direction: null, route: null });
  const layerRef = useRef(null);
  const cloneRef = useRef(null);
  const timelineRef = useRef(null);
  const activeRef = useRef(false);
  const directionRef = useRef(null);
  const destinationTargets = useRef(new Map());
  const puzzleTargets = useRef(new Map());
  const pendingHashRef = useRef(null);
  const previousRouteRef = useRef(route);
  const watchdogRef = useRef(null);
  const accumulatedRotationRef = useRef(0);
  const reversePuzzleScrollPendingRef = useRef(false);

  const navigate = useCallback((nextRoute) => {
    const hash = nextRoute ? `/${nextRoute}` : '/';
    pendingHashRef.current = `#${hash}`;
    window.location.hash = hash;
  }, []);

  useEffect(() => {
    previousRouteRef.current = route;
  }, [route]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = getRoute();

      if (pendingHashRef.current === window.location.hash) {
        pendingHashRef.current = null;
      } else if (
        activeRef.current &&
        directionRef.current === 'forward'
      ) {
        timelineRef.current?.kill();
        cloneRef.current?.remove();
        cloneRef.current = null;
        activeRef.current = false;
        directionRef.current = null;
        setTransition({ active: false, direction: null, route: null });
      } else if (
        !activeRef.current &&
        previousRouteRef.current &&
        nextRoute === null
      ) {
        const sourceRoute = previousRouteRef.current;
        const anchor = document.querySelector('.dedicated-piece-anchor');
        if (anchor) {
          activeRef.current = true;
          directionRef.current = 'reverse';
          setTransition({ active: true, direction: 'reverse', route: sourceRoute });

          const destinationImage = anchor.querySelector('img') || anchor;
          const rect = destinationImage.getBoundingClientRect();
          const clone = destinationImage.cloneNode(true);
          clone.removeAttribute('aria-label');
          clone.className = 'puzzle-cutout-clone';
          clone.style.left = `${rect.left}px`;
          clone.style.top = `${rect.top}px`;
          clone.style.width = `${rect.width}px`;
          clone.style.height = `${rect.height}px`;
          clone.style.margin = '0';
          clone.style.opacity = '1';
          clone.style.pointerEvents = 'none';
          clone.style.transform = 'none';
          layerRef.current.appendChild(clone);
          cloneRef.current = clone;
          gsap.set(anchor, { opacity: 0 });
          gsap.set(clone, {
            transformPerspective: 900,
            transformOrigin: '50% 50%',
            force3D: true,
            backfaceVisibility: 'hidden',
            x: 0,
            y: 0,
            scale: 1,
            rotation: accumulatedRotationRef.current
          });
          timelineRef.current = gsap.timeline();
          const startRotation = Number(gsap.getProperty(clone, 'rotation')) || 0;
          const targetRotation = getClockwiseUprightTarget(startRotation + 720);
          timelineRef.current.to(clone, {
            rotation: `${targetRotation}_cw`,
            duration: 0.38,
            ease: 'power3.inOut',
            force3D: true,
            onUpdate: () => {
              accumulatedRotationRef.current = Number(gsap.getProperty(clone, 'rotation')) || 0;
            }
          }, 0).to(clone, {
            scale: 1.25,
            rotationX: 8,
            rotationY: -10,
            duration: 0.38,
            ease: 'power2.out'
          });
        }
      }

      if (activeRef.current && directionRef.current === 'reverse' && nextRoute === null) {
        reversePuzzleScrollPendingRef.current = true;
      }

      setRoute(nextRoute);
      if (!(activeRef.current && directionRef.current === 'reverse' && nextRoute === null)) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const clearTransition = useCallback((clone, target) => {
    window.clearTimeout(watchdogRef.current);
    watchdogRef.current = null;
    timelineRef.current?.kill();
    timelineRef.current = null;
    const puzzleLabels = document.querySelectorAll('.puzzle-label');
    if (puzzleLabels.length) {
      gsap.set(puzzleLabels, { opacity: 1, visibility: 'visible' });
      gsap.set(puzzleLabels, { clearProps: 'opacity,visibility' });
    }
    clone?.remove();
    cloneRef.current = null;
    activeRef.current = false;
    directionRef.current = null;
    setTransition({ active: false, direction: null, route: null });
    if (target) gsap.set(target, { opacity: 1, scale: 1, clearProps: 'transform' });
  }, []);

  const registerDestinationTarget = useCallback((targetRoute, element) => {
    if (!element) return;
    destinationTargets.current.set(targetRoute, element);
  }, []);

  const registerPuzzleTarget = useCallback((targetRoute, element) => {
    if (!element) return;
    puzzleTargets.current.set(targetRoute, element);
  }, []);

  const runReverseToPuzzle = useCallback((targetRoute) => {
    const clone = cloneRef.current;
    const element = puzzleTargets.current.get(targetRoute);
    if (!clone || !element) return false;

    const targetRect = element.getBoundingClientRect();
    gsap.set(element, { opacity: 0 });

    const cloneRect = clone.getBoundingClientRect();
    const reverseTimeline = gsap.timeline({
      onComplete: () => {
        const otherPieces = Array.from(document.querySelectorAll('.puzzle-piece'))
          .filter((piece) => piece !== element);
        gsap.set(element, { opacity: 1 });
        const puzzleLabels = document.querySelectorAll('.puzzle-label');
        gsap.set(puzzleLabels, { opacity: 1, visibility: 'visible' });
        gsap.set(puzzleLabels, { clearProps: 'opacity,visibility' });
        gsap.to(otherPieces, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.18,
          stagger: 0.025,
          ease: 'power3.out'
        });
        clearTransition(clone, element);
      }
    });
    timelineRef.current = reverseTimeline;
    reverseTimeline.to(clone, {
      x: targetRect.left + targetRect.width * 0.5 - (cloneRect.left + cloneRect.width * 0.5),
      y: targetRect.top + targetRect.height * 0.5 - (cloneRect.top + cloneRect.height * 0.5),
      scale: targetRect.width / cloneRect.width,
      rotationX: -4,
      rotationY: 3,
      duration: 0.42,
      ease: 'power3.in'
    }).to(clone, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.18,
      ease: 'back.out(1.25)'
    });

    const otherPieces = Array.from(document.querySelectorAll('.puzzle-piece'))
      .filter((piece) => piece !== element);
    otherPieces.forEach((piece, index) => {
      reverseTimeline.to(piece, {
        x: index % 2 === 0 ? -2 : 2,
        y: index % 3 === 0 ? -1 : 1,
        duration: 0.12,
        ease: 'power2.out'
      }, '-=.14');
    });
    return true;
  }, [clearTransition]);

  useEffect(() => {
    if (
      route !== null ||
      !activeRef.current ||
      directionRef.current !== 'reverse' ||
      !reversePuzzleScrollPendingRef.current
    ) return;

    const targetRoute = transition.route;
    reversePuzzleScrollPendingRef.current = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const puzzle = document.querySelector('#puzzle');
        if (puzzle) {
          const puzzleTop = puzzle.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: puzzleTop, behavior: 'instant' });
        }

        if (targetRoute) runReverseToPuzzle(targetRoute);
      });
    });
  }, [route, runReverseToPuzzle, transition.route]);

  useEffect(() => {
    if (!route) return;
    if (
      activeRef.current &&
      directionRef.current === 'forward' &&
      transition.route === route
    ) {
      const target = destinationTargets.current.get(route);
      const clone = cloneRef.current;
      if (!target || !clone) return;

      requestAnimationFrame(() => {
        const targetRect = target.getBoundingClientRect();
        gsap.set(target, { opacity: 0 });
        if (!timelineRef.current) {
          clearTransition(clone, target);
          return;
        }
        const cloneRect = clone.getBoundingClientRect();
        const dx = targetRect.left + targetRect.width * 0.5 - (cloneRect.left + cloneRect.width * 0.5);
        const dy = targetRect.top + targetRect.height * 0.5 - (cloneRect.top + cloneRect.height * 0.5);
        const settleScale = targetRect.width / cloneRect.width;
        const currentX = Number(gsap.getProperty(clone, 'x')) || 0;
        const currentY = Number(gsap.getProperty(clone, 'y')) || 0;
        timelineRef.current.to(clone, {
          x: currentX + dx,
          y: currentY + dy,
          scale: settleScale,
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          autoAlpha: 1,
          visibility: 'visible',
          force3D: true,
          duration: 0.62,
          ease: 'power3.inOut',
          onComplete: () => {
            accumulatedRotationRef.current = Number(gsap.getProperty(clone, 'rotation')) || 0;
            gsap.set(target, { opacity: 1, scale: 1 });
            clearTransition(clone, target);
          }
        }, 1.08);
      });
    }
  }, [route, clearTransition, transition.route]);

  const startForward = useCallback((sourceElement, destinationRoute) => {
    if (activeRef.current || !sourceElement) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(destinationRoute);
      return true;
    }

    activeRef.current = true;
    directionRef.current = 'forward';
    setTransition({ active: true, direction: 'forward', route: destinationRoute });

    const sourceImage = sourceElement.querySelector('img') || sourceElement;
    const rect = sourceImage.getBoundingClientRect();
    const clone = sourceImage.cloneNode(true);
    clone.removeAttribute('href');
    clone.removeAttribute('aria-label');
    clone.className = 'puzzle-cutout-clone';
    clone.setAttribute('alt', '');
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.opacity = '1';
    clone.style.pointerEvents = 'none';
    layerRef.current.appendChild(clone);
    cloneRef.current = clone;

    const otherPieces = Array.from(document.querySelectorAll('.puzzle-piece'))
      .filter((piece) => piece !== sourceElement);
    gsap.set(clone, {
      transformPerspective: 900,
      transformOrigin: '50% 50%',
      filter: 'drop-shadow(0 18px 24px rgba(20,43,58,.28))',
      zIndex: 1000,
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      rotation: accumulatedRotationRef.current,
      rotationX: 0,
      rotationY: 0,
      force3D: true,
      backfaceVisibility: 'hidden',
      opacity: 1,
      visibility: 'visible',
      autoAlpha: 1
    });

    timelineRef.current = gsap.timeline();
    const startRotation = Number(gsap.getProperty(clone, 'rotation')) || 0;
    const targetRotation = getClockwiseUprightTarget(startRotation + 1080);
    timelineRef.current.to(clone, {
      rotation: `${targetRotation}_cw`,
      duration: 1.70,
      ease: 'power3.inOut',
      force3D: true,
      onUpdate: () => {
        accumulatedRotationRef.current = Number(gsap.getProperty(clone, 'rotation')) || 0;
      }
    }, 0);
    timelineRef.current
      .to(clone, {
        scale: 1.08,
        y: -7,
        duration: 0.18,
        ease: 'power3.out',
        force3D: true
      }, '<')
      .to(otherPieces, {
        opacity: 0,
        scale: 0.7,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.in'
      }, '<')
      .to(clone, {
        x: window.innerWidth * 0.5 - (rect.left + rect.width * 0.5),
        y: window.innerHeight * 0.44 - (rect.top + rect.height * 0.5),
        scale: window.innerWidth <= 720 ? 1.12 : 1.35,
        rotationX: 12,
        rotationY: -16,
        opacity: 1,
        autoAlpha: 1,
        visibility: 'visible',
        duration: 0.92,
        ease: 'power3.in',
        force3D: true,
        onStart: () => {
          gsap.set(clone, { opacity: 1 });
          gsap.set(sourceImage, { opacity: 0 });
          const sourceLabel = sourceElement.querySelector('.puzzle-label');
          if (sourceLabel) gsap.set(sourceLabel, { opacity: 0 });
        }
      }, 0.16)
      .call(() => {
        gsap.set(clone, { opacity: 1, autoAlpha: 1, visibility: 'visible', zIndex: 1000 });
        navigate(destinationRoute);
      }, null, 0.54);

    window.clearTimeout(watchdogRef.current);
    watchdogRef.current = window.setTimeout(() => {
      if (activeRef.current && directionRef.current === 'forward') {
        clearTransition(cloneRef.current, sourceElement);
      }
    }, 5000);

    return true;
  }, [clearTransition, navigate]);

  const startReverse = useCallback((sourceRoute, destinationElement) => {
    if (activeRef.current || !destinationElement) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate();
      return true;
    }

    activeRef.current = true;
    directionRef.current = 'reverse';
    setTransition({ active: true, direction: 'reverse', route: sourceRoute });

    const rect = destinationElement.getBoundingClientRect();
    const clone = destinationElement.cloneNode(true);
    clone.removeAttribute('href');
    clone.removeAttribute('aria-label');
    clone.className = 'puzzle-cutout-clone';
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.opacity = '1';
    clone.style.pointerEvents = 'none';
    layerRef.current.appendChild(clone);
    cloneRef.current = clone;
    gsap.set(destinationElement, { opacity: 0 });
    const destinationLabel = destinationElement.parentElement?.querySelector('span');
    if (destinationLabel) gsap.set(destinationLabel, { opacity: 0 });
    gsap.set(clone, {
      transformPerspective: 900,
      transformOrigin: '50% 50%',
      filter: 'drop-shadow(0 18px 24px rgba(20,43,58,.28))',
      force3D: true,
      backfaceVisibility: 'hidden',
      x: 0,
      y: 0,
      scale: 1,
      rotation: accumulatedRotationRef.current,
      rotationX: 0,
      rotationY: 0
    });

    const destinationPage = destinationElement.closest('.dedicated-page');
    const destinationContent = destinationPage?.querySelector('.section-content, .reflection, .site-footer');

    timelineRef.current = gsap.timeline();
    const startRotation = Number(gsap.getProperty(clone, 'rotation')) || 0;
    const targetRotation = getClockwiseUprightTarget(startRotation + 720);
    timelineRef.current.to(clone, {
      rotation: `${targetRotation}_cw`,
      duration: 0.62,
      ease: 'power3.inOut',
      force3D: true,
      onUpdate: () => {
        accumulatedRotationRef.current = Number(gsap.getProperty(clone, 'rotation')) || 0;
      }
    }, 0);
    if (destinationContent) {
      timelineRef.current.to(destinationContent, {
        opacity: 0.72,
        y: 10,
        scale: 0.985,
        duration: 0.34,
        ease: 'power3.out',
        force3D: true
      }, 0);
    }
    timelineRef.current
      .to(clone, {
        scale: 1.12,
        y: -18,
        rotationX: -12,
        rotationY: 10,
        duration: 0.28,
        ease: 'power3.out',
        force3D: true
      })
      .to(clone, {
        scale: 1.25,
        rotationX: 10,
        rotationY: -14,
        duration: 0.34,
        ease: 'power3.inOut',
        force3D: true
      })
      .call(() => navigate(), null, 0.62);

    window.setTimeout(() => {
      if (
        activeRef.current &&
        directionRef.current === 'reverse' &&
        window.location.hash === `#/${sourceRoute}`
      ) {
        navigate();
      }
    }, 720);

    window.clearTimeout(watchdogRef.current);
    watchdogRef.current = window.setTimeout(() => {
      if (activeRef.current && directionRef.current === 'reverse') {
        clearTransition(cloneRef.current, destinationElement);
        navigate();
      }
    }, 5000);

    return true;
  }, [clearTransition, navigate]);

  useEffect(() => () => {
    timelineRef.current?.kill();
    cloneRef.current?.remove();
  }, []);

  return (
    <PuzzleTransitionContext.Provider value={{
      route,
      transition,
      navigate,
      startForward,
      startReverse,
      registerDestinationTarget,
      registerPuzzleTarget
    }}>
      {children}
      <div ref={layerRef} className="puzzle-transition-layer" aria-hidden="true" />
    </PuzzleTransitionContext.Provider>
  );
}

PuzzleTransitionProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// eslint-disable-next-line react-refresh/only-export-components
export function usePuzzleTransition() {
  const context = useContext(PuzzleTransitionContext);
  if (!context) throw new Error('usePuzzleTransition must be used within PuzzleTransitionProvider');
  return context;
}
