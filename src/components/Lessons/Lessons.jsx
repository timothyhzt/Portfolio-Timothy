import thesisPdf from '../assets/thesis/Senior Thesis - Technology the Key to a Virtuous Life.pdf';
import sunhacks1 from '../assets/sunhacks photos/sunhacks1.png';
import sunhacks2 from '../assets/sunhacks photos/Sunhacks2.png';
import sunhacks3 from '../assets/sunhacks photos/Sunhacks3.png';
import sunhacks4 from '../assets/sunhacks photos/Sunhacks4.jpeg';
import sunhacks5 from '../assets/sunhacks photos/Sunhacks5.jpeg';

const lessons = [
  {
    label: 'A project that failed to meet my personal standards',
    title: 'Highschool Senior Thesis',
    happened: 'My research topic was forced and I struggled to accurately support the point I was trying to make. This caused the paper to be slightly confusing ended up lowering the validity of the paper, thus falling short of my expectations for myself. Ultimately, I ended up disappointed in the paper and frustrated with my own performance.',
    learned: 'I learned that it\'s ok to struggle and that sometimes the work you present won\'t be perfect, but that\'s okay because it\'s part of the learning process. Even more importantly, I udnerstand how my decisions in how I spend my time can directly impact in both beneficial and harmful ways when working towards a goal or project. I am also grateful that I was blessed with the opportunity to learn this key idea early in my development.',
    showThesis: true
  },
  {
    label: 'My first hackathon',
    title: 'SunHacks (First Hackathon)',
    happened: 'It was my first time building an actaul project from scratch and I felt lost. I had came up with a brilliant idea for the prompt we deicded to tackle which was the Most Impractical Prompt. Yet ideas mean nothing when you havent yet learned how to execute them. The frustration piled as my team struggled to make any progress. Eventually I gave up mid-way through the event. This was not my proudest moment, I had cracked under the pressure. In the end, my team with the help of a mentor made a working basic version of the idea. They gave me a second chance in the morning and we ended up securing the award.',
    learned: 'This was early into my collegiate journey, and I\'m proud to say that I have learned to not give up. Sounds simple right? And yet, It was probably the most challenging experience of my life so far. Only when faced with helplessness can one truly grow. I am so grateful that my team let me back in, as I was ready to accept that I had given up. It shows not only how important the people you surround yourself with are but how only when you truly struggle can you actually grow as an indivdual.',
    showPhotos: true
  }
];

function Lessons() {
  return (
    <section className="lessons page-section section-line" id="lessons" aria-labelledby="lessons-title">
      <div className="section-content">
        <div className="lessons-heading">
          <h2 id="lessons-title">Learning<br /><em>from the messy pieces.</em></h2>
          <p>“Forgive yourself for not knowing earlier what only time could teach” - Maya Angelou</p>
        </div>
        <div className="lesson-list">
          {lessons.map(({ label, title, happened, learned, showThesis, showPhotos }) => (
            <article className="lesson-item" key={title}>
              <span className="lesson-label">{label}</span>
              <h3>{title}</h3>
              <div className="lesson-reflection">
                <div><span>What happened</span><p>{happened}</p></div>
                <div><span>What I learned</span><p>{learned}</p></div>
              </div>

              {showThesis && (
                <div className="thesis-pdf-wrap">
                  <div className="thesis-preview" aria-label="Senior Thesis preview">
                    <div className="thesis-preview-badge">PDF</div>
                    <div className="thesis-preview-copy">
                      <strong>Senior Thesis</strong>
                      <span>Technology the Key to a Virtuous Life</span>
                    </div>
                    <a className="thesis-preview-link" href={thesisPdf} target="_blank" rel="noreferrer">Open in new tab</a>
                  </div>
                </div>
              )}

              {showPhotos && (
                <>
                  <div className="sunhacks-gallery" aria-label="Sunhacks event photos">
                    <figure className="sunhacks-photo" data-image={sunhacks1} tabIndex="0" role="button" aria-label="Open Sunhacks team photo">
                      <img src={sunhacks1} alt="Sunhacks team photo with participants standing together" />
                    </figure>
                    <figure className="sunhacks-photo" data-image={sunhacks2} tabIndex="0" role="button" aria-label="Open Sunhacks group shot">
                      <img src={sunhacks2} alt="Sunhacks group shot in the event space" />
                    </figure>
                    <figure className="sunhacks-photo" data-image={sunhacks3} tabIndex="0" role="button" aria-label="Open Sunhacks project table photo">
                      <img src={sunhacks3} alt="Sunhacks table setup and project work" />
                    </figure>
                    <figure className="sunhacks-photo" data-image={sunhacks4} tabIndex="0" role="button" aria-label="Open Sunhacks team portrait">
                      <img src={sunhacks4} alt="Sunhacks team posing for a photo during the event" />
                    </figure>
                    <figure className="sunhacks-photo" data-image={sunhacks5} tabIndex="0" role="button" aria-label="Open Sunhacks collaboration photo">
                      <img src={sunhacks5} alt="Sunhacks collaboration moment after building together" />
                    </figure>
                  </div>
                  <div className="lightbox" aria-hidden="true">
                    <div className="lightbox-content">
                      <button className="lightbox-close" type="button" aria-label="Close image">×</button>
                      <img src="" alt="Expanded Sunhacks photo" />
                    </div>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lessons;
