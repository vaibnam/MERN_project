import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'
import {HiOutlineUserCircle} from 'react-icons/hi'
import logo from '../assets/LOGO.png'
import {useDispatch, useSelector} from 'react-redux'
import { logoutRedux } from '../redux/userSlice';
import {toast} from "react-hot-toast"


function Header(props) {
    const [showMenu,setShowMenu]=useState(false)
    const userData=useSelector((state)=>state.user)
    console.log(userData)
    const dispatch=useDispatch()

    const handleShowMenu=()=>{
        setShowMenu(preve=>!preve)
    }
    const handleLogout=()=>{
        dispatch(logoutRedux())
        toast('Logout sucessfully')
    }
    return (
        
            <header className='fixed shadow-md w-full h-16 px-4 md:px-4'>
            <div className='flex align-items-center h-full justify-between'>
                <Link to="">
            <div className='h-16'>
                <img src={logo} alt='logo'className='h-full'/>
            </div>
                </Link>     
                
            <div className='flex items-center gap-4 md:gap-7'>
                <nav className='flex gap-4 md:gap-6 text-base md:text-lg'>
                    <Link to={""}>Home</Link>
                    <Link to={"menu"}>Menu</Link>
                    <Link to={"about"}>About</Link>
                    <Link to={"contact"}>Contact</Link>
                </nav>  
            <div className='text-2xl text-slate-600 relative'>
                <FaShoppingCart/>
                <div className='absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 rounded-full text-xs text-center m-0 p-0'>0</div>
            </div>
            <div className='text-slate-600' onClick={handleShowMenu}>
                <div className='text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-sm'>
                {userData.image?<img src={userData.image} alt='' className='h-full w-full'/>:
                    <HiOutlineUserCircle/>
                }
                </div>
                {
                 showMenu && (
                <div className='absolute right-2 bg-white py-2 py-3  shadow flex flex-col'>
                    <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer pb-3 px-2'>New Product</Link>
                    {
                        userData.image?<p className='cursor-pointer text-white bg-red-500'
                        onClick={handleLogout}>Logout</p>:
                        <Link to={"login"} className='whitespace-nowrap cursor-pointer pb-3'>Login</Link>
                    }
                </div>
                 )
                }
            </div>
            </div>
            </div>
       
            </header>
        
    );
}

export default Header;