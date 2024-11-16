import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {setBannerData, setImageURL, setNowPlayingData } from './store/movieSlice'

function App() {
  const dispatch = useDispatch()
  const fetchData=async(endpoint,setFunction)=>{
    try{
      const response = await axios.get(endpoint)
      dispatch(setFunction(response.data.results))
    }catch(error){
      console.log("error = ",error)
    }
  }
  
  //fetching base url of image
  const fetchConfiguration = async()=>{
    try{
      const response = await axios.get("/configuration")
      dispatch(setImageURL(response.data.images.secure_base_url+"original"))
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData('trending/all/week',setBannerData)
    fetchData("movie/now_playing",setNowPlayingData)
    fetchConfiguration()
  },[])

  return (
    <>
      <Header/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
      <MobileNavigation/>
    </>
  )
}

export default App
