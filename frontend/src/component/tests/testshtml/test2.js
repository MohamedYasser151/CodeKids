import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

import './Exam.css';

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [timer, setTimer] = useState(null);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]); // قائمة الأسئلة الخاطئة
  const navigate = useNavigate();

  useEffect(() => {
    const hasAttempted = localStorage.getItem("hasAttempted333");

    if (hasAttempted) {
      alert("لقد أكملت الامتحان من قبل. لا يمكنك الدخول مرة أخرى.");
      setFinished(true);
      navigate("/levels");
    } else {
      const savedCurrentQuestion = localStorage.getItem("currentQuestion1");
      const savedScore = localStorage.getItem("score1");
      const savedTimeRemaining = localStorage.getItem("timeRemaining1");

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
          localStorage.setItem("hasAttempted333", true);
          submitScore(); 
          alert("انتهى الوقت! سيتم إنهاء الامتحان.");
          return 0;
        }

        localStorage.setItem("timeRemaining1", prevTime - 1);
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
    } else {
      // إضافة السؤال إلى قائمة الأسئلة الخاطئة
      setIncorrectQuestions((prevIncorrect) => [
        ...prevIncorrect,
        questions[currentQuestion],
      ]);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      if (!isScoreSubmitted) {
        submitScore(score + (selected === questions[currentQuestion].correct ? 3 : 0));
      }
      setFinished(true);
      localStorage.setItem("hasAttempted333", true);
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
      setIsScoreSubmitted(true);
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
    
    {incorrectQuestions.length > 0 && (
      <div className="incorrect-questions">
        <h2>الأسئلة التي أُجيبت بشكل خاطئ:</h2>
        <ul>
          {incorrectQuestions.map((q, index) => (
            <li key={index}>
              <p><strong>السؤال:</strong> {q.question}</p>
              <p><strong>الإجابة الصحيحة:</strong> {q.correct}</p>
            </li>
          ))}
        </ul>
      </div>
    )}
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
    question: "؟ 'Repeat' ما وظيفة الكتلة Scratch في برنامج",
    options: [
      "تكرر الأوامر الموجودة بداخلها لعدد محدد من المرات",
      "تكرر الأوامر الموجودة بداخلها عدد لا نهائي من المرات",
      "كل ما سبق",
    ],
    correct: "تكرر الأوامر الموجودة بداخلها لعدد محدد من المرات",
  },
  {
    id: 2,
    question: "؟ 'Repeat' و 'Forever' ما الفرق بين الكتلتين Scratch في برنامج",
    options: [
      "Repeat تكرر عددًا محددًا من المرات، بينما Forever تكرر إلى ما لا نهاية",
      "Repeat تستخدم للأصوات، بينما Forever تستخدم للحركة فقط",
      "كلتاهما تؤديان نفس الوظيفة",
    ],
    correct: "Repeat تكرر عددًا محددًا من المرات، بينما Forever تكرر إلى ما لا نهاية",
  },
  {
    id: 3,
    question: "؟ 'Wait 1 second' ما الهدف من الكتلة",
    options: [
      "إيقاف البرنامج بشكل دائم",
      "إيقاف البرنامج لمدة ثانية واحدة قبل تنفيذ الأمر التالي",
      "تكرار الأوامر لمدة ثانية واحدة",
    ],
    correct: "إيقاف البرنامج لمدة ثانية واحدة قبل تنفيذ الأمر التالي",
  },
  {
    id: 4,
    question: "؟ Scratch كيف يمكن جعل شخصية تنطق جملة يكتبها المستخدم في",
    options: [
      "باستخدام الكتلة 'Ask' و 'Speak'",
      "باستخدام الكتلة 'Move'",
      "باستخدام الكتلة 'Repeat'",
    ],
    correct: "باستخدام الكتلة 'Ask' و 'Speak'",
  },
  {
    id: 5,
    question: "؟ 10 مرات 'Repeat' إذا أردت تشغيل صوت معين، فما الكتلة المناسبة",
    options: [
      "Forever",
      "Repeat مع العدد 10",
      "Wait 1 second",
    ],
    correct: "Repeat مع العدد 10",
  },
  {
    id: 6,
    question: "؟ Scratch كيف يمكن أن تتحرك الشخصية للأمام 10 خطوات بشكل متكرر في",
    options: [
      "استخدام Repeat مع Move 10 steps",
      "استخدام Forever مع Move 10 steps",
      "الاختياران يؤديان نفس الوظيفة",
    ],
    correct: "الاختياران يؤديان نفس الوظيفة",
  },
  {
    id: 7,
    question: "؟ 'Stop All' ما الهدف من الكتلة",
    options: [
      "إيقاف الأوامر الحالية فقط",
      "إيقاف جميع أوامر البرنامج فورًا",
      "إعادة تشغيل البرنامج",
    ],
    correct: "إيقاف جميع أوامر البرنامج فورًا",
  },
  {
    id: 8,
    question: "؟ 'Forever' ما وظيفة الكتلة",
    options: [
      "تكرر الأوامر لعدد محدود من المرات",
      "تكرر الأوامر إلى ما لا نهاية",
      "تكرر الأوامر 10 مرات",
    ],
    correct: "تكرر الأوامر إلى ما لا نهاية",
  },
  {
    id: 9,
    question: "؟ ما الكتلة التي تستخدم لتأخير تنفيذ الأوامر لمدة محددة",
    options: [
      "Wait",
      "Forever",
      "Repeat",
    ],
    correct: "Wait",
  },
  {
    id: 10,
    question: "؟ 'Forever' ما الكتلة التي تستخدم لتكرار مجموعة أوامر لفترة غير محدودة",
    options: [
      "Repeat",
      "Forever",
      "Wait",
    ],
    correct: "Forever",
  },
  {
    id: 11,
    question: "؟ 'x' و 'y' إذا كان لديك متغيران كيف يمكن مقارنة أيهما أصغر في Scratch",
    options: [
      "باستخدام الكتلة '='",
      "باستخدام الكتلة '<'",
      "باستخدام الكتلة '>'",
    ],
    correct: "باستخدام الكتلة '<'",
  },
  {
    id: 12,
    question: "؟ 'Touching mouse-pointer' مع شرط 'Forever' ما الذي يحدث عند تفعيل كتلة",
    options: [
      "يتم تنفيذ الأوامر إذا كانت الشخصية تلمس مؤشر الفأرة باستمرار",
      "يتم تنفيذ الأوامر مرة واحدة فقط",
      "لا يتم تنفيذ أي شيء",
    ],
    correct: "يتم تنفيذ الأوامر إذا كانت الشخصية تلمس مؤشر الفأرة باستمرار",
  },
  {
    id: 13,
    question: "؟ 'x' و 'y' كيف يمكنك التمييز إذا كانت قيمة متغير تساوي قيمة متغير آخر في Scratch",
    options: [
      "باستخدام الكتلة 'x > y'",
      "باستخدام الكتلة 'x = y'",
      "باستخدام الكتلة 'x < y'",
    ],
    correct: "باستخدام الكتلة 'x = y'",
  },
  {
    id: 14,
    question: "؟ 'Say' ما الوظيفة الرئيسية للكتلة في Scratch",
    options: [
      "لجعل الشخصية تفكر",
      "لجعل الشخصية تظهر نصًا كفقاعة كلام",
      "لجعل الشخصية تتحرك",
    ],
    correct: "لجعل الشخصية تظهر نصًا كفقاعة كلام",
  },
];

export default Exam;
