import Puzzle from './Puzzle.jsx';

function About() {
  return (
    <section className="puzzle-nav page-section" id="about" aria-labelledby="about-title">
      <div className="section-content">
        <Puzzle />
        <div className="about-intro">
          <h2 id="about-title">Pieces of my story<br /><em>the person behind<br />the code.</em></h2>
          <div className="section-copy">
            <p className="lead">Hey there, I’m Timothy, an aspiring React frontend engineer looking to enter into the HCI industry and Frontend Development. By combining my technical skills with human psychology, I hope to bridge the gap between AI and humans and build projects that allow for the existence of the best of both worlds. Forging the path to my dreams, One line of code at a time.</p>
            <a className="text-link" href="#lessons">See what I’m learning <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
