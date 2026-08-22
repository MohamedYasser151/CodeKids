import React from "react";

function ScoreCircle({
  score
}) {

  const safeScore =
    Number(score) || 0;

  return (

    <div className="score-circle">

      <div className="score-number">
        {safeScore}
      </div>

      <div className="score-percent">
        %
      </div>

    </div>

  );

}

export default ScoreCircle;