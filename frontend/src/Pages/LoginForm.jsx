import "./Login.css";
import Navbar from "../Components/Home/Navbar";
import BannerBackground from "../assets/home-banner-background.png";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/api/user/login", loginData)
      .then((response) => {
        if (response.data.auth) {
          navigate("/dashboard", { replace: true });
          localStorage.setItem("token", response.data.token);
          const userId = response.data.result.id;
          localStorage.setItem("userID", userId);
        } else {
          setLoginStatus(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error logging user: ", error);
        setLoginStatus("Numele de utilizator și/sau parola nu sunt corecte.");
      });
  };

  useEffect(() => {
    axios.get("http://localhost:1234/api/user/login").then((response) => {
      if (response.data.loggedIn === true) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, []);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
      </div>
      <div className="login-container">
        <div className="wrapper">
          <h1>Autentificare</h1>
          <form action="" onSubmit={handleLogin}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Nume de utilizator"
                name="username"
                required
                value={loginData.username}
                onChange={handleChangeLogin}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Parola"
                name="password"
                required
                value={loginData.password}
                onChange={handleChangeLogin}
              />
              <FaLock className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Ține-mă minte
              </label>
              <a href="#">Ai uitat parola?</a>
            </div>

            {loginStatus && <div className="error-message">{loginStatus}</div>}

            <button className="btn-login" type="submit">
              Logare
            </button>

            <div className="register-link">
              <p>
                {"Nu ai un cont?"} <Link to="/register">Înregistrează-te</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
