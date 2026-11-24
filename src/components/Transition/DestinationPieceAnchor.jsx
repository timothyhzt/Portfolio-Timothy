import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { puzzlePieces } from '../Puzzle/puzzleData';
import { usePuzzleTransition } from './PuzzleTransitionProvider';

function DestinationPieceAnchor({ route }) {
  const anchorRef = useRef(null);
  const imageRef = useRef(null);
  const { registerDestinationTarget, transition } = usePuzzleTransition();
  const piece = puzzlePieces.find((item) => item.id === route);

  useLayoutEffect(() => {
    if (!imageRef.current) return;
    gsap.set(imageRef.current, { opacity: transition.active ? 0 : 1 });
    registerDestinationTarget(route, imageRef.current);
  }, [registerDestinationTarget, route, transition.active]);

  if (!piece) return null;

  return (
    <div
      className={`dedicated-piece-anchor dedicated-piece-anchor--${route}`}
      ref={anchorRef}
      data-destination-piece={route}
      aria-hidden="true"
    >
      <img ref={imageRef} src={piece.image} alt="" />
      <span>{piece.name}</span>
    </div>
  );
}

DestinationPieceAnchor.propTypes = {
  route: PropTypes.string.isRequired
};

export default DestinationPieceAnchor;
