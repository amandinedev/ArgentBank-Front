import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./SignInForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectError } from "../../reduxFeatures/authSlice";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);

  // Load the username from localStorage asynchronously
  useEffect(() => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
      setTimeout(() => {
        setUsername(rememberedUsername);
        setIsChecked(true);
      }, 0);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email: username, password })).unwrap();
      navigate("/profil");
      if (isChecked) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <section className={styles.signInContent}>
      <FontAwesomeIcon icon={faCircleUser} />
      <h1>Sign In</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputRemember}>
          <input
            type="checkbox"
            id="remember-me"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <Button noBorder={true} text="Sign In" />
      </form>
    </section>
  );
};

export default SignInForm;
