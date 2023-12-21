// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import banner from "../../assets/Main-banner.png";
import banner1 from "../../assets/Ban_2.webp";
import banner2 from "../../assets/Ban_3.webp";
import banner3 from "../../assets/ban3.webp";
// import banner from "../../assets/Main-banner.png";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const banners = [banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3, banner, banner1, banner2, banner3];

const Slider = () => {
  return (
    <div className="my-2 md:my-3 mx-1 md:mx-0" >
      <Swiper
        navigation={true}
        autoplay={true}
        effect="fade"
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner}>
            <img
              src={banner}
              alt="banner"
              className="w-[100%] md:w-full h-[130px] md:h-fit  md:object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
