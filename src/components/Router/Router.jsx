import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/SignIn/SignIn";
import User from "../../pages/User/User";
import Error404 from "../../pages/Error404/Error404";

const Router = () => {

  return (
    <BrowserRouter>
     <Layout>
        <Routes>
          <Route path="/" element={
            <Home /> }/>
          <Route path="/sign-in" element={
             <SignIn />} />
          <Route path="/profil" element={<User />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
         </Layout> 
    </BrowserRouter>
  );
};

export default Router;
