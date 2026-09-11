function Projects() {
  return (
    <section className="projects page-section section-line" id="projects" aria-labelledby="projects-title">
      <div className="section-content">
        <div className="projects-heading">
          <h2 id="projects-title">Project<br /><em>Pieces</em></h2>
          <p id="projects-subdescription">A mix of my collaborative and personal projects that are completed or in the works</p>
        </div>
        <div className="project-list project-grid">
          <article className="project-card project-card-placeholder project-card-one">
            <div className="project-art project-art-one project-video-frame" aria-label="Project video preview">
              <iframe src="https://www.youtube.com/embed/U3OknA1_Tjw?si=TxY0PvO06o2dW6da" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="project-card-content">
              <span className="project-label">01 / Client Work</span>
              <h3>Friends Professional<br /><em>Portfolio.</em></h3>
              <p>Built a smooth and polished portfolio for my friends on a 2 week deadline for her job applications. Learned basic React Functionalities and used Framer motion for all animations. This was my first time building for someone else and I am extremely proud of what I was able to accomplish.</p>
              <a className="text-link" href="https://nataliewhipple.vercel.app/" target="_blank" rel="noreferrer">View the live portfolio <span aria-hidden="true">→</span></a>
            </div>
          </article>

          <article className="project-card project-card-placeholder project-card-two">
            <div className="project-art project-art-two project-video-frame" aria-label="Rubricy project video preview">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/wtB8ZitXkSE?si=QhzPe-5lZPZBuYIY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="project-card-content">
              <span className="project-label">02 / Collaboration</span>
              <h3>Rubricy<br /><em>PI Academy Hackathon Winner.</em></h3>
              <p>Learned to collaborate with a team to create a functional solution for assisting students with writing skills. Our target demgraphic was for online adult re-entry students and we wanted to create a solution to allow for them to get the writing support they deserve. Within a 2 week time limit we built a working site and canvas page using ASU CreateAi chatbot tailored towards our demographic.</p>
              <a className="text-link" href="https://github.com/timothyhzt/Rubricy" target="_blank" rel="noreferrer">View the Project<span aria-hidden="true">→</span></a>
            </div>
          </article>

          <article className="project-card project-card-placeholder project-card-three">
            <div className="project-art project-art-placeholder project-art-three" aria-label="Current work in progress artwork">
              <span className="project-art-badge">Coming Soon</span>
            </div>
            <div className="project-card-content">
              <span className="project-label">03 / Current work</span>
              <h3>Project<br /><em>Redemption.</em></h3>
              <p>Im actively working on this project and making good progress. The goal of the project is to create an app that creates personalized plan and schedule to help you achieve long-term goals. My goal is to further my understanding of React, Typescript and to learn to use Django and python for the backend and SQL for the database.</p>
              <a className="text-link" href="https://github.com/timothyhzt/Project-Redemption" target="_blank" rel="noreferrer">View the Project<span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Projects;
