import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaGamepad,
  FaTrophy,
  FaCalendarAlt
} from "react-icons/fa";
import './css/Navbars.css'
export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🚀 Code Kids
      </div>

      <div className="navLinks">

        <NavLink to="/home">
          <FaHome />
          Home
        </NavLink>

        <NavLink to="/courses">
          <FaBook />
          Courses
        </NavLink>

        <NavLink to="/games">
          <FaGamepad />
          Games
        </NavLink>

        <NavLink to="/weekly">
          <FaTrophy />
          Weekly
        </NavLink>

        <NavLink to="/monthly">
          <FaCalendarAlt />
          Monthly
        </NavLink>

      </div>

    </nav>
  );
}