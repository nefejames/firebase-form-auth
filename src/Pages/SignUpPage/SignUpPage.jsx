import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import * as EmailValidator from "email-validator";
import UserContext from "../../UserContext";
import { auth, generateUserDocument } from "../../FirebaseConfig";

const SignUpForm = () => {
  const userLoggedIn = useContext(UserContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
    createdAt: new Date(),
  };

  const initialErrors = {};

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const {
    firstName,
    lastName,
    email,
    password,
    displayName,
    phoneNumber,
  } = formValues;

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !displayName ||
      !phoneNumber
    ) {
      setFormErrors({
        ...formErrors,
        firstName: "First name is required",
        lastName: "Last name is required",
        email: "Email is required",
        password: "Password is required",
        userName: "Username is required",
        phoneNumber: "required",
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

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await generateUserDocument(user, formValues);

        setFormValues(initialValues);
        setFormErrors(initialErrors);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //handle user inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  if (userLoggedIn) {
    return <Redirect to="/user" />;
  }

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
          <label htmlFor="lastName">Username</label>
          <input
            type="text"
            id="lastName"
            name="displayName"
            value={displayName || ""}
            onChange={handleChange}
            className={formErrors.displayName && "input-error"}
          />
          {formErrors.displayName && (
            <span className="error-message">{formErrors.displayName}</span>
          )}
        </div>
        <div className="row">
          <label htmlFor="phoneNumber">Phone</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber || ""}
            onChange={handleChange}
            className={formErrors.phoneNumber && "input-error"}
          />
          {formErrors.phoneNumber && (
            <span className="error-message">{formErrors.phoneNumber}</span>
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
