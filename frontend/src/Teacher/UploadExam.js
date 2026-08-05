import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileWord,
  FaFilePdf,
  FaFileExcel,
  FaTrash,
} from "react-icons/fa";
import "./UploadExam.css";

function UploadExam() {
  const inputRef = useRef(null);

  const [examTitle, setExamTitle] = useState("");
  const [lesson, setLesson] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState(null);

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleFile = (e) => {
    if (!e.target.files[0]) return;

    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    inputRef.current.value = "";
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        <h2>📄 Upload New Exam</h2>

        <div className="form-group">
          <label>Exam Title</label>

          <input
            type="text"
            placeholder="Scratch Lesson 1"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Lesson</label>

          <input
            type="text"
            placeholder="Lesson Name"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Duration (Minutes)</label>

          <input
            type="number"
            placeholder="30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div
          className="upload-box"
          onClick={handleChooseFile}
        >

          <FaCloudUploadAlt className="upload-icon" />

          <h3>Drag & Drop or Click</h3>

          <p>DOCX • PDF • XLSX</p>

          <button type="button">
            Choose File
          </button>

          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".docx,.pdf,.xlsx"
            onChange={handleFile}
          />

        </div>

        {file && (

          <div className="selected-file">

            <div className="file-info">

              {file.name.endsWith(".docx") && (
                <FaFileWord className="word" />
              )}

              {file.name.endsWith(".pdf") && (
                <FaFilePdf className="pdf" />
              )}

              {file.name.endsWith(".xlsx") && (
                <FaFileExcel className="excel" />
              )}

              <div>

                <h4>{file.name}</h4>

                <span>
                  {(file.size / 1024).toFixed(1)} KB
                </span>

              </div>

            </div>

            <button
              className="remove-btn"
              onClick={removeFile}
            >
              <FaTrash />
            </button>

          </div>

        )}

        <button className="upload-btn">
          Upload Exam
        </button>

      </div>

    </div>
  );
}

export default UploadExam;