import React from "react";
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <main className={styles.layout}>
        <MainNav />
        <div className={styles.layoutContent}>{children}</div>
        <Footer />
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
