import React, { useState,useEffect  } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./css/LoginAdmin.css";
export default function LoginAdmin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8083/admin/login",
        {
          username,
          password
        }
      );

      if (res.data.success) {

localStorage.setItem(
  "adminck",
  JSON.stringify({
    username: res.data.username,
    expire:
      Date.now() +
      30 * 24 * 60 * 60 * 1000
  })
);

navigate("/homeAdmin");


      }

    } catch {

      alert("Wrong Username Or Password");

    }

  };


  useEffect(() => {

  const admin = localStorage.getItem("adminck");

  if (admin) {

    const parsed = JSON.parse(admin);

    if (parsed.expire > Date.now()) {
      navigate("/homeAdmin");
    } else {
      localStorage.removeItem("adminck");
    }

  }

}, []);

  return (
  <div className="admin-login-container">

    <div className="admin-login-card">

      <div className="admin-logo">
        🚀
      </div>

      <h1 className="admin-login-title">
        Code Kids Admin
      </h1>

      <p className="admin-login-subtitle">
        Administrator Login
      </p>

      <div className="admin-login-form">

        <input
          className="admin-login-input"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          className="admin-login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="admin-login-btn"
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>

  </div>
);

}