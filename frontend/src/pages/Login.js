import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi'
import loginSignupImage from '../assets/profile.gif';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

function Login(props) {

    const [showPassword, setShowPassword] = useState(false)


    const [data, setData] = useState({
        email: " ",
        password: ""
       
    })
    const navigate=useNavigate()

    const userData=useSelector(state=>state)
    
    const dispatch=useDispatch()

    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }

    const handleOnchange = (e) => {

        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
   
    const handleSubmit = async(e) => {
        e.preventDefault()
        const { email, password } = data
        if (email && password) {
            const fetchdata=await fetch(`${process.env.REACT_APP_SERVICE_DOMIN}login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
            },
        body:JSON.stringify(data)})
        const datasign=await fetchdata.json()


        console.log(datasign)
            toast(userData.user.firstName + datasign.message)
        
        if(datasign.alert){

            dispatch(loginRedux(datasign))

            setTimeout(()=>{
            navigate("/")
        })
        }
        console.log(userData)
    }

        else {
            alert("please enter required fields")
        }

    }
    return (
        <div className='p-2 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Signup</h1>*/}
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
                  <img src={data.image?data.image:loginSignupImage} alt='User login' className='w-full h-full'/>
                </div>


                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>

                    <label htmlFor='email'>Email</label>
                    <input type={'email'} id='email' name='email' className='h-10 w-full bg-slate-200 mb-2 px-2 py-1 rounded focus-within:outline-blue-400'
                        value={data.email}
                        onChange={handleOnchange} />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded  focus-within:outline-blue-400 mb-2 mt-1'>
                        <input type={showPassword ? "text" : 'password'} id='password' name='password' className='h-10 w-full bg-slate-200 border-none outline-none'
                            value={data.password}
                            onChange={handleOnchange} />

                        <span className='flex text-xl cursor:pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>

                    </div>
                    <button type='submit' className='max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-700 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3'>Login</button>

                </form>
                <p className='text-left text-sm mt-3 mb-3'>Don't have account ?
                    <Link to={"/signup"} className="text-red-500">SignUP</Link></p>

            </div>
        </div>
    );
}

export default Login;