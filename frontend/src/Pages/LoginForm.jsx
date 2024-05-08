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
        //navigate("/home");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error logging user: ", error);
      });

    // axios.get("http://localhost:1234/api/user/login").then((response) => {
    //   console.log(response);
    // });
  };

  useEffect(() => {
    axios.get("http://localhost:1234/api/user/login").then((response) => {
      if (response.data.loggedIn == true) {
        alert(response.data.user.username);
      }
    });
  }, []);

  return (
    <>
      <div className="navbar">
        <Navbar></Navbar>
      </div>

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
      </div>
      <div className="login-container">
        <div className="wrapper">
          <h1>Sign In</h1>
          <form action="" onSubmit={handleLogin}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
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
                placeholder="Password"
                name="password"
                required
                value={loginData.password}
                onChange={handleChangeLogin}
              />
              <FaLock className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                {" "}
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button className="btn-login" type="submit">
              Login
            </button>

            <div className="register-link">
              <p>
                {"Don't have an account?"} <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
