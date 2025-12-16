import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ noBorder, edit, transaction, text, onClick }) => { // Make sure onClick is passed as a prop
  return (
    <button
      type="submit"
      className={`${styles.button} ${noBorder ? styles.noBorder : ''} ${edit? styles.buttonEdit : ""} ${transaction? styles.buttonTransaction : ""}`}
      onClick={onClick} // Ensure the click event is properly handled
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  noBorder: PropTypes.bool,
  edit: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Add prop type for onClick function
};

export default Button;