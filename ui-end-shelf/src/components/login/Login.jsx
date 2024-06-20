import React from "react";
import { postLogin } from "../../api/loginapi";
import "./login.scss";
import { Link } from "react-router-dom";
import userIcon from "../../assests/person.png";
import emailIcon from "../../assests/email.png";
import passowrsIcon from "../../assests/password.png";

const Login = () => {
  const fetchUserData = async () => {
    try {
      const userData = await postLogin();
      //   setUser(userData);
      console.log("user->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="login-container">
      <div className="container">
        <div className="header">
          <div className="text">Sign In</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={userIcon} alt="usericon" />
            <input type="text" placeholder="Name" />
          </div>
          <div className="input">
            <img src={emailIcon} alt="email" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={passowrsIcon} alt="passowrs" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="forgot-password">
          Lost passowrd? <span>Click here</span>
        </div>
        <div className="submit-container">
          <div className="submit">Sign In</div>
          <Link className="submit submit-unactive" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
