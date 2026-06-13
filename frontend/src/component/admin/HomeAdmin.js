import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/HomeAdmin.css";

export default function HomeAdmin() {

  const navigate =useNavigate();
  const logout = () => {

  localStorage.removeItem("adminck");

  navigate("/LoginAdmin");

};

  const cards = [

    {
      title: "Users",
      icon: "👦",
      link: "/AdminUsers"
    },

    {
      title: "Upload Video",
      icon: "🎥",
      link: "/adminVideo"
    },

    {
      title: "Manage Videos",
      icon: "📚",
      link: "/AdminVideosList"
    },

    {
      title: "Add Score",
      icon: "➕",
      link: "/AdminAdd"
    },
      {
    title: "Logout",
    icon: "🚪",
    action: logout
  }


  ];

  return (

    <div className="admin-home">

      <h1 className="admin-title">
        🚀 Code Kids Admin Panel
      </h1>

      <div className="admin-grid">

        {cards.map((card) => (

  <div
    key={card.title}
    className={
      card.title === "Logout"
      ? "admin-card logout-card"
      : "admin-card"
    }
    onClick={() => {

      if (card.action) {
        card.action();
      } else {
        navigate(card.link);
      }

    }}
  >

    <div className="admin-icon">
      {card.icon}
    </div>

    <h2>
      {card.title}
    </h2>

  </div>

))}

      </div>

    </div>

  );

}