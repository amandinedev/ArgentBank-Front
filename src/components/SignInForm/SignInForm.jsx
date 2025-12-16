import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./SignInForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError } from '../../features/authSlice';

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email: username, password })).unwrap();
      navigate("/user");
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
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <Button noBorder={true} text="Sign In" />
      </form>
    </section>
  );
};

export default SignInForm;