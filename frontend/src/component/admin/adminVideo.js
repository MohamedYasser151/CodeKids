import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./css/AdminVideo.css";

export default function UploadVideo() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Scratch");
  const [video, setVideo] = useState(null);

  const upload = async () => {

    try {

    

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("course", course);
      formData.append("video", video);

      await axios.post(
        "http://localhost:8083/videos/upload",
        formData
      );

      alert("✅ Uploaded");

      setTitle("");
      setDescription("");
      setVideo(null);

    } catch (err) {

      console.log(err);

      alert("❌ Upload Failed");

    }

  };

  return (
    <div className="admin-video-container">

      <div className="admin-video-card">

        <h1>🎥 Upload Video</h1>
<div className="admin-video-form">

  <input
    className="admin-video-input"
    placeholder="Video Title"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
  />

  <textarea
    className="admin-video-textarea"
    placeholder="Description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
  />

  <select
    className="admin-video-select"
    value={course}
    onChange={(e)=>setCourse(e.target.value)}
  >
    <option>Scratch</option>
    <option>Python</option>
    <option>JavaScript</option>
  </select>

  <input
    className="admin-video-file"
    type="file"
    accept="video/*"
    onChange={(e)=>setVideo(e.target.files[0])}
  />

  <button
    className="admin-video-btn"
    onClick={upload}
  >
    🚀 Upload Video
  </button>

  {video && (
    <div className="video-preview">
      <video
        controls
        src={URL.createObjectURL(video)}
      />
    </div>
  )}

</div>
      </div>

    </div>
  );
}