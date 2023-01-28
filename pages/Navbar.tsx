import React, { useState } from "react";
import { BsPerson } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import { ImBlog } from 'react-icons/im';
import Link from "next/link";

import Cookies from 'universal-cookie';
import axios from "axios";
import { useQuery } from "react-query";

interface query{
  data:string, isLoading:string, isError:string, error:string 
}
const cookies = new Cookies();

const Navbar = () => {

  const [nav, SetNav] = useState(false);
  const [modal, SetModal] = useState(false);
  const token = cookies.get('token')


  const Log_out = () => {
    
    cookies.remove('token')
    window.location.assign('http://localhost:3000')

  }

  const myaxios = async () => {
    
    if (token != undefined) {
      const { data } = await axios.post("http://localhost:4000/user/me", {}, {
        headers: {
          "auth": `ut ${token}`
        }
      });
    
      return data;
    }
  }

  const { data, isLoading, isError, error } = useQuery('me', myaxios);

  if (isLoading) {
    return <h1>please wite...</h1>
  }

 

  return (
  <>  
    <div className="fixed z-50 w-full flex justify-between bg-[#00000030] items-center h-20 px-4
     bg-gradient-href-r from-[#5651e5] to-[#709dff] text-white ">
      <div>
        <h1 className="text-[#00df9a]">BLOGTOR.</h1>
      </div>
      <div className="text-center w-96">
        <ul className="hidden md:flex justify-between ">
          <Link href='/'><li className=" hover:text-[#00df9a]">Home</li></Link>
          <Link href='/Login.signup'><li className=" hover:text-[#00df9a]">Blogs</li></Link>
          <Link href='writers'><li className=" hover:text-[#00df9a]">Writers</li></Link>
        </ul>
      </div>  
      
      <div className="hidden md:flex px-7 mr-5 cursor-pointer">
        {data ? 
          <>
            <div onClick={()=>SetModal(!modal)} className="flex flex-col justify-center items-center">
              <BsPerson size={20} />
              <span>{data.username}</span>
            </div>
          </>
          :
          <>
            <Link href='/Login.signup'>
              <button className="border-2 font-bold p-3  border-gray-300 rounded-md
              hover:bg-gray-200 hover:text-[#5651e5] hover:border-[#5651e5] ">
                Sign up / Login
              </button>
            </Link>
          </>
        }
        
      </div>
      
        <div onClick={() => {
          SetNav(!nav);
        }} className='md:hidden z-10 cursor-pointer'>

        {nav ? <AiOutlineClose className="text-black" size={30} /> : <HiOutlineMenuAlt4 size={30} />}
        
      </div>
      <div className={nav ?
        'absolute text-black left-0 top-0 w-full h-screen bg-gray-100/90 px-4 py-7 flex flex-col md:hidden ease-in-out duration-500' :
        'absolute left-[-100%]'}>
        <ul>
          <h1 className='mt-[-8px] text-[#5651e5]'>BLOGTOR.</h1>
            <li className='border-b border-black'>
              <Link href='/' className=" flex items-center gap-2">
                <ImHome />
                <span>Home</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link href='blogs'  className=" flex items-center gap-2">
                <ImBlog />
                <span>Blogs</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link href='writers'  className=" flex items-center gap-1">
                <img src="./writers.png" className="w-[20px]" />
                <span>Writers</span>
              </Link>
            </li>
          {data ? 
            <>
              
                <li className='border-b border-black'>
                  <Link href='/dashbord'   className=" flex items-center gap-1">
                    <img src="./dashbord.png" className="w-[20px]" />
                    <span>Dashbord</span>
                  </Link>
                </li>
                <li onClick={Log_out} className='cursor-pointer flex items-center gap-2'>
                  <BiLogOut size={20} />
                  <span>Log out</span>
                </li>

            </>
            :
            <>
              <div className='flex flex-col'>
                <Link href='login'>
                  <button className='w-full font-bold my-10 p-3 border border-gray-300 rounded-md
                    bg-gradient-href-r from-[#5651e5] href-[#709dff] text-white'>
                    Sign up / Login
                  </button>
                </Link>
              </div>
            </>
          }
          
        </ul>
      </div>
    </div>
    {modal ?
      <>
        <div className=" hidden md:flex bg-[#709dff] text-white mr-2
           flex-col justify-center items-center gap-5
          fixed w-28 h-24 top-24 right-3 z-50">
            <Link href="/dashbord" className="cursor-pointer hover:bg-[#5651e5] w-full text-center">
              <span>
                Dashbord
              </span>
            </Link>
          <span onClick={Log_out} className="cursor-pointer hover:bg-[#5651e5] w-full text-center">Logout</span>
        </div>
      </>
      :
      ''
    }
</> );
};

export default Navbar;
