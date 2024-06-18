import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/Dashboard.css";
import NavbarDash from "../Components/Dashboard/NavbarDash";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    //if (isLoggedIn == "true") {
    axios
      .get("http://localhost:1234/api/user/login")
      .then((response) => {
        setUsername(response.data.user.username);
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
        <h3 className="header-welcome">Welcome, {username}!</h3>
        <button className="dashboard-button">Search player</button>
        <button className="dashboard-button">Search club</button>
        <button className="dashboard-button">Favorite players list</button>
      </div>
    </>
  );
};

export default Dashboard;
