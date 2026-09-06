import { useState } from 'react';
import VideoModal from './VideoModal';

function Hobbies() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="hobbies page-section section-line" id="hobbies" aria-labelledby="hobbies-title">
      <div className="section-content">
        <div className="hobbies-heading">
          <h2 id="hobbies-title">Additional Pieces</h2>
          <p>These are some things I enjoy doing outside of my professional work.</p>
        </div>

        <div className="hobby-grid">
          <article className="hobby-card hobby-card-video">
            <div className="hobby-media hobby-media-video">
              <iframe src="https://www.youtube.com/embed/0RKk7c-sgw8?si=UpJH16gllTGlWQhy" title="Music video preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="hobby-copy">
              <span className="project-label">01 / Personal work</span>
              <h3>Escape Parody<br /><em>Music Video.</em></h3>
              <p>I worked with a group of friends to capture the experience we had while abroad in Milan, Italy. Here I worked on my editing skills, storytelling, and visual communication. I learned about the process of producing music from one of my friends and truly got to experience what Davinci Resolve had to offer.</p>
            </div>
          </article>

          <article className="hobby-card hobby-card-game">
            <div className="hobby-media hobby-media-game">
              <img src="assets/Clashroyale.png" alt="Clash Royale game artwork" />
            </div>
            <div className="hobby-copy">
              <span className="project-label">02 / Weekend hobby</span>
              <h3>Clash Royale<br /><em>strategy & timing.</em></h3>
              <p>I love strategic and fast paced games. Thats where Clash Royale comes in. Its a game I have been playing for 8 years now and have reached top leaderboard positions numerous times. Throughout this process of being a 0.005% player, in a game played by millions have taught me various skills. These include but not are not limited to, resource management, decision making, adpatability and quick thinking.</p>
              <a className="text-link" href="https://royaleapi.com/player/8QP2PQYRG" target="_blank" rel="noreferrer">Check out my stats <span aria-hidden="true">→</span></a>
            </div>
          </article>

          <article className="hobby-card hobby-card-tennis">
            <div className="hobby-media hobby-media-tennis">
              <img src="assets/Tennisv3.JPG" alt="Tennis action shot" />
            </div>
            <div className="hobby-copy">
              <span className="project-label">03 / Active time</span>
              <h3>Tennis<br /><em>focus & movement.</em></h3>
              <p>Playing tennis keeps me moving, thinking fast, and learning how patience and rhythm can change the whole point of a rally.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Hobbies;
