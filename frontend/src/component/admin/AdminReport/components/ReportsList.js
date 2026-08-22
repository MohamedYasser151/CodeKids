import React from "react";

function ReportsList({
  reports,
  loading,
  onDelete
}) {

  return (

    <section className="report-card reports-list">

      <div className="card-title">

        <span>
          📚
        </span>

        <div>

          <h2>
            التقارير السابقة
          </h2>

          <p>
            جميع التقارير المسجلة لهذا الطفل
          </p>

        </div>

      </div>


      {loading ? (

        <div className="reports-loading">
          جاري تحميل التقارير...
        </div>

      ) : reports.length === 0 ? (

        <div className="reports-empty">

          <div>
            📭
          </div>

          <h3>
            لا توجد تقارير سابقة
          </h3>

          <p>
            عند إضافة تقرير سيظهر هنا
          </p>

        </div>

      ) : (

        <div className="reports-items">

          {reports.map(report => (

            <article
              className="report-item"
              key={report.id}
            >

              <div className="report-item-main">

                <h3>
                  {report.lesson_title}
                </h3>

                <span>
                  📚 {report.course}
                </span>

              </div>


              <div className="report-rating">

                {"⭐".repeat(
                  Number(report.evaluation)
                )}

                <small>
                  {report.evaluation}/5
                </small>

              </div>


              <div className="report-date">

                📅 {report.date}

              </div>


              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  onDelete(report.id)
                }
              >
                🗑️
              </button>

            </article>

          ))}

        </div>

      )}

    </section>

  );

}

export default ReportsList;