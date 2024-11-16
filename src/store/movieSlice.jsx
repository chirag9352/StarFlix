import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData:[],
  imageURL:"",
  nowPlayingData:[]
}

export const movieSlice = createSlice({
  name:"moviedata",
  initialState,
  reducers : {
    setBannerData:(state,action)=>{
      state.bannerData = action.payload
    },
    setImageURL:(state,action)=>{
      state.imageURL = action.payload
    },
    setNowPlayingData:(state,action)=>{
      state.nowPlayingData = action.payload
    },
  }
})

export const {setBannerData,setImageURL,setNowPlayingData} = movieSlice.actions

export default movieSlice.reducer