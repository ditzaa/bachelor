import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    // Verificăm dacă utilizatorul este autentificat
    axios
      .get("http://localhost:1234/api/user/login")
      .then((response) => {
        // Dacă utilizatorul este autentificat, setăm numele de utilizator în starea componentei
        setUsername(response.data.user.username);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);
  return <div>{username}</div>;
};

export default Dashboard;
