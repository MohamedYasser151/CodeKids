import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/videos.css";

export default function VideoPage() {

  const { course } = useParams();

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {

    axios.get(`http://localhost:8083/videos/${course}`)
      .then(res => setVideos(res.data))
      .catch(err => console.log(err));

  }, [course]);

  return (
    <div className="video-page">

      <h1>📚 {course} Course</h1>

      <div className="video-layout">

        {/* 📋 LIST */}
        <div className="video-list">

          {videos.map((v) => (
           <div
  key={v.id}
  className="video-item"
  onClick={() => setSelectedVideo(v)}
>
  <div>🎬 {v.title}</div>

  <div className="video-desc">
    {v.description}
  </div>

</div>
          ))}

        </div>

        {/* 🎥 PLAYER */}
        <div className="video-player">

          {selectedVideo ? (
            <>
              <video key={selectedVideo.id} controls autoPlay>
                <source src={selectedVideo.video_url} />
              </video>

              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
            </>
          ) : (
            <h3>👈 اختر فيديو للعرض</h3>
          )}

        </div>

      </div>

    </div>
  );
}