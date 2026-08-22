// =========================================================
// RATING TO SCORE
// =========================================================

export function getScore(rating) {

  const value = Number(rating || 0);

  if (!value) {
    return 0;
  }

  return value * 20;
}


// =========================================================
// GET LEVEL
// =========================================================

export function getLevel(rating) {

  const score = getScore(rating);

  if (score >= 90) {
    return "ممتاز";
  }

  if (score >= 80) {
    return "جيد جدًا";
  }

  if (score >= 70) {
    return "جيد";
  }

  return "يحتاج إلى تطوير";
}


// =========================================================
// GET STATUS
// =========================================================

export function getStatus(rating) {

  const score = getScore(rating);

  if (score >= 90) {
    return "excellent";
  }

  if (score >= 80) {
    return "very-good";
  }

  return "good";
}


// =========================================================
// EVALUATION TEXT
// =========================================================

export function getEvaluationText(evaluation) {

  const value = Number(evaluation);

  if (value >= 5) {

    return (
      "أداء ممتاز جدًا، والطفل أظهر تفاعلًا واستيعابًا رائعًا خلال الحصة."
    );

  }

  if (value >= 4) {

    return (
      "أداء ممتاز، والطفل تمكن من فهم وتنفيذ معظم المطلوب خلال الحصة."
    );

  }

  if (value >= 3) {

    return (
      "أداء جيد جدًا، والطفل تمكن من فهم الجزء الأساسي من الدرس."
    );

  }

  if (value >= 2) {

    return (
      "أداء جيد، ويحتاج الطفل إلى مزيد من التدريب والممارسة."
    );

  }

  return (
    "يحتاج الطفل إلى متابعة وتدريب إضافي على محتوى الحصة."
  );
}


// =========================================================
// NORMALIZE REPORT
// =========================================================

export function normalizeReport(report, index = 0) {

  const rating =
    Number(
      report.rating || 0
    );

  const score =
    getScore(rating);

  const teacherNotes =
    report.teacher_notes || "";

  return {

    ...report,

    id:
      report.id ??
      index,

    date:
      report.report_date ||
      report.created_at ||
      "",

    lesson:
      report.lesson_title ||
      "حصة تعليمية",

    course:
      report.course ||
      "Code Kids",

    score,

    level:
      getLevel(rating),

    status:
      getStatus(rating),

    learned:
      report.what_learned ||
      "لم يتم تسجيل المحتوى التعليمي.",

    evaluationText:
      report.evaluation ||
      getEvaluationText(rating),

    strengths:
      report.what_learned
        ? report.what_learned
            .split("\n")
            .map(item => item.trim())
            .filter(Boolean)
        : [],

    improvements:
      report.lesson_content
        ? report.lesson_content
            .split("\n")
            .map(item => item.trim())
            .filter(Boolean)
        : [],

    notes:
      teacherNotes
        ? [
            {
              id:
                `note-${report.id}`,

              title:
                "ملاحظة المدرس",

              text:
                teacherNotes,

              position:
                "top-right"
            }
          ]
        : []

  };

}