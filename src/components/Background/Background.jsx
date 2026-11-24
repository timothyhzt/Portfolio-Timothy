import PuzzleDetailPage from '../Transition/PuzzleDetailPage';

const timeline = [
  { number: '01', title: 'Beginning', copy: 'Curiosity first drew me toward understanding how people interact with technology.' },
  { number: '02', title: 'Discovering development', copy: 'Web development gave me a practical way to turn creative ideas into tools people can use.' },
  { number: '03', title: 'Building seriously', copy: 'Hackathons and collaborative projects taught me to make decisions, test quickly, and grow through feedback.' },
  { number: '04', title: 'Where I am now', copy: 'I’m developing thoughtful React experiences while continuing to study Python, Django, and database-driven systems.' }
];

function Background() {
  return (
    <PuzzleDetailPage
      pieceId="background"
      eyebrow="Background"
      title={<>Where the pieces <em>began.</em></>}
      intro="A short story of how curiosity became a commitment to building for people."
      tone="sand"
    >
      <div className="background-story">
        {timeline.map((item) => (
          <article className="background-step" key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </PuzzleDetailPage>
  );
}

export default Background;
