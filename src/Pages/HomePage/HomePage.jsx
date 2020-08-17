import React from "react";
import { Link } from "react-router-dom";

import "./HomePage.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="layout-wrapper">
        <h1>You must login to continue</h1>
        <div className="buttons-container">
          <Link to="/sign-up">
            <button className="btn blue-btn">Sign Up</button>
          </Link>
          <Link to="/sign-in">
            <button className="btn white-btn">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
