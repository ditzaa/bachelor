import "./Register.css";
import Navbar from "../Components/Home/Navbar";
import BannerBackground from "../assets/home-banner-background.png";
import { FaUser, FaLock, FaRegBuilding } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import Dropdown from "../Components/LoginForm/Dropdown";
import { IoIosMail } from "react-icons/io";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [selected, isSelected] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    country: "",
    role: "scouter",
    organisation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/api/user/register", formData)
      .then((response) => {
        alert("Account created succesfuly!");
        navigate("/login");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

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

      <div className="register-container">
        <div className="wrapper-register">
          <h1>Înregistrare</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                name="firstName"
                placeholder="Prenume"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Nume de familie"
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <IoIosMail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Nume de utilizator"
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Parola"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FaLock className="icon" />
            </div>

            <div>
              <ReactFlagsSelect
                className=" dropdown-country"
                selected={selected}
                onSelect={(code) => {
                  isSelected(code);
                  setFormData({ ...formData, country: code });
                }}
              />
            </div>

            <div className="input-box">
              <Dropdown
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              ></Dropdown>
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Club / Companie"
                required
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
              />
              <AiOutlineTeam className="icon" />
            </div>

            <button className="button-login" type="submit">
              Creează cont
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
