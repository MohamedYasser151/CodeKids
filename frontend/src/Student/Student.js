import "./Student.css";
import { FaClock, FaPlayCircle } from "react-icons/fa";

function Student() {
  const exams = [
    {
      id: 1,
      title: "Scratch Lesson 1",
      lesson: "Introduction to Scratch",
      questions: 10,
      duration: 30,
    },
    {
      id: 2,
      title: "Variables Quiz",
      lesson: "Variables",
      questions: 15,
      duration: 20,
    },
    {
      id: 3,
      title: "Loops Test",
      lesson: "Loops",
      questions: 12,
      duration: 25,
    },
  ];

  return (
    <div className="student-page">

      <div className="student-header">
        <h1>👋 Welcome Student</h1>
        <p>Select an exam to begin.</p>
      </div>

      <div className="exam-grid">

        {exams.map((exam) => (

          <div className="exam-card" key={exam.id}>

            <h2>{exam.title}</h2>

            <p>{exam.lesson}</p>

            <div className="exam-info">

              <span>{exam.questions} Questions</span>

              <span>
                <FaClock />
                {exam.duration} min
              </span>

            </div>

            <button className="start-btn">
              <FaPlayCircle />
              Start Exam
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Student;