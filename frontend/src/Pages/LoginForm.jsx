import "./Login.css";
import Navbar from "../Components/Home/Navbar";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div className="wrapper">
        <h1>Login</h1>
        <form action="">
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
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

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              {"Don't have an account?"} <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
