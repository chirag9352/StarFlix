import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "./Card";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const HorizontalCardSlide = ({ data, trending, heading, media_type }) => {
  // Create unique references for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto px-3 my-10">
      {/* Heading */}
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      {/* Swiper Component */}
      <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        // onInit={(swiper) => {
        //   // Attach navigation buttons after initialization
        //   swiper.params.navigation.prevEl = prevRef.current;
        //   swiper.params.navigation.nextEl = nextRef.current;
        //   swiper.navigation.update();
        // }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
        }}
        className="w-full relative"
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={item.id + "heading" + index}
            className="flex justify-center"
          >
            <Card
              data={item}
              index={index + 1}
              trending={trending}
              media_type={media_type}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <div className="absolute z-10 hidden lg:flex justify-between w-full h-full border-2 border-red-700 items-center"> */}
        <button
          ref={prevRef}
          className="hidden lg:block absolute top-1/2 left-8 h-full hover:bg-black hover:bg-opacity-20 transform -translate-y-1/2 bg-transparent text-white text-2xl z-20"
        >
          <FaAngleLeft />
        </button>
        <button
          ref={nextRef}
          className="hidden lg:block absolute top-1/2 right-8 h-full hover:bg-black hover:bg-opacity-20 transform -translate-y-1/2 bg-transparent text-white text-3xl z-20"
        >
          <FaAngleRight />
        </button>
        </div>
    </div>
  );
};

export default HorizontalCardSlide;
