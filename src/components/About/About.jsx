import Puzzle from '../Puzzle/Puzzle.jsx';
import { usePuzzleTransition } from '../Transition/PuzzleTransitionProvider';

function About() {
  const { navigate } = usePuzzleTransition();
  return (
    <section className="puzzle-nav page-section" id="about" aria-labelledby="about-title">
      <div className="section-content">
        <div className="about-intro">
          <p className="eyebrow">About me</p>
          <h2 id="about-title">The person<br />behind the<br /><em>code.</em></h2>
          <div className="section-copy">
            <p className="lead">I’m Timothy, a frontend engineer drawn to thoughtful interfaces where technology, design, and human behavior meet.</p>
            <p>Explore the puzzle to discover the pieces that shape my work.</p>
            <a className="text-link" href="#/lessons" onClick={(event) => { event.preventDefault(); navigate('lessons'); }}>Explore the puzzle <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <Puzzle />
      </div>
    </section>
  );
}

export default About;
