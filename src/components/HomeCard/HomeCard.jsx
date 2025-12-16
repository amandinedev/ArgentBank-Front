import React from "react";
import styles from "./HomeCard.module.scss";

const HomeCard = ({ homeData }) => {
  return (
    <div className={styles.homeCardItem}>
      <img src={homeData.imgSrc} alt={homeData.headingText} />
      <h3> {homeData.headingText}</h3>
      <p>{homeData.paragraphText}</p>
    </div>
  );
};

export default HomeCard;
