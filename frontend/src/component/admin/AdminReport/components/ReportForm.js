import React from "react";

function ReportForm({
  form,
  onChange,
  onSave,
  onReset,
  onPreview
}) {

  return (

    <section className="report-card">

      <div className="card-title">

        <span>
          📝
        </span>

        <div>

          <h2>
            تقرير الحصة
          </h2>

          <p>
            أضف تقييم الطفل بعد الحصة
          </p>

        </div>

      </div>


      <div className="report-form-grid">


        {/* COURSE */}

        <div className="form-group">

          <label>
            📚 الكورس / المادة
          </label>

          <input
            value={form.course}
            onChange={e =>
              onChange(
                "course",
                e.target.value
              )
            }
            placeholder="مثال: Scratch أو Python"
          />

        </div>


        {/* LESSON NUMBER */}

        <div className="form-group">

          <label>
            🔢 رقم الحصة
          </label>

          <input
            value={form.lessonNumber}
            onChange={e =>
              onChange(
                "lessonNumber",
                e.target.value
              )
            }
            placeholder="مثال: 5"
          />

        </div>


        {/* LESSON */}

        <div className="form-group full">

          <label>
            📝 عنوان الدرس
          </label>

          <input
            value={form.lessonTitle}
            onChange={e =>
              onChange(
                "lessonTitle",
                e.target.value
              )
            }
            placeholder="مثال: المتغيرات في Scratch"
          />

        </div>


        {/* DATE */}

        <div className="form-group">

          <label>
            📅 تاريخ الحصة
          </label>

          <input
            type="date"
            value={form.date}
            onChange={e =>
              onChange(
                "date",
                e.target.value
              )
            }
          />

        </div>


        {/* EVALUATION */}

        <div className="form-group">

          <label>
            ⭐ التقييم
          </label>

          <select
            value={form.evaluation}
            onChange={e =>
              onChange(
                "evaluation",
                Number(e.target.value)
              )
            }
          >

            <option value={5}>
              ⭐⭐⭐⭐⭐ ممتاز جدًا
            </option>

            <option value={4}>
              ⭐⭐⭐⭐ ممتاز
            </option>

            <option value={3}>
              ⭐⭐⭐ جيد جدًا
            </option>

            <option value={2}>
              ⭐⭐ جيد
            </option>

            <option value={1}>
              ⭐ يحتاج متابعة
            </option>

          </select>

        </div>


        {/* STRENGTHS */}

        <div className="form-group full">

          <label>
            💪 نقاط القوة
          </label>

          <textarea
            rows="4"
            value={form.strengths}
            onChange={e =>
              onChange(
                "strengths",
                e.target.value
              )
            }
            placeholder="ماذا أتقن الطفل اليوم؟"
          />

        </div>


        {/* IMPROVEMENTS */}

        <div className="form-group full">

          <label>
            🚀 ما يحتاج إلى تطوير
          </label>

          <textarea
            rows="4"
            value={form.improvements}
            onChange={e =>
              onChange(
                "improvements",
                e.target.value
              )
            }
            placeholder="ما النقطة التي تحتاج إلى مزيد من التدريب؟"
          />

        </div>


        {/* NOTES */}

        <div className="form-group full">

          <label>
            👨‍🏫 ملاحظات المدرس
          </label>

          <textarea
            rows="4"
            value={form.notes}
            onChange={e =>
              onChange(
                "notes",
                e.target.value
              )
            }
            placeholder="ملاحظة إضافية لولي الأمر..."
          />

        </div>

      </div>


      {/* ACTIONS */}

      <div className="form-actions">

        <button
          type="button"
          className="preview-btn"
          onClick={onPreview}
        >
          👀 معاينة
        </button>


        <button
          type="button"
          className="reset-btn"
          onClick={onReset}
        >
          مسح
        </button>


        <button
          type="button"
          className="save-btn"
          onClick={onSave}
        >
          💾 حفظ التقرير
        </button>

      </div>

    </section>

  );

}

export default ReportForm;