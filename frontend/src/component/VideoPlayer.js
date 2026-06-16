import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faBookOpen 
} from "@fortawesome/free-solid-svg-icons";
import {
  faPython,
  faJs,
} from "@fortawesome/free-brands-svg-icons";

import "./css/videoplayer.css";

export default function Videoplayer() {

  const navigate = useNavigate();

const courses = [
  { name: "Scratch", icon: faGamepad },
  { name: "Python", icon: faPython },
  { name: "JavaScript", icon: faJs }
];

const openCourse = (course) => {
  navigate(`/videos/${course.toLowerCase()}`);
};

  return (
    <div className="course-container">

      <h1 className="title">
  <FontAwesomeIcon icon={faBookOpen} className="titleIcon" />
  Learning Courses
</h1>

      <div className="course-grid">

        {courses.map((c) => (
          <div
            key={c.name}
            className="course-card"
            onClick={() => {
  navigate(`/videos/${c.name.toLowerCase()}`);
}}
          >
<div className="icon">
  <FontAwesomeIcon icon={c.icon} />
</div>
            <h2>{c.name}</h2>
          </div>
        ))}

      </div>

    </div>
  );
}