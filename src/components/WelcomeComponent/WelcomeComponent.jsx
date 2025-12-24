// src/components/WelcomeComponent/WelcomeComponent.jsx

import React, { useEffect, useState } from "react";
import styles from "./WelcomeComponent.module.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../reduxFeatures/userSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const error = useSelector((state) => state.user.error);

  // Local component state to manage display and edit modes
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(
    userProfile ? userProfile.firstName : ""
  );
  const [lastName, setLastName] = useState(
    userProfile ? userProfile.lastName : ""
  );
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
  });

  // Regular expression for non-empty fields and with alphabetical, accent, hyphen
  const emptyRegex = /^$/;
  const nameRegex = /^[a-zA-Zàáâäãåèéêëìíîïòóôöõùúûüÿŷßçñ-]+$/;

  useEffect(() => {
    if (!userProfile) dispatch(fetchUserProfile());
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (error && !isEditing) console.error("Error fetching profile:", error);
  }, [error, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const clearFirstNameInput = () => {
    setFirstName("");
  };

  const clearLastNameInput = () => {
    setLastName("");
  };

  const validateField = (fieldName, fieldValue) => {
    let errorMessage = "";

    if (fieldValue.match(emptyRegex)) {
      errorMessage = "This field cannot be empty.";
    } else if (!fieldValue.match(nameRegex)) {
      errorMessage = "Numbers and special characters not allowed";
    }

    return errorMessage;
  };

  const handleSaveClick = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Validate each field
    let firstNameError = validateField("firstName", firstName);
    let lastNameError = validateField("lastName", lastName);

    setErrorMessages({
      firstName: firstNameError,
      lastName: lastNameError,
    });

    if (firstNameError || lastNameError) {
      return;
    }

    try {
      dispatch(updateUserProfile({ firstName, lastName }));
      setIsEditing(false);
      setErrorMessages({ firstName: "", lastName: "" });
    } catch (updateError) {
      console.error("Failed to save profile:", updateError);
    }
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    if (userProfile) {
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
    }
  };

  if (!userProfile && !isEditing) return <div>Loading...</div>;

  if (isEditing) {
    return (
      <div className={styles.welcomeContainer}>
        <h1>Welcome back</h1>
        <form className={styles.formContainer} onSubmit={handleSaveClick}>
          <div className={styles.inputSection}>
            <div className={`${styles.inputContainer} ${styles.left}`}>
              <input
                type="text"
                placeholder="Tony"
                className={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={clearFirstNameInput}
              />
              {errorMessages.firstName && (
                <span className={styles.inputError}>
                  {errorMessages.firstName}
                </span>
              )}
            </div>
            <div className={`${styles.inputContainer} ${styles.right}`}>
              <input
                type="text"
                placeholder="Jarvis"
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={clearLastNameInput}
              />
              {errorMessages.lastName && (
                <span className={styles.inputError}>
                  {errorMessages.lastName}
                </span>
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button edit={true} type="submit" text="Save" />
            <Button edit={true} text="Cancel" onClick={handleCancelClick} />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.welcomeContainer}>
      <h1>
        Welcome back
        <br />
        {userProfile
          ? `${userProfile.firstName} ${userProfile.lastName}`
          : "Guest"}
        !
      </h1>
      <Button edit={true} text="Edit Name" onClick={handleEditClick} />
    </div>
  );
};

export default Welcome;
