const skills = [
  ['HTML', 'Building clear page structure.'],
  ['CSS', 'Creating thoughtful visual systems.'],
  ['JavaScript', 'Adding useful interaction.'],
  ['React', 'Building interactive user interfaces.'],
  ['React/TypeScript', 'Building interactive user interfaces.'],
  ['Python', 'Learning versatile programming foundations.']
];

function Skills() {
  return (
    <section className="skills page-section section-line" id="skills" aria-labelledby="skills-title">
      <div className="section-content">
        <div className="skills-heading">
          <h2 id="skills-title">Tools I’m<br /><em>learning.</em></h2>
          <p>The skills I’m practicing as I turn ideas into working pages.</p>
        </div>
        <div className="skill-list">
          {skills.map(([name, description]) => {
            const faviconMap = {
              HTML: { className: 'skill-favicon--html', label: 'H', ariaLabel: 'HTML skill icon' },
              CSS: { className: 'skill-favicon--css', label: 'C', ariaLabel: 'CSS skill icon' },
              JavaScript: { className: 'skill-favicon--js', label: 'JS', ariaLabel: 'JavaScript skill icon' },
              React: { className: 'skill-favicon--js', label: 'R', ariaLabel: 'React skill icon' },
              'React/TypeScript': { className: 'skill-favicon--react', label: 'R/TS', ariaLabel: 'React and TypeScript skill icon' },
              Python: { className: 'skill-favicon--python', label: 'Py', ariaLabel: 'Python skill icon' }
            };

            const favicon = faviconMap[name] ?? { className: 'skill-favicon--js', label: 'JS', ariaLabel: `${name} skill icon` };

            return (
              <article className="skill-item" key={name}>
                <span className={`skill-favicon ${favicon.className}`} aria-label={favicon.ariaLabel} role="img">{favicon.label}</span>
                <div className="skill-copy"><h3>{name}</h3><p>{description}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
