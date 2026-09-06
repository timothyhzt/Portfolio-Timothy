import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Lessons from './components/Lessons.jsx';
import Reflection from './components/Reflection.jsx';
import Projects from './components/Projects.jsx';
import Hobbies from './components/Hobbies.jsx';
import Skills from './components/Skills.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <Lessons />
        <Reflection />
        <Projects />
        <Hobbies />
        <Skills />
      </main>
      <Footer />
    </>
  );
}

export default App;
