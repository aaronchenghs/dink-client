import React, { useState, useEffect } from "react";
import "./login.styles.scss";
import { THUNK_signinUser, THUNK_signupUser } from "../../slices/authSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

// ...

import { useDispatch } from "react-redux";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./loginUtils";
import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";
import InputField from "../../assets/accentcomponents/InputField/InputField";
import { ROUTES } from "../../global-utils";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(false);
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const authMode = localStorage.getItem("authMode");
    if (authMode === "signup") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: validateEmail(e.target.value) });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(password, e.target.value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = isLogin
      ? ""
      : validateConfirmPassword(password, confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError || "",
        password: passwordError || "",
        confirmPassword: confirmPasswordError || "",
      });
      return;
    }

    if (!isLogin) {
      dispatch(THUNK_signupUser({ email, password }));
    } else {
      dispatch(THUNK_signinUser({ email, password })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate(ROUTES.HOME);
        }
      });
    }
  };

  const handleIsLoginClick = (value: boolean) => {
    setIsLogin(value);
    localStorage.setItem("authMode", value ? "signup" : "login");
  };

  return (
    <div className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">New here?</h2>
            <p className="user_unregistered-text">
              Sign up to create a new account and join our community.
            </p>
            <button
              className="user_unregistered-signup"
              onClick={() => handleIsLoginClick(false)}
            >
              <AccentTypography tag="body">Sign Up</AccentTypography>
            </button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              Login to access your account and connect with other players.
            </p>
            <button
              className="user_registered-login"
              onClick={() => handleIsLoginClick(true)}
            >
              <AccentTypography tag="body">Login</AccentTypography>
            </button>
          </div>
        </div>
        <div
          className={`user_options-forms ${isLogin ? "bounceRight" : "bounceLeft"}`}
        >
          <form
            className={`user_forms-login ${isLogin ? "" : "show"}`}
            onSubmit={handleSubmit}
          >
            <h2 className="forms_title">Login</h2>
            <InputField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              error={errors.email}
            />
            <InputField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              error={errors.password}
            />
            <div className="forms_buttons">
              <button type="submit" className="forms_buttons-action">
                Login
              </button>
            </div>
          </form>
          <form
            className={`user_forms-signup ${isLogin ? "show" : ""}`}
            onSubmit={handleSubmit}
          >
            <h2 className="forms_title">Sign Up</h2>
            <InputField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              error={errors.email}
            />
            <InputField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              error={errors.confirmPassword}
            />
            <div className="forms_buttons">
              <button type="submit" className="forms_buttons-action">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
