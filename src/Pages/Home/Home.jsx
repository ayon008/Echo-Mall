import React from "react";
import Slider from "../../Components/Slider/Slider";
import ServiceGuearanty from "../../Components/ServiceGuarenty/ServiceGuearenty";
import FlashSell from "../../Components/FlashSell/FlashSell";

const Home = () => {
  return (
    <>
      <div className="">
        <Slider />
        <ServiceGuearanty />
        <FlashSell />
      </div>
    </>
  );
};

export default Home;
