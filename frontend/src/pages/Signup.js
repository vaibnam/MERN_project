import React, { useState } from 'react';
import {BiShow,BiHide} from 'react-icons/bi'
import { Link, useNavigate  } from 'react-router-dom';
import { ImageBase64 } from '../utility/Imagebase64';
import loginSignupImage from '../assets/profile.gif'
import toast from 'react-hot-toast';

function Signup(props) {
    const navigate=useNavigate()

    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)

    const [data,setData]=useState({
        firstName:" ",
        lastName:" ",
        email:" ",
        password:"",
        confirmpassword:"",
        image:""
    })

    const handleShowPassword=()=>{
        setShowPassword(preve=>!preve)
    }

    const handleShowConfirmPassword=()=>{
        setShowConfirmPassword(preve=>!preve)
    }
    const handleOnChange=(e)=>{

        const {name,value}=e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
        // console.log(e.target.value)
    }
    const handleProfileImage=async(e)=>{
        //console.log(e.target.files[0])
        let data=await ImageBase64(e.target.files[0])
        console.log(data)

        setData((preve)=>{
            return{
                ...preve,
                image:data
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {firstName,lastName,email,password,confirmpassword}=data
        if(firstName && lastName && email && password && confirmpassword ){
            if(password === confirmpassword){
                const fetchdata=await fetch(`${process.env.REACT_APP_SERVICE_DOMIN}signup`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
            },
        body:JSON.stringify(data)})
        const datasign=await fetchdata.json()
        console.log(datasign)
        toast(datasign.message)
        if(datasign.alert){
            navigate("/login")
        }


                // alert("form submitted")
                // navigate("/login")          
            }
            else{
                alert("password and confirm password is not equal")
            }
            }else{
                alert("please enter required feilds")
            }
    }

    return (
        <div className='p-2 md:p-4'>
                <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
                <h1 className='text-center text-2xl font-bold'>Signup</h1>
                    <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
                        <img src={data.image?data.image:loginSignupImage} alt='User login' className='w-full'/>

                            <label htmlFor='profileImage'>
                                <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center'>
                                    <p className='text-sm p-1 text-white'>Upload</p>
                                </div>
                                <input type={'file'} id='profileImage' accept='image/*' className='hidden'
                                onChange={handleProfileImage}/>    
                            </label>
                        </div>
                        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                            <label htmlFor='firstName'>First Name</label>
                            <input type={'text'} id='firstName' name='firstName' className='h-10 w-full bg-slate-200  mb-2 px-2 py-1 rounded focus-within:outline-blue-400'
                            value={data.firstName}
                            onChange={handleOnChange}/>

                            <label htmlFor='lastName'>Last Name</label>
                            <input type={'text'} id='lastName' name='lastName' className='h-10 w-full bg-slate-200  mb-2 px-2 py-1 rounded focus-within:outline-blue-400'
                            value={data.lastName}
                            onChange={handleOnChange}/>

                            <label htmlFor='email'>Email</label>
                            <input type={'email'} id='email' name='email' className='h-10 w-full bg-slate-200  mb-2 px-2 py-1 rounded focus-within:outline-blue-400'
                            value={data.email}
                            onChange={handleOnChange}/>

                                

                            <label htmlFor='password'>Password</label>
                                <div className='flex px-2 py-1 bg-slate-200 rounded focus-within:outline-blue-200 rounded focus-within:outline-blue-400 mb-2 mt-1 '>
                            <input type={showPassword?"text":'password'} id='password' name='password' className='h-10 w-full bg-slate-200 border-none outline-none'
                            value={data.password}
                            onChange={handleOnChange}/>
                            <span className='flex text-xl' onClick={handleShowPassword}>{showPassword?<BiShow/>:<BiHide/>}</span>
                                </div>

                            
                                <label htmlFor='confirmpassword'>Confirm-Password</label>
                                <div className='flex px-2 py-1 bg-slate-200 rounded focus-within:outline-blue-200 rounded focus-within:outline-blue-400 mb-2 mt-1 '>
                            <input type={showConfirmPassword?"text":'password'} id='confirmpassword' name='confirmpassword' className='h-10 w-full bg-slate-200 border-none outline-none '
                            value={data.confirmPassword}
                            onChange={handleOnChange}/>
                            <span className='flex text-xl' onClick={handleShowConfirmPassword}>{showConfirmPassword?<BiShow/>:<BiHide/>}</span>
                                </div>   
                                
                                <button type='submit' className='max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-700 
                                cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3'>Signup</button>
                        </form>

                        <p className='text-left text-sm mt-3 mb-3'>Already have account ? <Link to={"/login"} 
                        className="text-red-500">Login</Link></p>
                </div>
        </div>
    
    );  
}
export default Signup;