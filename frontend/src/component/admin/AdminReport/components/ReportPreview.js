import React from "react";

function ReportPreview({
  student,
  form,
  onClose,
  onSave
}) {

  return (

    <div
      className="preview-overlay"
      onClick={onClose}
    >

      <div
        className="preview-modal"
        onClick={e =>
          e.stopPropagation()
        }
      >

        <button
          className="preview-close"
          onClick={onClose}
        >
          ×
        </button>


        <div className="preview-header">

          <div className="preview-logo">
            🚀
          </div>

          <div>

            <h2>
              Code Kids
            </h2>

            <p>
              تقرير متابعة الطفل
            </p>

          </div>

        </div>


        {/* STUDENT */}

        <div className="preview-student">

          <div>
            👦
          </div>

          <section>

            <h3>
              {student?.username}
            </h3>

            <span>
              ID: {student?.id}
            </span>

          </section>

        </div>


        {/* LESSON */}

        <div className="preview-info">

          <div>

            <small>
              الكورس
            </small>

            <strong>
              {form.course}
            </strong>

          </div>


          <div>

            <small>
              الدرس
            </small>

            <strong>
              {form.lessonTitle}
            </strong>

          </div>


          {form.lessonNumber && (

            <div>

              <small>
                رقم الحصة
              </small>

              <strong>
                {form.lessonNumber}
              </strong>

            </div>

          )}

        </div>


        {/* RATING */}

        <div className="preview-rating">

          <span>
            التقييم
          </span>

          <div>

            {"⭐".repeat(
              Number(form.evaluation)
            )}

          </div>

          <strong>
            {form.evaluation}/5
          </strong>

        </div>


        {/* STRENGTHS */}

        <div className="preview-section">

          <h4>
            💪 نقاط القوة
          </h4>

          <p>
            {form.strengths ||
              "لم يتم إدخال نقاط القوة"}
          </p>

        </div>


        {/* IMPROVEMENTS */}

        <div className="preview-section">

          <h4>
            🚀 ما يحتاج إلى تطوير
          </h4>

          <p>
            {form.improvements ||
              "لا توجد ملاحظات"}
          </p>

        </div>


        {/* NOTES */}

        <div className="preview-section">

          <h4>
            👨‍🏫 ملاحظات المدرس
          </h4>

          <p>
            {form.notes ||
              "لا توجد ملاحظات إضافية"}
          </p>

        </div>


        <div className="preview-footer">

          📅 {form.date}

        </div>


        <button
          className="preview-save-btn"
          onClick={onSave}
        >
          💾 اعتماد وحفظ التقرير
        </button>

      </div>

    </div>

  );

}

export default ReportPreview;