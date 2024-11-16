import React, { useEffect, useRef, useState } from 'react'
import Logo from "../assets/Logo.png"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import user from '../assets/man.png'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";

export const navigation=[
  {
    label:"TV Shows",
    href:"/tv",
    icon:<MdOutlineLiveTv/>
  },
  {
    label:"Movies",
    href:"/movie",
    icon:<BiCameraMovie/>
  }
]

const Header = () => {
  const location = useLocation()
  const[searchInput, setSearchInput] = useState(location.search.slice(3).split("%20").join(" "))
  const navigate = useNavigate()

  const headRef = useRef()
  
  const handleClick=()=>{
    if(searchInput){
      navigate(`/search?q=${searchInput}`)
    }
  }

  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        headRef.current.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
      } else {
        headRef.current.style.backgroundColor = "transparent";
        headRef.current.style.boxShadow = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  })

  useEffect(()=>{
    if(searchInput){
      navigate(`/search?q=${searchInput}`)
    }

  },[searchInput])



  return (
    <header ref={headRef} className='fixed top-0 w-full h-16 bg-black bg-opacity-50 px-3 lg:px-12 z-40 flex items-center gap-6'>
        <NavLink to="/">
          <img src={Logo} alt="Logo" width={100}/>
        </NavLink>

        <nav className='hidden lg:flex items-center gap-5'>

            {
              navigation.map((nav,index)=>{
                return <NavLink key={nav.label} to={nav.href} className={({isActive})=>`hover:text-orange-300 ${isActive && 'text-orange-300'}`}>{nav.label}</NavLink>
              })
            }

        </nav>

        <div className='ml-auto cursor-pointer flex gap-8 items-center'>
          <form className='flex items-center' onSubmit={(e)=>e.preventDefault()}>
            <input 
              type="text" 
              placeholder='Search here...' 
              className='outline-none bg-transparent hidden lg:block'
              onChange={(e)=>{setSearchInput(e.target.value)}}
              value={searchInput}
            />
            <button className='hidden md:block text-2xl text-white' onClick={handleClick}>
              <IoSearchOutline/>
              </button>
          </form>

          <div className='active:scale-50 transition-all'><img src={user} alt="user" className='w-8' /></div>
        </div>
    </header>
  )
}

export default Header