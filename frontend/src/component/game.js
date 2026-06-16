import React, { useState, useEffect } from "react";
import style from "./css/game.module.css";
import Fireworks from "./Fireworks.js";
import img from "./image/fight.png";
import img1 from "./image/monster.png";
import ballImg from "./image/ball.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faHeart,
  faStar,
  faFlagCheckered,
  faTrophy,
  faXmark,
  faCheck,
  faRotateRight 
} from "@fortawesome/free-solid-svg-icons";
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Game() {
  const [level, setLevel] = useState(1);
  const [index, setIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(3);

  const [shoot, setShoot] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [effect, setEffect] = useState(null);

  const levels = {
    1: [
      { q: "ما هو وسم الصورة في HTML؟", a: "<img>", o: ["<img>", "<div>", "<p>", "<h1>"] },
      { q: "Scratch يعتمد على؟", a: "Blocks", o: ["Blocks", "Code", "Text", "CSS"] },
      { q: "HTML تستخدم ل؟", a: "Structure", o: ["Structure", "Design", "Logic", "AI"] },
      { q: "وسم رابط؟", a: "<a>", o: ["<a>", "<link>", "<url>", "<p>"] },
      { q: "فقرة؟", a: "<p>", o: ["<p>", "<h1>", "<div>", "<span>"] },
      { q: "Scratch فيه؟", a: "Drag & Drop", o: ["Drag & Drop", "Typing", "Compile", "Server"] },
      { q: "HTML ملف؟", a: ".html", o: [".html", ".css", ".js", ".png"] },
      { q: "عنوان كبير؟", a: "<h1>", o: ["<h1>", "<h6>", "<title>", "<head>"] },
      { q: "زر؟", a: "<button>", o: ["<button>", "<div>", "<a>", "<span>"] },
      { q: "صورة؟", a: "<img>", o: ["<img>", "<p>", "<h1>", "<a>"] },
    ],

    2: [
      { q: "CSS تستخدم ل؟", a: "Design", o: ["Design", "Logic", "Database", "AI"] },
      { q: "لون النص؟", a: "color", o: ["color", "text", "font", "bg"] },
      { q: "خلفية؟", a: "background", o: ["background", "image", "color", "style"] },
      { q: "Scratch مستوى متوسط؟", a: "Loops", o: ["Loops", "SQL", "API", "Server"] },
      { q: "حجم الخط؟", a: "font-size", o: ["font-size", "text", "size", "weight"] },
      { q: "HTML + CSS؟", a: "Web Design", o: ["Web Design", "AI", "Game Engine", "OS"] },
      { q: "محاذاة؟", a: "text-align", o: ["text-align", "align", "center", "position"] },
      { q: "CSS ملف؟", a: ".css", o: [".css", ".html", ".js", ".py"] },
      { q: "Flex يستخدم ل؟", a: "Layout", o: ["Layout", "Logic", "Data", "Loop"] },
      { q: "حدود؟", a: "border", o: ["border", "line", "edge", "frame"] },
    ],

    3: [
      { q: "JS تستخدم ل؟", a: "Logic", o: ["Logic", "Design", "Structure", "Style"] },
      { q: "متغير؟", a: "let", o: ["let", "div", "css", "html"] },
      { q: "دالة؟", a: "function", o: ["function", "class", "style", "var"] },
      { q: "طباعة؟", a: "console.log", o: ["console.log", "print", "echo", "show"] },
      { q: "حدث؟", a: "click", o: ["click", "hover", "style", "color"] },
      { q: "مصفوفة؟", a: "array", o: ["array", "object", "class", "style"] },
      { q: "شرط؟", a: "if", o: ["if", "for", "while", "loop"] },
      { q: "تكرار؟", a: "for", o: ["for", "if", "var", "let"] },
      { q: "ملف JS؟", a: ".js", o: [".js", ".css", ".html", ".json"] },
      { q: "Scratch متقدم؟", a: "Game Logic", o: ["Game Logic", "Database", "AI", "Server"] },
    ],
  };

  const current = levels[level][index];

  const triggerFireworks = () => {
    setFireworks(true);
    setTimeout(() => setFireworks(false), 2000);
  };

  const next = () => {
    setShoot(null);
    setAnswered(false);

    if (index + 1 >= 10) {
      if (level === 3) setGameOver(true);
      else {
        setLevel(level + 1);
        setIndex(0);
      }
    } else {
      setIndex(index + 1);
    }
  };

  const handleAnswer = (op) => {
    if (answered || gameOver) return;

    setAnswered(true);

    if (op === current.a) {
      setScore((s) => s + 10);
      setShoot("toMonster");
      setEffect("win");
      triggerFireworks();

      setTimeout(() => {
        setEffect(null);
        next();
      }, 1200);
    } else {
      setAttempts((a) => a - 1);
      setShoot("toPlayer");
      setEffect("lose");

      setTimeout(() => {
        setEffect(null);

        if (attempts - 1 <= 0) setGameOver(true);
        else next();
      }, 1000);
    }
  };



  const restartGame = () => {
  setLevel(1);
  setIndex(0);
  setScore(0);
  setAttempts(3);
  setGameOver(false);
  setAnswered(false);
  setShoot(null);
  setEffect(null);
  setFireworks(false);
};

  return (
    <div className={`${style.game} ${effect === "lose" ? style.shake : ""}`}>
      <Fireworks run={fireworks} />

      <div className={style.stage}>
        <img src={img1} className={style.monster} />
        <img src={img} className={style.hero} />

        {shoot && (
          <img src={ballImg} className={`${style.ball} ${style[shoot]}`} />
        )}
      </div>

      <div className={style.card}>
        {gameOver ? (
<div className={style.end}>
  <h1>
    <FontAwesomeIcon icon={faTrophy} /> Finished
  </h1>

  <p>
    <FontAwesomeIcon icon={faStar} /> Score: {score}
  </p>

<button className={style.restartBtn} onClick={restartGame}>
  <FontAwesomeIcon icon={faRotateRight} /> Restart Game
</button>
</div>
        ) : (
          <>
<h2>
  <FontAwesomeIcon icon={faGamepad} /> Level {level}
</h2>
            <h3>{current.q}</h3>

            <div className={style.options}>
              {shuffle(current.o).map((op, i) => (
                <button key={i} onClick={() => handleAnswer(op)} className={style.option}>
                 {op}
                </button>
              ))}
            </div>

<p>
  <FontAwesomeIcon icon={faStar} /> {score} |
  <FontAwesomeIcon icon={faHeart} /> {attempts}
</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;