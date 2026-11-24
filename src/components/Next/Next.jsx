import PuzzleDetailPage from '../Transition/PuzzleDetailPage';
import resume from '../../assets/Resume- Timothy Tu.pdf';

const roadmap = [
  { label: 'Currently learning', text: 'React, TypeScript, Python, Django, and SQL.' },
  { label: 'Currently building', text: 'Project Redemption, a personalized planning app that turns long-term goals into schedules.' },
  { label: 'Exploring', text: 'AI-assisted workflows, human-centered design, and accessible frontend architecture.' },
  { label: 'What is next', text: 'A frontend role where thoughtful interaction, real users, and continuous learning matter.' }
];

function Next() {
  return (
    <PuzzleDetailPage
      pieceId="next"
      eyebrow="Next"
      title={<>The next piece <em>is open.</em></>}
      intro="I’m looking for opportunities to build useful products, learn from strong teammates, and grow with the work."
      tone="navy"
    >
      <div className="next-roadmap">
        {roadmap.map((item) => (
          <article key={item.label}><span>{item.label}</span><p>{item.text}</p></article>
        ))}
      </div>
      <div className="next-contact">
        <h3>Want to build something together?</h3>
        <div>
          <a className="button button-light next-contact-primary" href="mailto:timothytu0807@gmail.com">Contact <span>↗</span></a>
          <a className="button" href="https://github.com/timothyhzt" target="_blank" rel="noreferrer">GitHub</a>
          <a className="button" href="https://www.linkedin.com/in/timothy-hz-tu" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="button" href={resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>
    </PuzzleDetailPage>
  );
}

export default Next;
