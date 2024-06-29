import React from "react";
import { Link } from "react-router-dom";

const EndShelf = () => {

  return (
    <div>
      <div class="display-header-wrapper">
        <div class="text-content">
          <div className="inside-text-content">
            <h1>Don't Waste, Just Taste: Get Food at Unbelievable Prices!</h1>
            <p>
            "Join our community to save money and reduce waste. Buy fresh fruits, vegetables, dairy products, and bakery items nearing the end of their shelf life."
            </p>
            <Link
                to="/signup"
                className="-mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
              >
                <button> Join Us Now !</button>
              </Link>
          </div>
        </div>
        <div class="image-content">
        </div>
      </div>
    </div>
  );
};

export default EndShelf;
