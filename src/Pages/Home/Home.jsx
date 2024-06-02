import React from "react";
import Slider from "../../Components/Slider/Slider";
import ServiceGuearanty from "../../Components/ServiceGuarenty/ServiceGuearenty";
import FlashSell from "../../Components/FlashSell/FlashSell";
import Categories from "../../Components/Categories/Categories";
import JustForYou from "../../Components/JustForYou/JustForYou";

const Home = () => {
  return (
    <>
      <div className="">
        <Slider />
        <ServiceGuearanty />
        <FlashSell />
        <Categories></Categories>
        <JustForYou />
      </div>
    </>
  );
};

export default Home;
