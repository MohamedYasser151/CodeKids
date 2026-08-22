import {
  useEffect,
  useState
} from "react";

import api from "../../../component/api";


export default function useStudentReports() {

  const [reports, setReports] =
    useState([]);

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    let mounted = true;


    const loadReports = async () => {

      try {

        setLoading(true);

        setError("");


        // =================================================
        // GET LOGIN USER
        // =================================================

        const savedUser =
          localStorage.getItem(
            "userck"
          );


        console.log(
          "================================"
        );

        console.log(
          "USER FROM LOCAL STORAGE:"
        );

        console.log(
          savedUser
        );

        console.log(
          "================================"
        );


        if (!savedUser) {

          if (mounted) {

            setError(
              "لم يتم العثور على بيانات تسجيل الدخول."
            );

          }

          return;

        }


        let user;


        try {

          user =
            JSON.parse(
              savedUser
            );

        } catch (error) {

          console.error(
            "USER JSON ERROR:",
            error
          );


          localStorage.removeItem(
            "userck"
          );


          if (mounted) {

            setError(
              "بيانات تسجيل الدخول غير صحيحة."
            );

          }

          return;

        }


        console.log(
          "PARSED USER:",
          user
        );


        // =================================================
        // VALIDATE USER
        // =================================================

        if (
          !user ||
          !user.username ||
          !user.code
        ) {

          console.error(
            "INVALID USER:",
            user
          );


          if (mounted) {

            setError(
              "بيانات تسجيل الدخول غير مكتملة."
            );

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

        const username =
          encodeURIComponent(
            user.username
          );


        const code =
          encodeURIComponent(
            user.code
          );


        const url =
          `/reports/student/${username}/${code}`;


        console.log(
          "REPORT URL:",
          url
        );


        const response =
          await api.get(url);


        console.log(
          "REPORT RESPONSE:",
          response.data
        );


        if (!response.data?.success) {

          if (mounted) {

            setError(
              "تعذر تحميل التقرير."
            );

          }

          return;

        }


        if (mounted) {

          setReports(
            Array.isArray(
              response.data.reports
            )
              ? response.data.reports
              : []
          );

        }


      } catch (error) {

        console.error(
          "REPORT LOAD ERROR:",
          error
        );


        if (mounted) {

          setError(
            "تعذر تحميل التقرير."
          );

        }

      } finally {

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


  return {

    reports,

    student,

    loading,

    error

  };

}