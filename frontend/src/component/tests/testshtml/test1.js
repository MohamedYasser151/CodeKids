import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios'; // استيراد axios

import './Exam.css';

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 1 دقيقة بالثواني (60 ثانية)
  const [timer, setTimer] = useState(null);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const login = Cookies.get('loginkids');
  //   if (login !== 'true') {
  //     navigate('/');
  //   }
  // }, [navigate]);

  useEffect(() => {
    const hasAttempted = localStorage.getItem("hasAttempted33");

    if (hasAttempted) {
      alert("لقد أكملت الامتحان من قبل. لا يمكنك الدخول مرة أخرى.");
      setFinished(true);
      navigate("/levels");
    } else {
      const savedCurrentQuestion = localStorage.getItem("currentQuestion");
      const savedScore = localStorage.getItem("score");
      const savedTimeRemaining = localStorage.getItem("timeRemaining");

      if (savedCurrentQuestion) setCurrentQuestion(parseInt(savedCurrentQuestion));
      if (savedScore) setScore(parseInt(savedScore));
      if (savedTimeRemaining) setTimeRemaining(parseInt(savedTimeRemaining));

      startTimer();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  const startTimer = () => {
    const countdown = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(countdown);
          setFinished(true);
          localStorage.setItem("hasAttempted33", true); // حفظ حالة الامتحان كمكتمل
          submitScore(); // إرسال النتيجة تلقائيًا عند انتهاء الوقت
          alert("انتهى الوقت! سيتم إنهاء الامتحان.");
          return 0;
        }

        localStorage.setItem("timeRemaining", prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);

    setTimer(countdown);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 3);
    }
  
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      if (!isScoreSubmitted) {
        submitScore(score + (selected === questions[currentQuestion].correct ? 3 : 0));
      }
      setFinished(true);
      localStorage.setItem("hasAttempted33", true);
    }
  };
  
  
  
  

  const submitScore = async (finalScore) => {
    if (isScoreSubmitted) {
      console.log("Score already submitted. Skipping...");
      return;
    }
  
    const username = Cookies.get('username');
    const date = new Date().toISOString();
  
    console.log("Submitting Score:", { username, finalScore, date });
  
    try {
      await axios.post('http://localhost:8083/api/scores', {
        username,
        score: finalScore,
        date,
      });
      console.log("Score submitted successfully!");
      setIsScoreSubmitted(true); // تأكيد الإرسال
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };
  
  
  
  

  return (
    <div className="allexam">
      <div className="exam-container">
        {finished ? (
          <div className="result">
            <h1>النتيجة النهائية: {score} / {questions.length * 3}</h1>
            <p>شكراً لمشاركتك! 🌟</p>
          </div>
        ) : (
          <div className="question-card">
            <h2>السؤال {currentQuestion + 1} من {questions.length}</h2>
            <p>{questions[currentQuestion].question}</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="timer">
              <p>الوقت المتبقي: {formatTime(timeRemaining)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const questions = [
  {
    id: 1,
    question: "ماذا يمكنك أن تضيف إلى مشروعك في سكراتش؟",
    options: ["أصوات", "خلفيات", "ألعاب وأفكار جديدة", "كل ما سبق"],
    correct: "كل ما سبق",
  },
  {
    id: 2,
    question: "ماذا يفهم الكمبيوتر؟",
    options: ["اللغة العربية", "الأرقام 0 و 1", "الألوان فقط"],
    correct: "الأرقام 0 و 1",
  },
  {
    id: 3,
    question: "لماذا يستخدم الكمبيوتر الأرقام 0 و 1؟",
    options: ["لأنها سهلة","لأن الكمبيوتر يعمل بالكهرباء (تشغيل وإيقاف)", "لأنها مملة"],
    correct: "لأن الكمبيوتر يعمل بالكهرباء (تشغيل وإيقاف)",
  },
  {
    id: 4,
    question: "ماذا يعني الرقم 1 بالنسبة للكمبيوتر؟",
    options: ["تشغيل", "إيقاف", "لا شيء"],
    correct: "تشغيل",
  },
  {
    id: 5,
    question: "ما هو الكمبيوتر؟",
    options: [" آلة ذكية تساعدنا في العمل واللعب", "كتاب كبير", "سيارة سريعة"],
    correct: " آلة ذكية تساعدنا في العمل واللعب",
  },
  {
    id: 6,
    question: "ما وظيفة الكتلة 'Repeat' في برنامج Scratch؟",
    options: ["تكرر الأوامر الموجودة بداخلها لعدد محدد من المرات", "تكرر الأوامر الموجودة بداخلها عدد لا نهائي من المرات", "كل ما سبق"],
    correct: "تكرر الأوامر الموجودة بداخلها لعدد محدد من المرات",
  },
];

export default Exam;
