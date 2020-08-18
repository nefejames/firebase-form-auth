import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserContext from "./UserContext";
import HomePage from "./Pages/HomePage/HomePage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import User from "./ProtectedLayout/User";

import "./Styles/Base.scss";
import "./Styles/Buttons.scss";
import "./Styles/Layout.scss";
import "./App.css";
import { auth } from "./FirebaseConfig";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    console.log(currentUser);
  });

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/user" component={User} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/sign-up" component={SignUpPage} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
