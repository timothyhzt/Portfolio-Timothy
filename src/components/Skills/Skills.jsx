import PuzzleDetailPage from '../Transition/PuzzleDetailPage';

const skillGroups = [
  { title: 'Build', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'], note: 'Interfaces that are responsive, interactive, and intentional.' },
  { title: 'Backend', items: ['Python', 'Django', 'REST APIs', 'SQL'], note: 'The data and application logic behind useful products.' },
  { title: 'Tools', items: ['Git', 'GSAP', 'Drupal', 'Figma'], note: 'From source control and deployment to motion and content systems.' }
];

function Skills() {
  return (
    <PuzzleDetailPage
      pieceId="skills"
      eyebrow="Skills"
      title={<>What I can <em>build.</em></>}
      intro="A capability map organized around the work, not a list of scores."
      tone="mint"
    >
      <div className="skills-map">
        {skillGroups.map((group) => (
          <article className="skills-group" key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.note}</p>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </PuzzleDetailPage>
  );
}

export default Skills;
