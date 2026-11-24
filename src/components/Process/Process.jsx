import PuzzleDetailPage from '../Transition/PuzzleDetailPage';

const processSteps = [
  { number: '01', title: 'Understand', copy: 'Clarify the user, the constraint, and what success should feel like.' },
  { number: '02', title: 'Explore', copy: 'Compare approaches, sketch structure, and look for the simplest useful direction.' },
  { number: '03', title: 'Build', copy: 'Turn the idea into a working interface and connect the pieces progressively.' },
  { number: '04', title: 'Break', copy: 'Test assumptions, inspect edge cases, and invite feedback before polishing.' },
  { number: '05', title: 'Refine', copy: 'Improve the interaction, accessibility, and details until the experience feels deliberate.' }
];

function Process() {
  return (
    <PuzzleDetailPage
      pieceId="process"
      eyebrow="Process"
      title={<>How I turn ideas <em>into work.</em></>}
      intro="My process is iterative: understand the problem, make something real, expose weak assumptions, and refine."
      tone="blue"
    >
      <ol className="process-flow">
        {processSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.copy}</p></div>
          </li>
        ))}
      </ol>
    </PuzzleDetailPage>
  );
}

export default Process;
