import React, { useEffect, useState } from "react";

import "./css/AdminReports.css";

import StudentSelector from "./components/StudentSelector";
import ReportForm from "./components/ReportForm";
import ReportsList from "./components/ReportsList";
import ReportPreview from "./components/ReportPreview";


const API = "http://localhost:8083";


const initialForm = {

  course: "",
  lessonTitle: "",
  lessonNumber: "",

  evaluation: 5,

  strengths: "",
  improvements: "",
  notes: "",

  date:
    new Date()
      .toISOString()
      .split("T")[0]

};


function AdminReports() {

  const [students, setStudents] =
    useState([]);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [reports, setReports] =
    useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [showPreview, setShowPreview] =
    useState(false);

  const [loadingStudents, setLoadingStudents] =
    useState(true);

  const [loadingReports, setLoadingReports] =
    useState(false);


  // =====================================================
  // GET STUDENTS
  // =====================================================

  useEffect(() => {

    const loadStudents = async () => {

      try {

        setLoadingStudents(true);

        const response =
          await fetch(
            `${API}/admin/report-students`
          );

        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to load students"
          );

        }


        setStudents(
          data.students || []
        );


      } catch (error) {

        console.error(
          "LOAD STUDENTS:",
          error
        );

      } finally {

        setLoadingStudents(false);

      }

    };


    loadStudents();

  }, []);


  // =====================================================
  // SELECT STUDENT
  // =====================================================

  const handleStudentSelect =
    async (student) => {

      setSelectedStudent(student);

      setReports([]);

      setForm(initialForm);


      if (!student) {

        return;

      }


      await getStudentReports(
        student.code
      );

    };


  // =====================================================
  // GET REPORTS
  // =====================================================

  const getStudentReports =
    async (studentCode) => {

      try {

        setLoadingReports(true);

        const response =
          await fetch(
            `${API}/reports/student/${encodeURIComponent(
              studentCode
            )}`
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to load reports"
          );

        }


        setReports(
          data.reports || []
        );


      } catch (error) {

        console.error(
          "LOAD REPORTS:",
          error
        );

        setReports([]);

      } finally {

        setLoadingReports(false);

      }

    };


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleFormChange =
    (name, value) => {

      setForm(prev => ({

        ...prev,

        [name]: value

      }));

    };


  // =====================================================
  // SAVE REPORT
  // =====================================================

  const handleSaveReport =
    async () => {

      if (!selectedStudent) {

        alert(
          "اختر الطفل أولاً"
        );

        return;

      }


      if (!form.course.trim()) {

        alert(
          "اكتب اسم الكورس"
        );

        return;

      }


      if (!form.lessonTitle.trim()) {

        alert(
          "اكتب عنوان الدرس"
        );

        return;

      }


      if (!form.strengths.trim()) {

        alert(
          "اكتب نقاط القوة"
        );

        return;

      }


      try {

        const response =
          await fetch(
            `${API}/admin/reports`,
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body: JSON.stringify({

                // =========================
                // STUDENT
                // =========================

                student_id:
                  selectedStudent.id,

                student_code:
                  selectedStudent.code,

                student_name:
                  selectedStudent.username,


                // =========================
                // LESSON
                // =========================

                course:
                  form.course.trim(),

                lesson_title:
                  form.lessonTitle.trim(),

                lesson_content:
                  form.improvements.trim(),

                what_learned:
                  form.strengths.trim(),

                evaluation:
                  form.evaluation,

                teacher_notes:
                  form.notes.trim(),

                rating:
                  form.evaluation,

                report_date:
                  form.date

              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.message ||
            "حدث خطأ أثناء حفظ التقرير"
          );

          return;

        }


        alert(
          "تم حفظ التقرير بنجاح 🎉"
        );


        setForm(
          initialForm
        );


        setShowPreview(false);


        await getStudentReports(
          selectedStudent.code
        );


      } catch (error) {

        console.error(
          "SAVE REPORT:",
          error
        );

        alert(
          "تعذر الاتصال بالسيرفر"
        );

      }

    };


  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {

    setForm(
      initialForm
    );

  };


  // =====================================================
  // PREVIEW
  // =====================================================

  const handlePreview = () => {

    if (!selectedStudent) {

      alert(
        "اختر الطفل أولاً"
      );

      return;

    }


    setShowPreview(true);

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteReport =
    async (reportId) => {

      const confirmed =
        window.confirm(
          "هل أنت متأكد من حذف التقرير؟"
        );


      if (!confirmed) {

        return;

      }


      try {

        const response =
          await fetch(
            `${API}/admin/reports/${reportId}`,
            {

              method: "DELETE"

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.message ||
            "فشل حذف التقرير"
          );

          return;

        }


        await getStudentReports(
          selectedStudent.code
        );


      } catch (error) {

        console.error(
          "DELETE REPORT:",
          error
        );

        alert(
          "تعذر الاتصال بالسيرفر"
        );

      }

    };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div
      className="admin-reports-page"
      dir="rtl"
    >

      {/* HEADER */}

      <header className="admin-reports-header">

        <div className="admin-brand">

          <div className="brand-icon">
            🚀
          </div>

          <div>

            <h1>
              Code Kids
            </h1>

            <span>
              لوحة تقارير الأطفال
            </span>

          </div>

        </div>


        <div className="page-title">

          <div className="page-title-icon">
            📊
          </div>

          <div>

            <h2>
              تقارير الأطفال
            </h2>

            <p>
              إدارة ومتابعة تقارير الحصص
            </p>

          </div>

        </div>

      </header>


      {/* MAIN */}

      <main className="admin-reports-content">

        {/* STUDENTS */}

        <StudentSelector
          students={students}
          selectedStudent={selectedStudent}
          onSelect={handleStudentSelect}
          loading={loadingStudents}
        />


        {/* SELECTED */}

        {selectedStudent && (

          <div className="reports-dashboard">


            {/* STUDENT INFO */}

            <div className="selected-student-card">

              <div className="selected-avatar">
                👦
              </div>

              <div>

                <span>
                  الطفل المختار
                </span>

                <h2>
                  {selectedStudent.username}
                </h2>

              </div>


              <div className="student-code-box">

                <small>
                  كود الطفل
                </small>

                <strong>
                  {selectedStudent.code}
                </strong>

              </div>

            </div>


            {/* FORM */}

            <ReportForm
              form={form}
              onChange={handleFormChange}
              onSave={handleSaveReport}
              onReset={handleReset}
              onPreview={handlePreview}
            />


            {/* REPORTS */}

            <ReportsList
              reports={reports}
              loading={loadingReports}
              onDelete={handleDeleteReport}
            />

          </div>

        )}


        {/* EMPTY */}

        {!selectedStudent &&
          !loadingStudents && (

          <div className="reports-empty-state">

            <div className="empty-icon">
              👦
            </div>

            <h2>
              اختر طفلًا للبدء
            </h2>

            <p>
              اختر اسم الطفل من الأعلى
              لإضافة أو مشاهدة تقاريره
            </p>

          </div>

        )}

      </main>


      {/* PREVIEW */}

      {showPreview && (

        <ReportPreview

          student={selectedStudent}

          form={form}

          onClose={() =>
            setShowPreview(false)
          }

          onSave={handleSaveReport}

        />

      )}

    </div>

  );

}


export default AdminReports;