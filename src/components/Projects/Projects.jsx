import PuzzleDetailPage from '../Transition/PuzzleDetailPage';

const featured = [
  {
    label: '01 / Active build',
    title: 'Project Redemption',
    copy: 'A React and TypeScript planning app that turns long-term goals into practical schedules. Django, Python, and SQL are part of the next system.',
    href: 'https://github.com/timothyhzt/Project-Redemption',
    cta: 'View the project',
    tone: 'redemption'
  },
  {
    label: '02 / Hackathon winner',
    title: 'Rubricy',
    copy: 'A collaborative writing-support tool and canvas experience built for adult re-entry students with ASU CreateAI.',
    href: 'https://github.com/timothyhzt/Rubricy',
    cta: 'View the project',
    tone: 'rubricy',
    video: 'https://www.youtube.com/embed/wtB8ZitXkSE?si=QhzPe-5lZPZBuYIY'
  },
  {
    label: '03 / Client work',
    title: 'Friend Portfolio',
    copy: 'A polished React portfolio delivered on a two-week deadline, pairing accessible structure with expressive motion.',
    href: 'https://nataliewhipple.vercel.app/',
    cta: 'View the live site',
    tone: 'friend',
    video: 'https://www.youtube.com/embed/U3OknA1_Tjw?si=TxY0PvO06o2dWda'
  }
];

function Projects() {
  return (
    <PuzzleDetailPage
      pieceId="projects"
      eyebrow="Projects"
      title={<>Work as <em>proof.</em></>}
      intro="A focused selection of completed collaborations and builds currently in progress."
      tone="mist"
    >
      <div className="featured-projects">
        {featured.map((project) => (
          <article className={`featured-project featured-project--${project.tone}`} key={project.title}>
            {project.video ? (
              <div className="featured-project__media">
                <iframe src={project.video} title={`${project.title} preview`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
            ) : (
              <div className="featured-project__media featured-project__media--placeholder"><span>In progress</span></div>
            )}
            <div className="featured-project__copy">
              <span>{project.label}</span>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
              <a className="text-link" href={project.href} target="_blank" rel="noreferrer">{project.cta} →</a>
            </div>
          </article>
        ))}
      </div>
      <div className="more-builds">
        <span>More builds</span>
        <p>JavaScript game · Minecraft mod · SunHacks · Thesis prototype · Personal experiments</p>
      </div>
    </PuzzleDetailPage>
  );
}

export default Projects;
