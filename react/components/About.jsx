import Puzzle from './Puzzle.jsx';

function About() {
  return (
    <section className="puzzle-nav page-section" id="about" aria-labelledby="about-title">
      <div className="section-content">
        <Puzzle />
        <div className="about-intro">
          <h2 id="about-title">A little about<br /><em>the person behind<br />the code.</em></h2>
          <div className="section-copy">
            <p className="lead">Hi, I’m Timothy. I’m a student exploring how design, technology, and clear communication can come together on the web.</p>
            <p>I’m interested in the stories behind a project, the details that make a page feel personal, and the process of learning by making.</p>
            <a className="text-link" href="#lessons">See what I’m learning <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
