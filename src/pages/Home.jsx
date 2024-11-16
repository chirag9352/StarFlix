import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import "../App.css";
import HorizontalCardSlide from "../components/HorizontalCardSlide";
import useFetch from "../hooks/useFetch";

const Home = () => {

  const trendingMovies = useSelector((state) => state.movieData.bannerData);
  const nowPlayingMovies = useSelector((state) => state.movieData.nowPlayingData);
  const { data : topRatedData } = useFetch('/movie/top_rated')
  const { data : popularTvShowData } = useFetch('/tv/popular')
  const { data : onTheAirShowData } = useFetch('/tv/on_the_air')

  return (
    <div>
        <BannerHome />
        <HorizontalCardSlide data={trendingMovies} trending={true} heading={"Trending Movies"} media_type={'movie'}/>
        <HorizontalCardSlide data={nowPlayingMovies} trending={false} heading={"Now playing Movies"} media_type={'movie'}/>
        <HorizontalCardSlide data={topRatedData} trending={false} heading={"Top Rated Movies"} media_type={'movie'}/>
        <HorizontalCardSlide data={popularTvShowData} trending={false} heading={"Popular Tv Shows"} media_type={'tv'}/>
        <HorizontalCardSlide data={onTheAirShowData} trending={false} heading={"On The Air Tv Shows"} media_type={'tv'}/>
    </div>
  );
};

export default Home;
