import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as EmailValidator from "email-validator";

import "../../Styles/FormStyles.scss";

const SignInForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const initialErrors = {};

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const { email, password } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    if (!email || !password) {
      setFormErrors({
        ...formErrors,
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
      setFormValues(initialValues);
      setFormErrors(initialErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-wrapper">
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
            type="text"
            name="password"
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
            New user?{" "}
            <Link to="/sign-up" className="form-footer-link">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
