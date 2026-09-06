import heroPortrait from '../assets/hero v1 1.png';

function Hero() {
  return (
    <section className="hero page-section" aria-labelledby="hero-title">
      <img className="hero-portrait" src={heroPortrait} alt="" />
      <div className="hero-content">
        <h1 id="hero-title">Trying to connect the pieces of me<br /><em>to uncover the hidden picture within</em></h1>
        <p className="hero-text">A growing collection of thoughtful projects, honest reflections, and new skills from my web development journey.</p>
        <a className="button button-dark" href="#projects">Explore my work <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}

export default Hero;
