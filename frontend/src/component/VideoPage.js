import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faPlay,
  faVideo
} from "@fortawesome/free-solid-svg-icons";

import "./css/videos.css";

export default function VideoPage() {

  const { course } = useParams();

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://code-kids-ezwr.vercel.app/videos/${course}`)
      .then(res => setVideos(res.data))
      .catch(err => console.log(err));
  }, [course]);

  return (
    <div className="video-page">

      {/* TITLE */}
      <h1 className="page-title">
        <FontAwesomeIcon icon={faBookOpen} />
        {course?.toUpperCase()} COURSE
      </h1>

      <div className="video-layout">

        {/* SIDEBAR */}
        <div className="video-list">

          <h3 className="list-title">
            <FontAwesomeIcon icon={faPlay} /> Lessons
          </h3>

          {videos.map((v) => (
            <div
              key={v.id}
              className={`video-item ${
                selectedVideo?.id === v.id ? "active" : ""
              }`}
              onClick={() => setSelectedVideo(v)}
            >
              <FontAwesomeIcon icon={faPlay} className="play-icon" />

              <div>
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </div>
            </div>
          ))}

        </div>

        {/* PLAYER */}
        <div className="video-player">

          {selectedVideo ? (
            <>
<video key={selectedVideo.id} controls autoPlay>
  <source src={selectedVideo.video_url} />
</video>

              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
            </>
          ) : (
            <div className="empty-state">
              <FontAwesomeIcon icon={faVideo} />
              <h3>Select a lesson</h3>
              <p>Choose a video to start learning</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}