import React, { useState } from "react";
import axios from "axios";
import "./css/admin.css";

export default function Admin() {

  const [code,setCode] = useState("");
  const [score,setScore] = useState("");

  const addScore = async () => {

    try{

      const res = await axios.post(
        "http://localhost:8083/score",
        {
          code,
          score:Number(score)
        }
      );

      alert(
        `${res.data.name}\n${res.data.rank}`
      );

      setCode("");
      setScore("");

    }
    catch(err){
      console.log(err);
    }

  };

  return (
    <div className="admin-container">

      <h1>🏆 Admin Dashboard</h1>

      <div className="card">

        <input
          className="input"
          placeholder="Student Code"
          value={code}
          onChange={(e)=>setCode(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e)=>setScore(e.target.value)}
        />

        <button
          className="btn blue"
          onClick={addScore}
        >
          Submit Score
        </button>

      </div>

    </div>
  );
}