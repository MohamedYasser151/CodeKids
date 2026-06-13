import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/videoplayer.css";

export default function Videoplayer() {

  const navigate = useNavigate();

  const courses = [
    { name: "Scratch", icon: "🎮" },
    { name: "Python", icon: "🐍" },
    { name: "JavaScript", icon: "⚡" }
  ];

const openCourse = (course) => {
  navigate(`/videos/${course.toLowerCase()}`);
};

  return (
    <div className="course-container">

      <h1 className="title">📚 Learning Courses</h1>

      <div className="course-grid">

        {courses.map((c) => (
          <div
            key={c.name}
            className="course-card"
            onClick={() => {
  console.log("OPEN:", c.name);
  navigate(`/videos/${c.name}`);
}}
          >
            <div className="icon">{c.icon}</div>
            <h2>{c.name}</h2>
          </div>
        ))}

      </div>

    </div>
  );
}