import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../UserContext";
import { auth } from "../FirebaseConfig";

import "../Styles/Buttons.scss";

const User = () => {
  const userLoggedIn = useContext(UserContext);

  if (!userLoggedIn) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div>
      <h1>Welcome</h1>
      <span> You being here means you're a verified user!!!</span>
      <button className="btn blue-btn" onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default User;
