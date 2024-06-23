import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/Dashboard.css";
import NavbarDash from "../Components/Dashboard/NavbarDash";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    //if (isLoggedIn == "true") {
    axios
      .get("http://localhost:1234/api/user/login")
      .then((response) => {
        setUsername(response.data.user.username);
        setUserId(response.data.user.id);
      })
      .catch((error) => {
        navigate("/login", { replace: true });
      });
    //}
  }, []);
  return (
    <>
      <NavbarDash />

      <div className="dashboard-container">
        <h3 className="header-welcome">
          Bine ai venit, {username}! Ești gata să începi această sesiune de
          scouting?
        </h3>
        <Link to="/search/player">
          <button className="dashboard-button">Caută jucător</button>
        </Link>

        <Link to="/search/club">
          <button className="dashboard-button">Caută club</button>{" "}
        </Link>

        <Link to={`/friends/${userId}`}>
          <button className="dashboard-button">Adaugă membru</button>{" "}
        </Link>

        <button className="dashboard-button">Listă jucători favoriți</button>
      </div>
    </>
  );
};

export default Dashboard;
