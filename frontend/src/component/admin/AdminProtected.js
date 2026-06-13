import { Navigate } from "react-router-dom";

export default function AdminProtected({ children }) {

  const adminData =
    localStorage.getItem("adminck");

  if (!adminData) {
    return (
      <Navigate
        to="/LoginAdmin"
        replace
      />
    );
  }

  try {

    const admin =
      JSON.parse(adminData);

    if (!admin.username) {

      localStorage.removeItem("admin");

      return (
        <Navigate
          to="/LoginAdmin"
          replace
        />
      );

    }

    if (Date.now() > admin.expire) {

      localStorage.removeItem("admin");

      return (
        <Navigate
          to="/LoginAdmin"
          replace
        />
      );

    }

    return children;

  } catch {

    localStorage.removeItem("admin");

    return (
      <Navigate
        to="/LoginAdmin"
        replace
      />
    );

  }

}