import React, {
  useState
} from "react";

import ScoreCircle from "./ScoreCircle";


function FullReport({
  report,
  onClose
}) {

  const [
    selectedNote,
    setSelectedNote
  ] = useState(null);


  if (!report) {
    return null;
  }


  return (

    <div
      className="report-overlay"
      onClick={onClose}
    >

      <div
        className="full-report"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="full-report-header">

          <div>

            <div className="small-label">
              تقرير الحصة
            </div>

            <h2>
              {report.lesson}
            </h2>

            <div className="full-report-date">
              📅 {report.date}
            </div>

          </div>


          <button
            type="button"
            className="close-report"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* SCORE */}

        <div className="report-hero">

          <ScoreCircle
            score={report.score}
          />

          <div>

            <div className="hero-title">
              تقييم الحصة
            </div>

            <div
              className={
                `
                report-level
                ${report.status}
                `
              }
            >

              {report.score >= 90
                ? "🌟 "
                : report.score >= 80
                  ? "👏 "
                  : "💪 "
              }

              {report.level}

            </div>

            <p>
              {report.teacher_notes ||
                report.evaluationText}
            </p>

          </div>

        </div>


        {/* COURSE */}

        <section className="detail-section">

          <div className="section-title">

            <span className="section-icon">
              📚
            </span>

            الكورس

          </div>

          <p>
            {report.course}
          </p>

        </section>


        {/* LEARNED */}

        <section className="detail-section">

          <div className="section-title">

            <span className="section-icon">
              📖
            </span>

            ماذا تعلم الطفل؟

          </div>

          <p>
            {report.learned}
          </p>

        </section>


        {/* STRENGTHS */}

        <section className="detail-section">

          <div className="section-title">

            <span className="section-icon">
              ⭐
            </span>

            نقاط القوة

          </div>


          {report.strengths &&
          report.strengths.length > 0 ? (

            <div className="strength-list">

              {report.strengths.map(
                (item, index) => (

                  <div
                    className="strength-item"
                    key={index}
                  >

                    <span>
                      ✓
                    </span>

                    {item}

                  </div>

                )
              )}

            </div>

          ) : (

            <p>
              لم يتم تسجيل نقاط قوة محددة.
            </p>

          )}

        </section>


        {/* IMPROVEMENTS */}

        {report.improvements &&
        report.improvements.length > 0 && (

          <section
            className="
              detail-section
              improvement-section
            "
          >

            <div className="section-title">

              <span className="section-icon">
                🎯
              </span>

              نقاط تحتاج إلى تطوير

            </div>


            <div className="strength-list">

              {report.improvements.map(
                (item, index) => (

                  <div
                    className="improvement-item"
                    key={index}
                  >

                    <span>
                      •
                    </span>

                    {item}

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* TEACHER NOTES */}

        {report.notes &&
        report.notes.length > 0 && (

          <section className="detail-section">

            <div className="section-title">

              <span className="section-icon">
                👨‍🏫
              </span>

              ملاحظات المدرس

            </div>


            <div className="note-grid">

              {report.notes.map(
                note => (

                  <button
                    type="button"
                    className="note-card"
                    key={note.id}
                    onClick={() =>
                      setSelectedNote(note)
                    }
                  >

                    <span className="note-icon">
                      📝
                    </span>

                    <div>

                      <strong>
                        {note.title}
                      </strong>

                      <p>
                        {note.text}
                      </p>

                    </div>

                  </button>

                )
              )}

            </div>

          </section>

        )}


        {/* FOOTER */}

        <div className="report-footer">

          <span>
            Code Kids
          </span>

          <span>
            رحلة تعلم مستمرة 🚀
          </span>

        </div>


        {/* POPUP */}

        {selectedNote && (

          <div
            className="note-popup-overlay"
            onClick={() =>
              setSelectedNote(null)
            }
          >

            <div
              className="note-popup"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="popup-icon">
                📝
              </div>

              <h3>
                {selectedNote.title}
              </h3>

              <p>
                {selectedNote.text}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedNote(null)
                }
              >
                فهمت
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default FullReport;