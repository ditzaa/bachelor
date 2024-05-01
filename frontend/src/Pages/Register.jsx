import "./Register.css";
import Navbar from "../Components/Home/Navbar";
import BannerBackground from "../assets/home-banner-background.png";
import { FaUser, FaLock, FaRegBuilding } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import Dropdown from "../Components/LoginForm/Dropdown";
import { IoIosMail } from "react-icons/io";

const Register = () => {
  const [selected, isSelected] = useState("");

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
          <h1>Register</h1>
          <form action="">
            <div className="input-box">
              <input type="text" placeholder="First Name" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Last Name" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Email" required />
              <IoIosMail className="icon" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>

            <div>
              <ReactFlagsSelect
                className=" dropdown-country"
                selected={selected}
                onSelect={(code) => isSelected(code)}
              />
            </div>

            <div className="input-box">
              <Dropdown></Dropdown>
            </div>

            <div className="input-box">
              <input type="text" placeholder="Club / Company" required />
              <AiOutlineTeam className="icon" />
            </div>

            <button className="button-login" type="submit">
              Create account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
