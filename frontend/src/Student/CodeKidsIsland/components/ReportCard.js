import React from "react";

import ScoreCircle from "./ScoreCircle";
import NoteDot from "./NoteDot";


function ReportCard({
  report,
  isToday,
  onOpen
}) {

  if (!report) {
    return null;
  }

  const statusClass =
    report.status ||
    "excellent";

  return (

    <article
      className={
        `
        report-card
        ${
          isToday
            ? "today-report"
            : ""
        }
        `
      }
    >

      <div className="report-card-top">

        <div>

          <div className="report-date">

            {isToday && (

              <span className="today-label">
                تقرير اليوم
              </span>

            )}

            <span>
              📅 {report.date}
            </span>

          </div>

          <h3>
            {report.lesson}
          </h3>

          <div className="report-course">
            {report.course}
          </div>

        </div>

        <ScoreCircle
          score={report.score}
        />

      </div>


      <div
        className={
          `
          report-level
          ${statusClass}
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


      <p className="report-summary">

        {report.teacher_notes ||
          report.evaluationText}

      </p>


      {report.notes &&
        report.notes.length > 0 && (

        <div className="report-notes-row">

          <span>
            ملاحظات المدرس
          </span>

          <div className="notes-dots">

            {report.notes.map(
              note => (

                <NoteDot
                  key={note.id}
                  note={note}
                  onClick={onOpen}
                />

              )
            )}

          </div>

        </div>

      )}


      <button
        type="button"
        className="open-report-button"
        onClick={() =>
          onOpen(report)
        }
      >

        عرض التقرير الكامل

        <span>
          ←
        </span>

      </button>

    </article>

  );

}

export default ReportCard;