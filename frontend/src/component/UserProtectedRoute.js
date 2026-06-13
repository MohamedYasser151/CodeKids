// UserProtectedRoute.jsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserProtectedRoute({
  children
}) {

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    const checkUser = async () => {

      const user = JSON.parse(
        localStorage.getItem("userck")
      );

      if (!user) {
        setLoading(false);
        return;
      }

      if (Date.now() > user.expire) {

        localStorage.removeItem("userck");
        Cookies.remove("codeKidY");
        Cookies.remove("username");

        setLoading(false);
        return;
      }

      try {

        const res = await axios.get(
          `http://localhost:8083/check-user/${user.code}`
        );

        if (res.data.success) {
          setAllowed(true);
        } else {

          localStorage.removeItem("userck");
          Cookies.remove("codeKidY");
          Cookies.remove("username");

        }

      } catch {

        localStorage.removeItem("userck");
        Cookies.remove("codeKidY");
        Cookies.remove("username");

      }

      setLoading(false);

    };

    checkUser();

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}