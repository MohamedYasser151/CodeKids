import React, { useState, useEffect } from 'react';
import style from './game.module.css';

function Testone() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const generatedQuestions = [
      {
        question: "ما هو عاصمة مصر؟",
        options: ["القاهرة", "الإسكندرية", "الأقصر", "أسوان"],
        correctAnswer: "القاهرة"
      },
      {
        question: "ما هو أكبر كوكب في النظام الشمسي؟",
        options: ["الأرض", "المريخ", "المشتري", "الزهرة"],
        correctAnswer: "المشتري"
      },
      {
        question: "من هو مؤسس علم الجبر؟",
        options: ["الخوارزمي", "ابن سينا", "أبو بكر الرازي", "ابن الهيثم"],
        correctAnswer: "الخوارزمي"
      },
      {
        question: "كم عدد الكواكب في النظام الشمسي؟",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8"
      },
      {
        question: "ما هي عاصمة فرنسا؟",
        options: ["باريس", "روما", "لندن", "برلين"],
        correctAnswer: "باريس"
      },
      {
        question: "من هو مخترع المصباح الكهربائي؟",
        options: ["أديسون", "أينشتاين", "نيوتن", "جاليليو"],
        correctAnswer: "أديسون"
      },
      {
        question: "ما هو أسرع حيوان بري؟",
        options: ["الفهد", "الأسد", "النمر", "الفيل"],
        correctAnswer: "الفهد"
      },
      {
        question: "ما هو أكبر محيط في العالم؟",
        options: ["المحيط الأطلسي", "المحيط الهادئ", "المحيط الهندي", "المحيط المتجمد الشمالي"],
        correctAnswer: "المحيط الهادئ"
      },
      {
        question: "ما هي أول دولة استخدمت الورق؟",
        options: ["الصين", "اليابان", "الهند", "مصر"],
        correctAnswer: "الصين"
      },
      {
        question: "ما هو العنصر الكيميائي الذي رمزه Fe؟",
        options: ["النحاس", "الحديد", "الزئبق", "الذهب"],
        correctAnswer: "الحديد"
      }
    ];

    setQuestions(generatedQuestions);
    const randomIndex = getRandomUnusedIndex(generatedQuestions);
    setCurrentQuestionIndex(randomIndex);
  }, []);

  const getRandomUnusedIndex = (questionsList) => {
    const unusedQuestions = questionsList.filter((_, index) => !usedQuestions.includes(index));

    if (unusedQuestions.length === 0 || usedQuestions.length >= 10) {
      setGameOver(true);
      return -1;
    }

    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const selectedQuestionIndex = questionsList.indexOf(unusedQuestions[randomIndex]);
    setUsedQuestions((prevUsedQuestions) => [...prevUsedQuestions, selectedQuestionIndex]);
    return selectedQuestionIndex;
  };

  const handleAnswer = (answer) => {
    setUserAnswer(answer);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 3);
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    setUserAnswer(null);
    const randomIndex = getRandomUnusedIndex(questions);
    if (randomIndex !== -1) {
      setCurrentQuestionIndex(randomIndex);
    }
  };

  const onClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (gameOver) {
      // حفظ النتيجة في localStorage عند انتهاء اللعبة
      localStorage.setItem('level1Score', score);
    }
  }, [gameOver, score]);

  return (
    <div className={style.Game}>
      <div className={style.card}>
        {gameOver ? (
          <div className={style.end}>
            <h1>انتهت اللعبة</h1>
            <p>نهاية اللعبة! النقاط الإجمالية: 30/{score}</p>
            <button onClick={onClick} className={style.reload}>إعادة الاختبار</button>
          </div>
        ) : questions.length > 0 ? (
          <div className={style.Allcard}>
            <p>{questions[currentQuestionIndex].question}</p>

            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}

            {userAnswer !== null && (
              <div>
                {userAnswer === questions[currentQuestionIndex].correctAnswer ? (
                  <div>
                    <h2>إجابة صحيحة!</h2>
                  </div>
                ) : (
                  <div>
                    <h2>إجابة خاطئة!</h2>
                    <p>الإجابة الصحيحة هي: {questions[currentQuestionIndex].correctAnswer}</p>
                  </div>
                )}
              </div>
            )}

            <p>النقاط: {score}</p>
          </div>
        ) : (
          <div>
            <h2>لا توجد أسئلة متاحة</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testone;
