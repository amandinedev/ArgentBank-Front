import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MainNav.module.scss";
import logo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { fetchUserProfile } from "../../reduxFeatures/userSlice";
import { selectIsAuthenticated, logout } from "../../reduxFeatures/authSlice";

const MainNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const firstName = useSelector((state) =>
    isLoggedIn ? state.user.userProfile?.firstName : ""
  );

  useEffect(() => {
    if (isLoggedIn && !firstName) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isLoggedIn, firstName]);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={styles.mainNav}>
      <img src={logo} alt="ArgentBank Logo" />
      <h1 className={styles.srOnly}>Argent Bank</h1>
      <nav className={styles.links}>
        {isLoggedIn ? (
          <>
            <div>
              <FontAwesomeIcon icon={faCircleUser} />
              <span>{firstName}</span>
            </div>
            <Link
              tabIndex={0}
              to="/"
              onClick={handleSignOut}
              onKeyDown={(e) => e.key === "Enter" && handleSignOut()}
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              tabIndex={0}
              to="/sign-in"
              onKeyDown={(e) => e.key === "Enter" && navigate("/sign-in")}
            >
              <FontAwesomeIcon icon={faCircleUser} />
              Sign In
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default MainNav;
