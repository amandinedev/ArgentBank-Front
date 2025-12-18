import React from "react";
import WelcomeComponent from "../../components/WelcomeComponent/WelcomeComponent";
import UserCard from "../../components/UserCard/UserCard";
import styles from "./User.module.scss";

const User = () => {
  const userAccountData = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];
  
  return (
    <>
    <div className={styles.userContainer}>
      <WelcomeComponent />
    <div className={styles.userAccountSection}>
      {userAccountData.map((data, index) => (
        <UserCard key={index} userAccountData={data} />
      ))}
      </div>
      </div>
    </>
  );
};
export default User;
