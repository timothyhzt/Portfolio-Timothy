import puzzleBottomLeft from '../../assets/hero-puzzle-assets/puzzle_piece-bottom left v2.png';
import puzzleBottomRight from '../../assets/hero-puzzle-assets/puzzle_piece-bottom right v2.png';
import puzzleMiddleLeft from '../../assets/hero-puzzle-assets/puzzle_piece-middle left v2.png';
import puzzleMiddleRight from '../../assets/hero-puzzle-assets/puzzle_piece-middle right v2.png';
import puzzleTopLeft from '../../assets/hero-puzzle-assets/puzzle_piece-top left v2.png';
import puzzleTopRight from '../../assets/hero-puzzle-assets/puzzle_piece-top right v2.png';

export const puzzlePieces = [
  { name: 'Lessons', id: 'lessons', className: 'puzzle-piece-top-left', image: puzzleTopLeft, titlePosition: { x: 32, y: 25 } },
  { name: 'Reflection', id: 'reflection', className: 'puzzle-piece-top-right', image: puzzleTopRight, titlePosition: { x: 69, y: 24 } },
  { name: 'Projects', id: 'projects', className: 'puzzle-piece-middle-left', image: puzzleMiddleLeft, titlePosition: { x: 31, y: 48 } },
  { name: 'Hobbies', id: 'hobbies', className: 'puzzle-piece-middle-right', image: puzzleMiddleRight, titlePosition: { x: 69, y: 47 } },
  { name: 'Skills', id: 'skills', className: 'puzzle-piece-bottom-left', image: puzzleBottomLeft, titlePosition: { x: 31, y: 76 } },
  { name: 'Contact', id: 'contact', className: 'puzzle-piece-bottom-right', image: puzzleBottomRight, titlePosition: { x: 68, y: 75 } }
];
