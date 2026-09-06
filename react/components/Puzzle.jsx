const pieces = [
  { name: 'Lessons', className: 'puzzle-piece-top-left', image: 'puzzle_piece-top left v2.png', target: '#lessons' },
  { name: 'Reflection', className: 'puzzle-piece-top-right', image: 'puzzle_piece-top right v2.png', target: '#reflection' },
  { name: 'Projects', className: 'puzzle-piece-middle-left', image: 'puzzle_piece-middle left v2.png', target: '#projects' },
  { name: 'Hobbies', className: 'puzzle-piece-middle-right', image: 'puzzle_piece-middle right v2.png', target: '#hobbies' },
  { name: 'Skills', className: 'puzzle-piece-bottom-left', image: 'puzzle_piece-bottom left v2.png', target: '#skills' },
  { name: 'Contact', className: 'puzzle-piece-bottom-right', image: 'puzzle_piece-bottom right v2.png', target: '#footer' }
];

function Puzzle() {
  return (
    <div className="about-puzzle" aria-label="Explore the portfolio">
      {pieces.map((piece) => (
        <a className={`puzzle-piece ${piece.className}`} href={piece.target} key={piece.name} aria-label={`Go to ${piece.name}`}>
          <img src={`hero-puzzle-assets/${piece.image}`} alt="" />
          <span className="puzzle-label">{piece.name}</span>
        </a>
      ))}
    </div>
  );
}

export default Puzzle;