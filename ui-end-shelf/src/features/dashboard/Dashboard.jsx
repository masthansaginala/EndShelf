import React, { useEffect, useState } from "react";
import DashIcon from "../../assests/dash.jpg";
import Footer from "../footer/Footer";
import { getItems } from "../../api/loginapi";


const Dashboard = () => {

  return (
    <div>
      <div class="display-header-wrapper">
        <div class="text-content">
          <div className="inside-text-content">
            <h1>Don't Waste, Just Taste: Get Food at Unbelievable Prices!</h1>
            <p>
            "Join our community to save money and reduce waste. Buy fresh fruits, vegetables, dairy products, and bakery items nearing the end of their shelf life."
            </p>
            <button>Join Us Now !</button>
          </div>
        </div>
        <div class="image-content">
          {/* <img src={DashIcon} alt="Productivity Image" /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
