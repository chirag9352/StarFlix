import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Card from '../components/Card';

const SearchPage = () => {
  const location  = useLocation()
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const[searchInput, setSearchInput] = useState(location.search.slice(3).split("%20").join(" "))
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query:location.search?.slice(3),
          page: 1
        }
      });

      setData(response.data.results);

    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(()=>{
    setPageNo(1)
    setData([])
    fetchData()
  },[location.search])

  useEffect(()=>{
    if(searchInput){
      navigate(`/search?q=${searchInput}`)
    }
  },[searchInput])

  return (
    <div className='py-16 px-8 lg:px-12'>

      <div className=' lg:hidden sticky my-2 top-20 z-50'>
        <input type="text" placeholder='Search here...'
        onChange={(e)=>{setSearchInput(e.target.value)}}
        value={searchInput}
        className='px-4 py-1 text-lg w-full bg-white outline-none rounded-md' />
      </div>

    <div className='container mx-auto my-8'>
      <h3 className=" capitalize text-lg font-semibold my-3">
          Search Results
        </h3>

        <div className="flex flex-wrap gap-y-10 justify-between">
          {data.map((ele, index) => {
            return (
              <div key={index+"search"} className='w-36 md:w-52'>
              <Card data={ele} key={index} index={index} trending={false} media_type={ele.media_type}/>
              </div>
            );
          })}
        </div>
    </div>
    </div>
  )
}

export default SearchPage