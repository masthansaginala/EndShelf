import React from "react";
import "../login/login.scss";
import { Link } from "react-router-dom";
import userIcon from "../../assests/person.png";
import emailIcon from "../../assests/email.png";
import passowrsIcon from "../../assests/password.png";

const SignUp = () => {
  return (
    <div className="login-container">
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
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
          <div className="input">
            <img src={passowrsIcon} alt="passowrs" />
            <input type="password" placeholder="Confirm Password" />
          </div>
        </div>

        <div className="submit-container">
          <div className="submit">Sign Up</div>
          <Link className="submit submit-unactive" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
