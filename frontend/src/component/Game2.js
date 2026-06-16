import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faFlagCheckered,
  faCube,
  faDragon,
  faBomb,
  faPlay,
  faRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import "./css/game.css";

function Game() {
  const [level, setLevel] = useState(1);

  const size =
    level > 40 ? 8 :
    level > 20 ? 7 :
    level > 10 ? 6 : 5;

  const [robot, setRobot] = useState({ x: 0, y: 0 });
  const [goal, setGoal] = useState({ x: 4, y: 4 });
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const [currentLevel, setCurrentLevel] = useState({
    walls: [],
    snakes: [],
    traps: []
  });

  // 🔒 تجنب overlap (مهم جداً)
  const getFreePosition = (walls, snakes, traps) => {
    let x, y;
    let valid = false;

    while (!valid) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);

      valid =
        !(x === 0 && y === 0) &&
        !walls.some(w => w.x === x && w.y === y) &&
        !snakes.some(s => s.x === x && s.y === y) &&
        !traps.some(t => t.x === x && t.y === y);
    }

    return { x, y };
  };

  // 🎮 توليد مستوى جديد
  const generateLevel = () => {
    const walls = [];
    const snakes = [];
    const traps = [];

    const wallCount = Math.min(level + 1, size * 2);

    for (let i = 0; i < wallCount; i++) {
      walls.push(getFreePosition(walls, snakes, traps));
    }

    if (level >= 3) {
      snakes.push(getFreePosition(walls, snakes, traps));
    }

    if (level >= 6) {
      traps.push(getFreePosition(walls, snakes, traps));
    }

    return { walls, snakes, traps };
  };

  // 🎯 هدف آمن (بدون تعارض)
  const getRandomGoal = (walls, snakes, traps) => {
    let pos = getFreePosition(walls, snakes, traps);
    return pos;
  };

  // 🔁 إعادة توليد كل شيء عند تغيير المستوى
  useEffect(() => {
    const newLevel = generateLevel();
    setCurrentLevel(newLevel);
    setGoal(getRandomGoal(newLevel.walls, newLevel.snakes, newLevel.traps));
    setRobot({ x: 0, y: 0 });
    setMessage("");
    setCode("");
  }, [level]);

  // 🚶 حركة الروبوت
  const movePlayer = (state, dir) => {
    let x = state.x;
    let y = state.y;

    if (dir === "right") x++;
    if (dir === "left") x--;
    if (dir === "up") y--;
    if (dir === "down") y++;

    // حدود
    if (x < 0 || y < 0 || x >= size || y >= size) return state;

    // 🧱 Wall
    if (currentLevel.walls.some(w => w.x === x && w.y === y)) return state;

    // 🐍 Snake → restart
    if (currentLevel.snakes.some(s => s.x === x && s.y === y)) {
      setMessage("🐍 Snake! Back to start");
      return { x: 0, y: 0 };
    }

    // 💥 Trap → restart
    if (currentLevel.traps.some(t => t.x === x && t.y === y)) {
      setMessage("💥 Trap! Back to start");
      return { x: 0, y: 0 };
    }

    return { x, y };
  };

  // ▶ تشغيل الكود
  const run = async () => {
    let currentState = { x: 0, y: 0 };
    setRobot(currentState);

    let won = false;

    try {
      const move = async (dir) => {
        await new Promise(r => setTimeout(r, 300));

        currentState = movePlayer(currentState, dir);
        setRobot({ ...currentState });

        if (currentState.x === goal.x && currentState.y === goal.y) {
          won = true;
          setMessage(`🎉 Level ${level} Complete`);

          setTimeout(() => {
            setLevel(prev => prev + 1);
          }, 1200);
        }
      };

      const func = new Function(
        "move",
        `
        return (async () => {
          ${code}
        })();
        `
      );

      await func(move);

      if (!won) {
        setRobot({ x: 0, y: 0 });
        setMessage("❌ Try Again");
      }

    } catch (e) {
      console.log(e);
      setRobot({ x: 0, y: 0 });
      setMessage("⚠ Code Error");
    }
  };

const reset = () => {
  setMessage("🔄 Restarting...");

  setTimeout(() => {
    const newLevel = generateLevel();

    setCurrentLevel(newLevel);
    setGoal(getRandomGoal(newLevel.walls, newLevel.snakes, newLevel.traps));

    setRobot({ x: 0, y: 0 });
    setMessage("");
    setCode("");
  }, 300);
};
  return (
    <div className="game-container">

      <h1 className="game-title">
  <FontAwesomeIcon icon={faRobot} /> Code Kids Challenge
</h1>
<h2 className="level-title">
  <FontAwesomeIcon icon={faFlagCheckered} /> Level {level}
</h2>
<div className="debug-box">
  <FontAwesomeIcon icon={faRobot} /> ({robot.x},{robot.y}) |
  <FontAwesomeIcon icon={faFlagCheckered} /> ({goal.x},{goal.y})
</div>

      <div className="layout">

        {/* GRID */}
       {/* GRID */}
<div
  className="grid"
  style={{
    width: size >= 8 ? "95vw" : "90vw",
    maxWidth: "650px",
    gridTemplateColumns: `repeat(${size}, 1fr)`
  }}
>
  {[...Array(size * size)].map((_, i) => {
    const x = i % size;
    const y = Math.floor(i / size);

    const isRobot = robot.x === x && robot.y === y;
    const isGoal = goal.x === x && goal.y === y;

    const isWall = currentLevel.walls.some(
      w => w.x === x && w.y === y
    );

    const isSnake = currentLevel.snakes.some(
      s => s.x === x && s.y === y
    );

    const isTrap = currentLevel.traps.some(
      t => t.x === x && t.y === y
    );

    let cellType = "";

    if (isRobot) cellType = "robot";
    else if (isGoal) cellType = "goal";
    else if (isWall) cellType = "wall";
    else if (isSnake) cellType = "snake";
    else if (isTrap) cellType = "trap";

return (
  <div key={i} className={`cell ${cellType}`}>

    {isWall && <FontAwesomeIcon icon={faCube} />}
    {isSnake && <FontAwesomeIcon icon={faDragon} />}
    {isTrap && <FontAwesomeIcon icon={faBomb} />}
    {isGoal && <FontAwesomeIcon icon={faFlagCheckered} />}
    {isRobot && <FontAwesomeIcon icon={faRobot} />}

  </div>
);
  })}
</div>

        {/* EDITOR */}
        <div className="editor">
<h3>
  <FontAwesomeIcon icon={faPlay} /> Write Code
</h3>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`await move("right");
await move("down");`}
          />

<button onClick={run}>
  <FontAwesomeIcon icon={faPlay} /> Run
</button>

<button onClick={reset}>
  <FontAwesomeIcon icon={faRotateLeft} /> Reset
</button>
        </div>

      </div>

      <div className="message">{message}</div>
    </div>
  );
}

export default Game;