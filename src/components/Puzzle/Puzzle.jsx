import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { puzzlePieces } from './puzzleData';
import { usePuzzleTransition } from '../Transition/PuzzleTransitionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Puzzle() {
  const puzzleRef = useRef(null);
  const pieceRefs = useRef([]);
  const hoverReadyRef = useRef(false);
  const assemblyRef = useRef(null);
  const idleRef = useRef(null);
  const hasAssembledRef = useRef(false);
  const { startForward, registerPuzzleTarget, transition } = usePuzzleTransition();

  useGSAP(() => {
    const pieces = pieceRefs.current.filter(Boolean);
    if (!pieces.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      gsap.set(pieces, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(puzzleRef.current.querySelectorAll('.puzzle-label'), { opacity: 1 });
      gsap.set(puzzleRef.current.querySelectorAll('.puzzle-label'), { clearProps: 'opacity,visibility' });
      hoverReadyRef.current = true;
    }
  }, { scope: puzzleRef });

  useLayoutEffect(() => {
    pieceRefs.current.forEach((piece, index) => {
      if (piece) {
        registerPuzzleTarget(puzzlePieces[index].id, piece.querySelector('img'));
      }
    });

    const pieces = pieceRefs.current.filter(Boolean);
    if (!pieces.length) return;

    if (hasAssembledRef.current) {
      const labels = puzzleRef.current.querySelectorAll('.puzzle-label');
      gsap.set(pieces, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(labels, { opacity: 1, visibility: 'visible' });
      gsap.set(labels, { clearProps: 'opacity,visibility' });
      hoverReadyRef.current = true;
      return;
    }

    if (transition.active && transition.direction === 'reverse') {
      gsap.set(pieces, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(puzzleRef.current.querySelectorAll('.puzzle-label'), { opacity: 1 });
      gsap.set(puzzleRef.current.querySelectorAll('.puzzle-label'), { clearProps: 'opacity,visibility' });
      hasAssembledRef.current = true;
      hoverReadyRef.current = true;
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(pieces, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(puzzleRef.current.querySelectorAll('.puzzle-label'), { opacity: 1 });
      gsap.set(puzzleRef.current.querySelectorAll('.puzzle-label'), { clearProps: 'opacity,visibility' });
      hoverReadyRef.current = true;
      return;
    }

    const labels = puzzleRef.current.querySelectorAll('.puzzle-label');
    const idle = () => {
      if (idleRef.current) idleRef.current.kill();
      idleRef.current = gsap.timeline();
      pieces.forEach((piece, index) => {
        idleRef.current.to(piece.querySelector('img'), {
          y: -(4 + Math.random() * 3),
          duration: 1.8 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        }, index * 0.08);
      });
      hoverReadyRef.current = true;
    };
    const assemble = () => {
      if (hasAssembledRef.current) return;
      hasAssembledRef.current = true;
      hoverReadyRef.current = false;
      assemblyRef.current?.kill();
      idleRef.current?.kill();
      idleRef.current = null;
      gsap.set(pieces, { opacity: 0 });
      gsap.set(labels, { opacity: 0 });

      assemblyRef.current = gsap.timeline({ onComplete: idle });
      pieces.forEach((piece, index) => {
        assemblyRef.current.fromTo(piece, {
          x: gsap.utils.random(-900, 900),
          y: gsap.utils.random(-700, 700),
          rotation: gsap.utils.random(-540, 540),
          scale: 0.2,
          opacity: 0
        }, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          clearProps: 'transform'
        }, index * 0.12);
      });
      assemblyRef.current.fromTo(labels, { opacity: 0 }, {
        opacity: 1,
        duration: 0.4,
        clearProps: 'opacity,visibility'
      }, '>-.3');
    };

    gsap.set(pieces, { opacity: 0 });
    gsap.set(labels, { opacity: 0 });
    const entranceTrigger = ScrollTrigger.create({
      trigger: puzzleRef.current,
      start: 'top 55%',
      once: true,
      onEnter: assemble
    });
    const introObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) assemble();
    }, { threshold: 0.55 });
    introObserver.observe(puzzleRef.current);

    const rect = puzzleRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0) assemble();

    return () => {
      entranceTrigger.kill();
      introObserver.disconnect();
      assemblyRef.current?.kill();
      idleRef.current?.kill();
      hasAssembledRef.current = false;
    };
  }, [registerPuzzleTarget, transition.active, transition.direction]);

  const handlePieceEnter = (index) => {
    if (!hoverReadyRef.current || transition.active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(pieceRefs.current[index], { scale: 1.06, duration: 0.3, overwrite: 'auto' });
    pieceRefs.current.forEach((piece, pieceIndex) => {
      if (pieceIndex !== index) gsap.to(piece, { opacity: 0.5, duration: 0.3, overwrite: 'auto' });
    });
  };

  const handlePieceLeave = () => {
    if (!hoverReadyRef.current || transition.active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pieceRefs.current.forEach((piece) => {
      gsap.to(piece, { scale: 1, opacity: 1, duration: 0.3, overwrite: 'auto' });
    });
  };

  const handlePieceClick = (event, index, piece) => {
    event.preventDefault();
    if (transition.active) return;
    assemblyRef.current?.pause();
    idleRef.current?.pause();
    startForward(pieceRefs.current[index], piece.id);
  };

  return (
    <div id="puzzle" className="about-puzzle" aria-label="Explore the portfolio" ref={puzzleRef}>
      {puzzlePieces.map((piece, index) => (
        <a
          className={`puzzle-piece ${piece.className}`}
          href={`#/${piece.id}`}
          key={piece.id}
          aria-label={`Go to ${piece.name}`}
          ref={(node) => { pieceRefs.current[index] = node; }}
          onClick={(event) => handlePieceClick(event, index, piece)}
          onMouseEnter={() => handlePieceEnter(index)}
          onMouseLeave={handlePieceLeave}
          onFocus={() => handlePieceEnter(index)}
          onBlur={handlePieceLeave}
        >
          <img src={piece.image} alt="" />
          <span
            className="puzzle-label"
            style={{
              '--title-x': `${piece.titlePosition.x}%`,
              '--title-y': `${piece.titlePosition.y}%`
            }}
          >
            {piece.name}
          </span>
        </a>
      ))}
    </div>
  );
}

export default Puzzle;
