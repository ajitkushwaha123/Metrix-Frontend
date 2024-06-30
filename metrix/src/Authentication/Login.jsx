import React, { useState } from 'react'
import { metrix } from '../assets'
import { IoMailOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginValidate } from '../helper/validate';
import { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hooks';
import { useAuthStore } from '../store/store';

const Login = () => {
  
  const {username} = useAuthStore(state => state.auth);

  const formik = useFormik({
    initialValues : {
      email : '',
      password : '',
    },
    validate : loginValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
       console.log(values.email);
    }
  })


  return (
    <div className='w-[full] font-poppins flex h-screen justify-center items-center'>
    <Toaster position='top-center' reverseOrder='false'></Toaster>
    <form onSubmit={formik.handleSubmit}>
      <div className='px-[40px] py-[40px] bg-white rounded-xl '>
         <div className='flex justify-center items-center flex-col'>
            <img width={"60px"} src={metrix}/>
            <h3 className='pt-[15px] font-semibold text-[20px]'>Welcome back!</h3>
            <p className='pb-[40px] pt-[5px]'>Login to your account</p>
         </div>

         <div className='w-[full] flex flex-col justify-center items-center'>
            <div className='flex rounded-lg text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoMailOutline />
              <input {...formik.getFieldProps('email')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Email Address' type='email'/>
            </div>

            <div className='flex rounded-lg my-[20px] text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoKeyOutline />
              <input {...formik.getFieldProps('password')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Password' type='password'/>
            </div>
         </div>

         <NavLink to={'/forget-password'}><p className='text-primary flex justify-end items-center px-[40px]'>Recover Password</p></NavLink>
          <div className='flex justify-center items-center flex-col'>
              <p className='py-[15px]'>Don’t have an account? <NavLink to={'/register'}><span className='text-primary'> Sign Up </span></NavLink> </p>
              <button type="submit" className='bg-primary px-[20px] py-2 mt-[20px] rounded-md text-white text-[18px]'>Login</button>
          </div>
      </div>
      </form>
    </div>
  )
}

export default Login
