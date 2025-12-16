import React from "react";
// import styles from "./Layout.module.scss";
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
// import PropTypes from "prop-types";

const Layout = ({children }) => {

  return (
    <>
      <main className={styles.layout}>
        <MainNav
        />
        <div className={styles.layoutContent}>{children}</div>
        <Footer />
      </main>
    </>
  );
};

// Layout.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   firstName: PropTypes.string,
//   children: PropTypes.node.isRequired,
// };

export default Layout;
