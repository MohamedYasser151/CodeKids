import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faMedal,
  faCrown, 
} from "@fortawesome/free-solid-svg-icons";
import "./css/podium.css";

export default function Weekly() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://code-kids-ezwr.vercel.app/weekly")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const weekNumber = Math.ceil(
    new Date().getDate() / 7
  );

  return (
    <div className="ranking-page">

<h1 className="ranking-title">
  <FontAwesomeIcon icon={faTrophy} className="title-icon" />
  Week {weekNumber} Champions
</h1>

      <div className="podium">

        {/* SECOND */}
        {data[1] && (
          <div className="winner-card second">

<div className="medal second-icon">
  <FontAwesomeIcon icon={faMedal} />
</div>

            <div className="child-name">
              {data[1].name}
            </div>

            <div className="child-score">
              Second Place
            </div>

          </div>
        )}

        {/* FIRST */}
        {data[0] && (
          <div className="winner-card first">

<div className="trophy first-icon">
  <FontAwesomeIcon icon={faCrown} />
</div>

            <div className="child-name">
              {data[0].name}
            </div>

            <div className="child-score">
              First Place
            </div>

          </div>
        )}

        {/* THIRD */}
        {data[2] && (
          <div className="winner-card third">

<div className="medal third-icon">
  <FontAwesomeIcon icon={faMedal} />
</div>

            <div className="child-name">
              {data[2].name}
            </div>

            <div className="child-score">
              Third Place
            </div>

          </div>
        )}

      </div>

    </div>
  );
}