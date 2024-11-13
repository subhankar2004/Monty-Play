import React from 'react'
import { useState,useContext } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'

import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { BiVideoPlus } from "react-icons/bi";
import { BsBell } from "react-icons/bs";

import { Context } from '../context/ContextApi';
import Loader from '../shared/Loader';





const Header = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const {loading,mobileMenu,setMobileMenu}=useContext(Context);

  const navigate=useNavigate();

  const searchQueryHandler=(event)=>{
    if((event?.key==="Enter" || event==="searchButton")&& searchQuery?.length>0)
    {
      navigate(`/searchResult/${searchQuery}`);
    }
    
  };

  const mobileMenuToggle=()=>{
    setMobileMenu(!mobileMenu);
  };

  const {pathname}=useLocation();
  const pathName=pathname?.split("/")?.filter(Boolean)?.[0];

  
  return (
    <>
      <div className="flex justify-between items-center bg-[#212121] opacity-95 h-14 px-14 sticky top-0 font-roboto  ">
      {loading && <Loader/>}
      <div className="flex items-center gap-8 text-2xl">
        <div className='hover:cursor-pointer'>
          <GiHamburgerMenu />
        </div>
        <Link to="/">
        <div className="flex items-center gap-2 justify-center">
          <FaYoutube className="text-2xl text-red-500" />
          <span className="text-2xl ">MontyPlay</span>
          <span className="text-sm font-light relative bottom-3 right-2">
            IN
          </span>
        </div>
        </Link>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <form action="#">
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-2 rounded-3xl">
            <div className="flex items-center gap-2 pr-5">
              <input
                type="text"
                placeholder="Search"
                className="w-96 h-8 bg-zinc-900 border-none border-gray-600 focus:outline-none "
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                value={searchQuery}
              />
            </div>
            <button className="relative   bg-white/[0.1] w-[50px] h-10 rounded-r-3xl left-2" >
              <FaSearch className=" relative text-xl rounded-r-3xl left-3 " />
            </button>
          </div>
        </form>
        <div className="p-3 rounded-full bg-zinc-800 hover:cursor-pointer">
          <FaMicrophone className="text-2xl " />
        </div>
      </div>
      <div className="flex gap-8 items-center text-xl hover:cursor-pointer">
        <BiVideoPlus className="text-3xl" />
        <div className="relative hover:cursor-pointer">
          <BsBell />
          <span className="absolute bottom-2 left-3 text-xs bg-red-500 rounded-full z-1">
            9+
          </span>
        </div>
        <img
          src="/assets/hommie.jpg"
          alt="Profile pic"
          className="w-9 h-9 rounded-full hover:cursor-pointer"
        />
      </div>
    </div>
    </>
  )
}

export default Header
