import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/SignIn/SignIn";
import User from "../../pages/User/User";
// import Error404 from "../../pages/Error404/Error404";

const Router = () => {

  return (
    <BrowserRouter>
        <Routes>
          {/* Route for the login page */}
          <Route path="/" element={
             <Layout>
            <Home /> 
            </Layout>} />
          <Route path="/sign-in" element={
             <Layout ><SignIn /></Layout>} />
          <Route path="/profil" element={<Layout><User /></Layout>} />
          {/* This will catch all undefined routes */}
          {/* <Route path="/*" element={<Error404 />} /> */}
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
