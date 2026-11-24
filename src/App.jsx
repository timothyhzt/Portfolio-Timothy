import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Background from './components/Background/Background.jsx';
import Passions from './components/Passions/Passions.jsx';
import Process from './components/Process/Process.jsx';
import Projects from './components/Projects/Projects.jsx';
import Skills from './components/Skills/Skills.jsx';
import Footer from './components/Footer/Footer.jsx';
import Next from './components/Next/Next.jsx';
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
  background: Background,
  passions: Passions,
  process: Process,
  projects: Projects,
  skills: Skills,
  next: Next
};

function AppContent() {
  const { route } = usePuzzleTransition();
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
