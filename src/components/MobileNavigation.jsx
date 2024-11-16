import React from 'react'
import { navigation } from './Header'
import { IoHomeOutline } from "react-icons/io5"
import { IoSearchOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const mobilenavigation=[
  {
    label:"Home",
    href:"/",
    icon:<IoHomeOutline/>
  },
  ...navigation,
  {
    label:"search",
    href:"/search",
    icon:<IoSearchOutline/>
  }

]

const MobileNavigation = () => {
  return (
    <section className='lg:hidden bg-black bg-opacity-80 fixed bottom-0 h-14 w-full z-50'>
      <div className='flex justify-between h-full px-4'>
        {
          mobilenavigation.map((nav,index)=>{
            return <NavLink key={nav.label+"mobile"} to={nav.href} 
            className={({isActive})=>`flex justify-center flex-col items-center ${isActive && 'text-orange-300'}`}>
              {nav.icon} {nav.label}
            </NavLink>
          })
        }
      </div>
    </section>
  )
}

export default MobileNavigation