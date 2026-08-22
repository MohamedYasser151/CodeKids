import React, {
  useEffect,
  useState
} from "react";

import "./CodeKidsIsland.css";

import api from "../../component/api";

import ScoreCircle from "./components/ScoreCircle";
import ReportCard from "./components/ReportCard";
import FullReport from "./components/FullReport";

import {
  getScore,
  getLevel,
  getStatus,
  normalizeReport
} from "./utils/reportUtils";


function CodeKidsIsland() {

  const [
    reports,
    setReports
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

  const [
    student,
    setStudent
  ] = useState(null);

  const [
    selectedReport,
    setSelectedReport
  ] = useState(null);

  const [
    filter,
    setFilter
  ] = useState("all");

  const [
    search,
    setSearch
  ] = useState("");


  // =====================================================
  // LOAD LOGGED STUDENT + REPORTS
  // =====================================================

 useEffect(() => {

  let mounted = true;


  const loadReports = async () => {

    try {

      setLoading(true);
      setError("");


      // =================================================
      // GET USER
      // =================================================

      const savedUser =
        localStorage.getItem("userck");



      // =================================================
      // NO USER
      // =================================================

      if (!savedUser) {

        if (mounted) {

          setError(
            "لم يتم العثور على بيانات تسجيل الدخول."
          );

          setLoading(false);

        }

        return;

      }


      // =================================================
      // PARSE
      // =================================================

      let user;


      try {

        user =
          JSON.parse(savedUser);

      }

      catch (error) {

        console.error(
          "❌ USER PARSE ERROR:",
          error
        );


        localStorage.removeItem(
          "userck"
        );


        if (mounted) {

          setError(
            "بيانات تسجيل الدخول غير صحيحة."
          );

          setLoading(false);

        }

        return;

      }


   


      // =================================================
      // VALIDATE
      // =================================================

      if (
        !user ||
        !user.username ||
        !user.code
      ) {

       


        if (mounted) {

          setError(
            "بيانات تسجيل الدخول غير مكتملة."
          );

          setLoading(false);

        }

        return;

      }


      // =================================================
      // EXPIRATION
      // =================================================

      if (
        user.expire &&
        Date.now() >
        Number(user.expire)
      ) {

    


        localStorage.removeItem(
          "userck"
        );


        if (mounted) {

          setError(
            "انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى."
          );

          setLoading(false);

        }

        return;

      }


      // =================================================
      // SET STUDENT
      // =================================================

      if (mounted) {

        setStudent({

          username:
            user.username,

          code:
            user.code

        });

      }


     


      // =================================================
      // LOAD REPORTS
      // =================================================

      const url =
        `/reports/student/${encodeURIComponent(
          user.username
        )}/${encodeURIComponent(
          user.code
        )}`;


      

      const response =
        await api.get(url);


     

      // =================================================
      // RESPONSE ERROR
      // =================================================

      if (
        !response.data ||
        !response.data.success
      ) {

        if (mounted) {

          setError(
            response.data?.message ||
            "تعذر تحميل التقرير."
          );

        }

        return;

      }


      // =================================================
      // REPORTS
      // =================================================

      const rawReports =
        Array.isArray(
          response.data.reports
        )
          ? response.data.reports
          : [];




      const normalizedReports =
        rawReports.map(
          (report, index) =>
            normalizeReport(
              report,
              index
            )
        );


      if (mounted) {

        setReports(
          normalizedReports
        );

      }

    }

    catch (err) {

      console.error(
        "🔥 LOAD REPORTS ERROR:",
        err
      );


      if (mounted) {

        if (
          err.response
        ) {

          console.error(
            "SERVER RESPONSE:",
            err.response.data
          );

        }


        setError(
          "تعذر تحميل التقرير."
        );

      }

    }

    finally {

      if (mounted) {

        setLoading(false);

      }

    }

  };


  loadReports();


  return () => {

    mounted = false;

  };

}, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div
        className="parent-report-page"
        dir="rtl"
      >

        <div className="report-loading">

          <div className="loading-icon">
            📚
          </div>

          <h2>
            جاري تحميل التقرير...
          </h2>

          <p>
            لحظات ونجهز لك رحلة التعلم 🚀
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div
        className="parent-report-page"
        dir="rtl"
      >

        <div className="report-error">

          <div className="error-icon">
            ⚠️
          </div>

          <h2>
            تعذر تحميل التقرير
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            إعادة المحاولة
          </button>

        </div>

      </div>

    );

  }


  // =====================================================
  // SORT
  // =====================================================

  const sortedReports =
    [...reports].sort(
      (a, b) => {

        const dateA =
          new Date(
            a.report_date ||
            a.created_at
          ).getTime();

        const dateB =
          new Date(
            b.report_date ||
            b.created_at
          ).getTime();

        return dateB - dateA;

      }
    );


  // =====================================================
  // FILTER
  // =====================================================

  const filteredReports =
    sortedReports.filter(
      report => {

        const lesson =
          String(
            report.lesson_title ||
            ""
          ).toLowerCase();


        const searchValue =
          search
            .toLowerCase()
            .trim();


        const matchesSearch =
          lesson.includes(
            searchValue
          );


        if (filter === "all") {

          return matchesSearch;

        }


        if (filter === "excellent") {

          return (
            matchesSearch &&
            Number(report.rating) >= 4
          );

        }


        if (filter === "good") {

          return (
            matchesSearch &&
            Number(report.rating) >= 3 &&
            Number(report.rating) < 4
          );

        }


        return matchesSearch;

      }
    );


  // =====================================================
  // STATISTICS
  // =====================================================

  const totalReports =
    reports.length;


  const average =
    totalReports > 0

      ? (
          reports.reduce(
            (sum, report) =>
              sum +
              Number(
                report.rating || 0
              ),
            0
          ) /
          totalReports
        ).toFixed(1)

      : "0";


  const bestRating =
    totalReports > 0

      ? Math.max(
          ...reports.map(
            report =>
              Number(
                report.rating || 0
              )
          )
        )

      : 0;


  const todayReport =
    sortedReports[0];


  // =====================================================
  // EMPTY
  // =====================================================

  if (reports.length === 0) {

    return (

      <div
        className="parent-report-page"
        dir="rtl"
      >

        <header className="parent-header">

          <div className="brand">

            <div className="brand-logo">
              💻
            </div>

            <div>

              <strong>
                Code Kids
              </strong>

              <span>
                تقرير رحلة التعلم
              </span>

            </div>

          </div>


          {student && (

            <div className="parent-profile">

              <div className="child-avatar">
                👦
              </div>

              <div>

                <strong>
                  {student.username}
                </strong>

                <span>
                  الكود: {student.code}
                </span>

              </div>

            </div>

          )}

        </header>


        <main className="parent-content">

          <section className="empty-reports">

            <div>
              📚
            </div>

            <h3>
              لا توجد تقارير حتى الآن
            </h3>

            <p>
              ستظهر تقارير الحصص هنا بمجرد أن
              يقوم المدرس بإضافتها.
            </p>

          </section>

        </main>

      </div>

    );

  }


  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (

    <div
      className="parent-report-page"
      dir="rtl"
    >

      {/* HEADER */}

      <header className="parent-header">

        <div className="brand">

          <div className="brand-logo">
            💻
          </div>

          <div>

            <strong>
              Code Kids
            </strong>

            <span>
              تقرير رحلة التعلم
            </span>

          </div>

        </div>


        <div className="parent-profile">

          <div className="child-avatar">
            👦
          </div>

          <div>

            <strong>
              {student?.username}
            </strong>

            <span>
              الكود: {student?.code}
            </span>

          </div>

        </div>

      </header>


      {/* CONTENT */}

      <main className="parent-content">


        {/* WELCOME */}

        <section className="welcome-section">

          <div>

            <span className="welcome-label">
              متابعة تعليمية
            </span>

            <h1>
              تقرير رحلة التعلم 📊
            </h1>

            <p>

              مرحبًا{" "}

              <strong>
                {student?.username}
              </strong>

              ، هنا يمكنك متابعة مستوى الطفل،
              تقييم الحصص وما يراه المدرس من
              نقاط قوة وفرص للتطور.

            </p>

          </div>


          <div className="welcome-decoration">

            <div>📚</div>
            <div>⭐</div>
            <div>🚀</div>

          </div>

        </section>


        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              📚
            </div>

            <div>

              <span>
                عدد التقارير
              </span>

              <strong>
                {totalReports}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ⭐
            </div>

            <div>

              <span>
                متوسط التقييم
              </span>

              <strong>
                {average}/5
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon yellow">
              🏆
            </div>

            <div>

              <span>
                أعلى تقييم
              </span>

              <strong>
                {bestRating}/5
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              🚀
            </div>

            <div>

              <span>
                آخر حصة
              </span>

              <strong>
                {todayReport
                  ? "حديثة"
                  : "-"
                }
              </strong>

            </div>

          </div>

        </section>


        {/* TODAY */}

        {todayReport && (

          <section className="today-section">

            <div className="section-heading">

              <div>

                <span>
                  آخر تحديث
                </span>

                <h2>
                  آخر تقرير
                </h2>

              </div>

              <div className="live-badge">
                ● محدث
              </div>

            </div>


            <div className="today-layout">

              <div className="today-score">

                <ScoreCircle
                  score={
                    todayReport.score
                  }
                />

                <strong>
                  {todayReport.level}
                </strong>

                <span>
                  تقييم المدرس
                </span>

              </div>


              <div className="today-info">

                <div className="lesson-chip">

                  📚{" "}
                  {todayReport.course}

                </div>

                <h3>
                  {todayReport.lesson}
                </h3>

                <p>

                  {todayReport.evaluationText}

                </p>


                <div className="quick-info">

                  <div>

                    <span>
                      ماذا تعلم الطفل؟
                    </span>

                    <strong>

                      ✓{" "}

                      {todayReport.learned
                        ? "تم تسجيل التعلم"
                        : "تم إنجاز الحصة"
                      }

                    </strong>

                  </div>


                  <div>

                    <span>
                      ملاحظات
                    </span>

                    <strong>

                      {todayReport.notes.length > 0
                        ? "متوفرة"
                        : "لا توجد"
                      }

                    </strong>

                  </div>

                </div>


                <button
                  type="button"
                  className="primary-report-button"
                  onClick={() =>
                    setSelectedReport(
                      todayReport
                    )
                  }
                >

                  عرض تقرير الحصة

                  <span>
                    ←
                  </span>

                </button>

              </div>

            </div>

          </section>

        )}


        {/* HISTORY */}

        <section className="history-section">

          <div className="history-header">

            <div>

              <span>
                سجل المتابعة
              </span>

              <h2>
                التقارير السابقة
              </h2>

            </div>


            <div className="report-count">

              {filteredReports.length}
              {" "}
              تقارير

            </div>

          </div>


          {/* TOOLS */}

          <div className="report-tools">

            <div className="search-box">

              🔎

              <input
                type="text"
                placeholder="ابحث عن حصة..."
                value={search}
                onChange={event =>
                  setSearch(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="filter-buttons">

              <button
                type="button"
                className={
                  filter === "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                الكل
              </button>


              <button
                type="button"
                className={
                  filter === "excellent"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("excellent")
                }
              >
                ممتاز
              </button>


              <button
                type="button"
                className={
                  filter === "good"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("good")
                }
              >
                جيد جدًا
              </button>

            </div>

          </div>


          {/* REPORTS */}

          <div className="reports-grid">

            {filteredReports
              .slice(1)
              .map(report => (

                <ReportCard
                  key={report.id}
                  report={report}
                  isToday={false}
                  onOpen={() =>
                    setSelectedReport(
                      report
                    )
                  }
                />

              ))}

          </div>


          {filteredReports.length <= 1 && (

            <div className="empty-reports">

              <div>
                📚
              </div>

              <h3>
                لا توجد تقارير أخرى
              </h3>

              <p>
                ستظهر هنا تقارير الحصص السابقة
                عند إضافتها.
              </p>

            </div>

          )}

        </section>


        {/* FOOTER */}

        <section className="parent-message">

          <div className="message-icon">
            💙
          </div>

          <div>

            <strong>
              كل حصة هي خطوة جديدة
            </strong>

            <p>
              نتابع تطور الطفل خطوة بخطوة،
              ونركز على التعلم والاستمتاع معًا.
            </p>

          </div>

        </section>

      </main>


      {/* FULL REPORT */}

      {selectedReport && (

        <FullReport
          report={
            selectedReport
          }
          onClose={() =>
            setSelectedReport(null)
          }
        />

      )}

    </div>

  );

}

export default CodeKidsIsland;