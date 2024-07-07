import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Home/Navbar";
import BannerBackground from "../assets/home-banner-background.png";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactFlagsSelect from "react-flags-select";
import Dropdown from "../Components/LoginForm/Dropdown";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, username, password, organisation } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !organisation
    ) {
      toast.error("Toate câmpurile sunt obligatorii!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Adresa de email este invalidă!");
      return;
    }

    axios
      .post("http://localhost:1234/api/user/register", formData)
      .then((response) => {
        setShowSuccessMessage(true); // Afiseaza mesajul de succes
        setTimeout(() => {
          navigate("/login"); // Redirecteaza la pagina de login dupa 3 secunde
        }, 3000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("A apărut o eroare la înregistrare!");
        }
        console.error("Error registering user:", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="navbar">
        <Navbar />
      </div>

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
      </div>

      <div className="register-container">
        <div className="wrapper-register">
          <h1>Înregistrare</h1>
          <form onSubmit={handleSubmit}>
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
                name="lastName"
                placeholder="Nume de familie"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <IoIosMail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Nume de utilizator"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Parola"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </div>
            <div>
              <ReactFlagsSelect
                className="dropdown-country"
                selected={selected}
                onSelect={(code) => {
                  setSelected(code);
                  setFormData({ ...formData, country: code });
                }}
              />
            </div>
            <div className="input-box dropdown-box">
              <Dropdown
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="organisation"
                placeholder="Club / Companie"
                value={formData.organisation}
                onChange={handleChange}
                required
              />
              <AiOutlineTeam className="icon" />
            </div>
            <button className="button-login" type="submit">
              Creează cont
            </button>
          </form>

          {/* Mesajul de succes */}
          {showSuccessMessage && (
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: "white",
                fontWeight: "100",
              }}
            >
              Contul a fost creat cu succes!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
