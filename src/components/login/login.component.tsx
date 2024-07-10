import React, { useState, useEffect } from "react";
import "./login.styles.scss";
import AccentTypography from "../../assets/AccentComponents/AccentTypography";
import InputField from "../../assets/AccentComponents/InputField";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

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
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
            />
            <InputField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
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
            />
            <InputField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <InputField
              label="Confirm Password"
              value={confirmpassword}
              onChange={handleConfirmPasswordChange}
              type="password"
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
