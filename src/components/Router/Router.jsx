import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/SignIn/SignIn";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../../pages/UserProfile/UserProfile";
import Error404 from "../../pages/Error404/Error404";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* Protect the /profile route with PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          {/* Catch-all for undefined routes */}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
