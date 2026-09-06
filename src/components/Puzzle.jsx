import puzzleBottomLeft from '../assets/hero-puzzle-assets/puzzle_piece-bottom left v2.png';
import puzzleBottomRight from '../assets/hero-puzzle-assets/puzzle_piece-bottom right v2.png';
import puzzleMiddleLeft from '../assets/hero-puzzle-assets/puzzle_piece-middle left v2.png';
import puzzleMiddleRight from '../assets/hero-puzzle-assets/puzzle_piece-middle right v2.png';
import puzzleTopLeft from '../assets/hero-puzzle-assets/puzzle_piece-top left v2.png';
import puzzleTopRight from '../assets/hero-puzzle-assets/puzzle_piece-top right v2.png';

const pieces = [
  { name: 'Lessons', className: 'puzzle-piece-top-left', image: puzzleTopLeft, target: '#lessons' },
  { name: 'Reflection', className: 'puzzle-piece-top-right', image: puzzleTopRight, target: '#reflection' },
  { name: 'Projects', className: 'puzzle-piece-middle-left', image: puzzleMiddleLeft, target: '#projects' },
  { name: 'Hobbies', className: 'puzzle-piece-middle-right', image: puzzleMiddleRight, target: '#hobbies' },
  { name: 'Skills', className: 'puzzle-piece-bottom-left', image: puzzleBottomLeft, target: '#skills' },
  { name: 'Contact', className: 'puzzle-piece-bottom-right', image: puzzleBottomRight, target: '#footer' }
];

function Puzzle() {
  return (
    <div className="about-puzzle" aria-label="Explore the portfolio">
      {pieces.map((piece) => (
        <a className={`puzzle-piece ${piece.className}`} href={piece.target} key={piece.name} aria-label={`Go to ${piece.name}`}>
          <img src={piece.image} alt="" />
          <span className="puzzle-label">{piece.name}</span>
        </a>
      ))}
    </div>
  );
}

export default Puzzle;