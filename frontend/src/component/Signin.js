import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import img2 from "./image/model.png";
import img3 from "./image/left.png";
import img4 from "./image/left2.png";

import Cookies from "js-cookie";

import styles from "./css/signup.module.css";

import {
  useTranslation
} from "react-i18next";

import api from "./api";


function Signin() {

  const { t } = useTranslation();

  const navigate = useNavigate();


  const [login, setLogin] =
    useState(false);


  const [formData, setData] =
    useState({
      username: "",
      password: "",
      code: ""
    });


  const [loading, setLoading] =
    useState(false);


  const [imageMoved, setImageMoved] =
    useState(false);


  // =====================================================
  // CHECK EXISTING LOGIN
  // =====================================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem("userck");


    if (!savedUser) {
      return;
    }


    try {

      const user =
        JSON.parse(savedUser);


      if (
        !user ||
        !user.username ||
        !user.code
      ) {

        localStorage.removeItem("userck");

        return;

      }


      if (
        user.expire &&
        Date.now() > user.expire
      ) {

        localStorage.removeItem("userck");

        Cookies.remove("codeKidY");
        Cookies.remove("username");
        Cookies.remove("loginkids");

        return;

      }


      setLogin(true);

      navigate("/home", {
        replace: true
      });

    }

    catch (error) {

      console.error(
        "LOGIN DATA ERROR:",
        error
      );

      localStorage.removeItem(
        "userck"
      );

    }

  }, [navigate]);


  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (loading) {
      return;
    }


    try {

      setLoading(true);


      const response =
        await api.post(
          "/loginkids",
          {
            username:
              formData.username.trim(),

            password:
              formData.password,

            code:
              formData.code.trim()
          }
        );


      const responseData =
        response.data;





      if (
        !responseData ||
        !responseData.success
      ) {

        alert(
          responseData?.message ||
          "اسم المستخدم أو كلمة السر أو الكود غير صحيح."
        );

        return;

      }


      // =================================================
      // USER DATA
      // =================================================

      const userData = {

        username:
          responseData.username,

        code:
          responseData.code,

        expire:
          Date.now() +
          30 *
          24 *
          60 *
          60 *
          1000

      };


     
      


      // =================================================
      // LOCAL STORAGE
      // =================================================

      localStorage.setItem(
        "userck",
        JSON.stringify(userData)
      );


      // =================================================
      // COOKIES
      // =================================================

      Cookies.set(
        "codeKidY",
        responseData.code,
        {
          expires: 30
        }
      );


      Cookies.set(
        "username",
        responseData.username,
        {
          expires: 30
        }
      );


      Cookies.set(
        "loginkids",
        "true",
        {
          expires: 30
        }
      );


      // =================================================
      // STATE
      // =================================================

      setLogin(true);


      // =================================================
      // HOME
      // =================================================

      navigate(
        "/home",
        {
          replace: true
        }
      );

    }

    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );


      if (
        error.response
      ) {

        alert(
          error.response.data?.message ||
          "حدث خطأ أثناء تسجيل الدخول."
        );

      }

      else {

        alert(
          "تعذر الاتصال بالسيرفر."
        );

      }

    }

    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // BODY CLASS
  // =====================================================

  useEffect(() => {

    document.body.classList.add(
      styles.signinBody
    );


    return () => {

      document.body.classList.remove(
        styles.signinBody
      );

    };

  }, []);


  // =====================================================
  // ALREADY LOGIN
  // =====================================================

  if (login) {

    return null;

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className={styles.container}>

      <div className={styles.signbox}>

        <span className={styles.iconimage}>

          <img
            src={img3}
            alt=""
            className={
              imageMoved
                ? styles.moved
                : ""
            }
            style={{
              boxShadow: "none",
              width: "23px",
              height: "23px",
              position: "relative",
              left: "60px",
              top: "60px"
            }}
          />


          <img
            src={img2}
            alt=""
          />


          <img
            src={img4}
            alt=""
            className={
              imageMoved
                ? styles.moved
                : ""
            }
            style={{
              boxShadow: "none",
              width: "23px",
              height: "23px",
              position: "relative",
              right: "60px",
              top: "60px"
            }}
          />

        </span>


        <h1>
          {t("تسجيل الدخول")}
        </h1>


        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className={styles.inp}>

            {/* USERNAME */}

            <input
              type="text"
              placeholder={
                t("اسم المستخدم")
              }
              name="username"
              autoComplete="username"
              required
              value={
                formData.username
              }
              onChange={(e) =>
                setData({
                  ...formData,
                  username:
                    e.target.value
                })
              }
            />


            {/* PASSWORD */}

            <input
              type="password"
              placeholder={
                t("كلمة السر")
              }
              name="password"
              autoComplete="current-password"
              required
              value={
                formData.password
              }
              onChange={(e) =>
                setData({
                  ...formData,
                  password:
                    e.target.value
                })
              }
              onFocus={() =>
                setImageMoved(true)
              }
              onBlur={() =>
                setImageMoved(false)
              }
            />


            {/* CODE */}

            <input
              type="text"
              name="code"
              placeholder={
                t("code")
              }
              required
              value={
                formData.code
              }
              onChange={(e) =>
                setData({
                  ...formData,
                  code:
                    e.target.value
                })
              }
            />

          </div>


          <div className={styles.btn}>

            <button
              type="submit"
              name="submit"
              disabled={loading}
            >

              {loading
                ? "جاري تسجيل الدخول..."
                : t("تسجيل الدخول")
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}


export default Signin;