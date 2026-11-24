import PropTypes from 'prop-types';
import { usePuzzleTransition } from './PuzzleTransitionProvider';

const detailOrder = ['background', 'passions', 'skills', 'process', 'projects', 'next'];

function PuzzleDetailPage({ pieceId, eyebrow, title, intro, tone = 'cream', children }) {
  const { route, transition, navigate, startReverse } = usePuzzleTransition();
  const index = detailOrder.indexOf(pieceId);
  const previous = index > 0 ? detailOrder[index - 1] : null;
  const next = index < detailOrder.length - 1 ? detailOrder[index + 1] : null;

  const labels = {
    background: 'Background',
    passions: 'Passions',
    skills: 'Skills',
    process: 'Process',
    projects: 'Projects',
    next: 'Next'
  };

  return (
    <section
      className={`puzzle-detail page-section puzzle-detail--${tone}`}
      id={pieceId}
      aria-labelledby={`${pieceId}-title`}
    >
      <div className="section-content puzzle-detail__content">
        <header className="puzzle-detail__header">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${pieceId}-title`}>{title}</h2>
          {intro && <p className="puzzle-detail__intro">{intro}</p>}
        </header>

        <div className="puzzle-detail__body">{children}</div>

        <nav className="puzzle-detail__nav" aria-label={`${labels[pieceId]} page navigation`}>
          {previous ? (
            <a href={`#/${previous}`} onClick={(event) => { event.preventDefault(); navigate(previous); }}>← <span>{labels[previous]}</span></a>
          ) : <span />}
          <button
            type="button"
            className="dedicated-back"
            onClick={() => {
              if (transition.active) return;
              const image = document.querySelector('.dedicated-piece-anchor img');
              startReverse(route, image);
            }}
          >
            <span aria-hidden="true">←</span> Back to puzzle
          </button>
          {next ? (
            <a href={`#/${next}`} onClick={(event) => { event.preventDefault(); navigate(next); }}><span>{labels[next]}</span> →</a>
          ) : <span />}
        </nav>
      </div>
    </section>
  );
}

PuzzleDetailPage.propTypes = {
  pieceId: PropTypes.oneOf(detailOrder).isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  intro: PropTypes.string,
  tone: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default PuzzleDetailPage;
