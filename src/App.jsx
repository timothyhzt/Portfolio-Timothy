import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Lessons from './components/Lessons/Lessons.jsx';
import Reflection from './components/Reflection/Reflection.jsx';
import Projects from './components/Projects/Projects.jsx';
import Hobbies from './components/Hobbies/Hobbies.jsx';
import Skills from './components/Skills/Skills.jsx';
import Footer from './components/Footer/Footer.jsx';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  PuzzleTransitionProvider,
  usePuzzleTransition
} from './components/Transition/PuzzleTransitionProvider';
import DestinationPieceAnchor from './components/Transition/DestinationPieceAnchor';

gsap.registerPlugin(useGSAP);

const routeComponents = {
  lessons: Lessons,
  reflection: Reflection,
  projects: Projects,
  hobbies: Hobbies,
  skills: Skills,
  contact: Footer
};

function AppContent() {
  const { route, transition, startReverse } = usePuzzleTransition();
  const pageRef = useRef(null);

  useGSAP(() => {
    if (!route || !pageRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(pageRef.current.querySelectorAll('.dedicated-back, .section-content, .reflection, .site-footer'), {
      y: 24,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.08,
      delay: 0.75,
      ease: 'power3.out'
    });
  }, { dependencies: [route], scope: pageRef });

  if (route) {
    const RouteComponent = routeComponents[route];
    return (
      <div ref={pageRef} className={`dedicated-page dedicated-page--${route}`}>
        <Navbar />
        <main className="dedicated-page-main" key={route}>
          <DestinationPieceAnchor route={route} />
          <a
            className="dedicated-back"
            href="#/"
            onClick={(event) => {
              event.preventDefault();
              if (transition.active) return;
              const image = pageRef.current?.querySelector('.dedicated-piece-anchor img');
              startReverse(route, image);
            }}
          >
            <span aria-hidden="true">←</span> Back to puzzle
          </a>
          <RouteComponent />
        </main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <PuzzleTransitionProvider>
      <AppContent />
    </PuzzleTransitionProvider>
  );
}

export default App;
