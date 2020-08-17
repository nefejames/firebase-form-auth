import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as EmailValidator from "email-validator";
import firebase from "../../FirebaseConfig";

const SignUpForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const initialErrors = {};

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const { firstName, lastName, email, password } = formValues;

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password) {
      setFormErrors({
        ...formErrors,
        firstName: "First name is required",
        lastName: "Last name is required",
        email: "Email is required",
        password: "Password is required",
      });
      return false;
    }

    if (!EmailValidator.validate(email) || password.length < 4) {
      setFormErrors({
        ...formErrors,
        email: "Invalid email address",
        password: "Password is too short",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      console.log(formErrors);
    } else {
      console.log(formValues);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          console.log(error);
        });
      setFormValues(initialValues);
      setFormErrors(initialErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-wrapper">
        <div className="row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName || ""}
            onChange={handleChange}
            className={formErrors.firstName && "input-error"}
          />
          {formErrors.firstName && (
            <span className="error-message">{formErrors.firstName}</span>
          )}
        </div>
        <div className="row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            onChange={handleChange}
            className={formErrors.lastName && "input-error"}
          />
          {formErrors.lastName && (
            <span className="error-message">{formErrors.lastName}</span>
          )}
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email || ""}
            onChange={handleChange}
            className={formErrors.email && "input-error"}
          />
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password || ""}
            onChange={handleChange}
            className={formErrors.password && "input-error"}
          />
          {formErrors.password && (
            <span className="error-message">{formErrors.password}</span>
          )}
        </div>
        <div className="row">
          <input type="submit" value="Sign In" className="blue-btn form-btn" />
        </div>

        <div className="form-footer">
          <span>
            Have an account?{" "}
            <Link to="/sign-in" className="form-footer-link">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
