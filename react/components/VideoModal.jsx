function VideoModal({ isOpen, onClose, videoTitle, videoUrl }) {
  if (!isOpen) return null;

  return (
    <div 
      className="video-modal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="video-modal-title" 
      onClick={onClose}
    >
      <div className="video-modal-content" onClick={(event) => event.stopPropagation()}>
        <div className="video-modal-header">
          <h2 id="video-modal-title">{videoTitle}</h2>
          <button 
            className="video-modal-close" 
            type="button" 
            onClick={onClose} 
            aria-label="Close video modal"
          >
            ×
          </button>
        </div>
        <div className="video-modal-frame">
          <iframe 
            width="560" 
            height="315" 
            src={videoUrl} 
            title={videoTitle} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
