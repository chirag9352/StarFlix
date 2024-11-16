import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const BannerHome = () => {
  const bannerdata = useSelector((state) => state.movieData.bannerData || []);
  const imageURL = useSelector((state) => state.movieData.imageURL || "");

  if (!bannerdata.length) {
    return <div className="text-center py-10 h-[100vh] text-gray-600">Loading...</div>;
  }

  return (
    <section className="relative w-full h-[65vh] lg:h-[100vh]">
      {/* Swiper with custom navigation buttons */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        navigation={{
          prevEl: ".custom-prev-btn",
          nextEl: ".custom-next-btn",
        }}
        className="w-full h-full"
      >
        {bannerdata.map((data, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            {/* Background Image */}
            <img
              src={imageURL + data.backdrop_path}
              alt={data.title || data.name}
              className="absolute w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="absolute bottom-10 left-5 md:bottom-16 md:left-10 text-white max-w-lg">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {data.title || data.name}
              </h1>
              <p className="text-yellow-400 font-semibold mb-2">
                ⭐ {Number(data.vote_average).toFixed(1)}/10
              </p>
              <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
                {data.overview}
              </p>
              <button className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 px-4 rounded-lg">
                Play Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="hidden lg:flex custom-prev-btn absolute top-1/2 left-8 transform -translate-y-1/2 bg-transparent text-white text-2xl z-20">
      <FaChevronLeft />
      </button>
      <button className="hidden lg:flex custom-next-btn absolute top-1/2 right-8 transform -translate-y-1/2 bg-transparent text-white text-2xl z-20">
      <FaChevronRight />
      </button>
    </section>
  );
};

export default BannerHome;
