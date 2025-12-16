import React from "react";
import SignInForm from "../../components/SignInForm/SignInForm";
import styles from "./SignIn.module.scss"

const SignIn = () => {

  return (
    <div className={styles.signInContainer}>
      <SignInForm />
    </div>
  );
};

export default SignIn;