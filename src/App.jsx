import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Lessons from './components/Lessons/Lessons.jsx';
import Reflection from './components/Reflection/Reflection.jsx';
import Projects from './components/Projects/Projects.jsx';
import Hobbies from './components/Hobbies/Hobbies.jsx';
import Skills from './components/Skills/Skills.jsx';
import Footer from './components/Footer/Footer.jsx';

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
