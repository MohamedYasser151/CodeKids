import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/podium.css";

export default function Monthly() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://code-kids-ezwr.vercel.app/monthly")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const monthName = new Date().toLocaleString("en-US", {
    month: "long"
  });

  return (
    <div className="ranking-page">

      <h1 className="ranking-title">
        🌟 {monthName} Champions
      </h1>

      <div className="podium">

        {/* SECOND */}
        {data[1] && (
          <div className="winner-card second">

            <div className="medal">
              🥈
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

            <div className="trophy">
              🏆
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

            <div className="medal">
              🥉
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