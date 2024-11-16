import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import useFetchDetails from "../hooks/useFetchDetails"
import useFetch from "../hooks/useFetch"

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [filter,setFilter] = useState("")
  const {data:filters} = useFetchDetails(`/genre/${params.explore}/list`)

  const [provider,setProvider] = useState("")
  const providers = ["Netflix","Amazon Prime Video","Amazon Video","Apple TV","Hotstar","Jio Cinema","Sony Liv","Zee5"]
  const {data:AllProviders} = useFetch(`/watch/providers/${params.explore}`)
  const majorPlatforms = AllProviders?.filter((platform) =>
    providers.some(
      (provider) =>
        provider.toLowerCase().trim() === platform.provider_name.toLowerCase().trim()
    )
  );
  


  const handleFilterClick = (id)=>{
    setFilter(id)
    setPageNo(1)
    setData([])
  }
  const handleProviderClick = (id)=>{
    setProvider(id)
    setPageNo(1)
    setData([])
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
          with_genres: filter,
          with_watch_providers: provider
        }
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const handleScroll = () => {
    if ((window.innerHeight + document.documentElement.scrollTop+1) >= document.documentElement.scrollHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo,filter,provider]);

  useEffect(()=>{
    setPageNo(1)
    setData([])
    fetchData()
  },[params.explore])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16 px-8 lg:px-12">

        <div>
            <h3 className=" capitalize text-lg font-semibold my-8">
                      Genres
                    </h3>
            <ul className="flex flex-wrap gap-5 my-8">
            <li onClick={()=>handleFilterClick("")} className={`flex justify-center px-4 py-2 border border-1 rounded-full cursor-pointer ${filter==="" ? "text-orange-300 border-orange-300":""} `}  key={"Allfilters"}>All</li>
              {
                filters?.genres.map((ele,index)=>{
                  return(
                    <li onClick={()=>handleFilterClick(ele.id)} className={`flex justify-center px-4 py-2 border border-1 rounded-full cursor-pointer ${filter===ele.id ? "text-orange-300 border-orange-300":""}`} key={index+ele?.id}>{ele?.name}</li>
                  )
                })
              }
            </ul>
          </div>

          <div>
                <h3 className=" capitalize text-lg font-semibold my-8">
                          Streaming Platforms
                        </h3>
                <ul className="flex flex-wrap gap-5 my-8">
                <li onClick={()=>handleProviderClick("")} className={`flex justify-center px-4 py-2 border border-1 rounded-full cursor-pointer ${provider==="" ? "text-orange-300 border-orange-300":""} `}  key={"Allplatforms"}>All</li>
                  {
                    majorPlatforms?.map((ele,index)=>{
                      return(
                        <li onClick={()=>handleProviderClick(ele?.provider_id)} className={`flex justify-center px-4 py-2 border border-1 rounded-full cursor-pointer ${provider===ele?.provider_id ? "text-orange-300 border-orange-300":""}`} key={index+ele?.provider_id}>{ele?.provider_name}</li>
                      )
                    })
                  }
                </ul>
            </div>


        <h3 className=" capitalize text-lg font-semibold my-8">
          Popular {params.explore} Shows
        </h3>
        <div className="flex flex-wrap gap-y-10 justify-between">
          {data.map((ele, index) => {
            return (
              <div key={index+params.explore} className="w-36 md:w-52">
              <Card data={ele} key={index} index={index} trending={false} media_type={params.explore}/>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default ExplorePage;
