import PuzzleDetailPage from '../Transition/PuzzleDetailPage';
import clashRoyaleImage from '../../assets/Clashroyale.png';
import tennisImage from '../../assets/Tennisv3.JPG';

function Passions() {
  return (
    <PuzzleDetailPage
      pieceId="passions"
      eyebrow="Passions"
      title={<>What keeps me <em>curious.</em></>}
      intro="The interests outside development that shape how I learn, compete, create, and communicate."
      tone="sun"
    >
      <div className="passions-collage">
        <article className="passion-card passion-card--tennis">
          <img src={tennisImage} alt="Playing tennis" />
          <div><span>01 / Movement</span><h3>Tennis</h3><p>Teaching players from ages three to eighty has sharpened my patience, adaptability, and ability to explain one idea in many ways.</p></div>
        </article>
        <article className="passion-card passion-card--games">
          <img src={clashRoyaleImage} alt="Clash Royale" />
          <div><span>02 / Strategy</span><h3>Games</h3><p>I enjoy fast decisions, resource management, and systems that reward both experimentation and discipline.</p></div>
        </article>
        <article className="passion-card passion-card--video">
          <iframe src="https://www.youtube.com/embed/0RKk7c-sgw8?si=UpJH16gllTGlWQhy" title="Music video preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          <div><span>03 / Creative work</span><h3>Making & music</h3><p>Editing our Milan study-abroad music video taught me to shape a story through rhythm, timing, and visual detail.</p></div>
        </article>
        <aside className="passion-note"><span>Reading</span><strong>Ideas become better when they meet another perspective.</strong></aside>
      </div>
    </PuzzleDetailPage>
  );
}

export default Passions;
