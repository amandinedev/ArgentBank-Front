import React from "react";
import Banner from "../../components/Hero/Hero";
import HomeCard from "../../components/HomeCard/HomeCard";
import styles from "./Home.module.scss";

const Home = () => {
  const homeData = [
    {
      imgSrc: "/src/assets/icon-chat.png",
      headingText: "You are our #1 priority",
      paragraphText:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      imgSrc: "/src/assets/icon-money.png",
      headingText: "More savings means higher rates",
      paragraphText:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      imgSrc: "/src/assets/icon-security.png",
      headingText: "Security you can trust",
      paragraphText:
        "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Banner />
      <div className={styles.HomeCardsContainer}>
        <h2 className={styles.srOnly}>HomeCards</h2>
        {homeData.map((data, index) => (
        <HomeCard key={index} homeData={data} />
      ))}
      </div>
    </div>
  );
};

export default Home;
