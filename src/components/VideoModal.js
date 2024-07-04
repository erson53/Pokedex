import React, { useRef, useEffect } from "react";
import video from "../assets/video.mp4";

const VideoModal = ({ isOpen, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ⨉
        </button>
        <video ref={videoRef} controls autoPlay>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
