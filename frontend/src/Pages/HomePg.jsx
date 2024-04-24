import React from "react";
import Home from "../Components/Home/Home";
import About from "../Components/Home/About";
import Work from "../Components/Home/Work";
import Footer from "../Components/Home/Footer";
import "./Home.css";

const HomePg = () => {
  return (
    <>
      <div className="Home">
        <Home></Home>
        <About></About>
        <Work></Work>
        <Footer></Footer>
      </div>
    </>
  );
};

export default HomePg;
