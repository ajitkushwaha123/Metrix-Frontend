import React from 'react'
import { IoMailOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginValidate, profileValidate } from '../helper/validate';
import { Toaster } from 'react-hot-toast';
import { metrix } from '../assets';

const Profile = () => {

  const formik = useFormik({
    initialValues : {
      username : '',
      email : '',
      phone : '',
      address : '',
      city : '',
    },
    validate : profileValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
       console.log(values);
    }
  })


  return (
    <div className='bg-white font-poppins h-[100%] mx-[40px] my-[20px] py-[50px] flex jus'>
     <form onSubmit={formik.handleSubmit} className='w-full flex '>
    <Toaster position='top-center' reverseOrder='false'></Toaster>
      <div className='px-[50px] w-[50%]'>
         <div className='flex text-[18px] items-center text-txtPrimary'>
            <p className='pr-[20px] text-black font-semibold'>Account</p>
            <p className='px-[20px]'>Buisness</p>
            <p className='px-[20px]'>Security </p>
         </div>

         
           <h2 className='text-[20px] mt-[60px]'>Account Settings </h2>

           <div className='mt-[20px] flex flex-col justify-center'>
            <div className='flex rounded-lg my-[20px] text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoKeyOutline />
              <input {...formik.getFieldProps('username')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Name' type='username'/>
            </div>

            <div className='flex rounded-lg text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoMailOutline />
              <input {...formik.getFieldProps('email')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Email Address' type='email'/>
            </div>

            <div className='flex rounded-lg my-[20px] text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoKeyOutline />
              <input {...formik.getFieldProps('phone')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Phone Number' type='phone'/>
            </div>

            <div className='flex rounded-lg text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoMailOutline />
              <input {...formik.getFieldProps('address')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Address' type='address'/>
            </div>

            <div className='flex rounded-lg my-[20px] text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoKeyOutline />
              <input {...formik.getFieldProps('city')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='City' type='city'/>
            </div>
         </div>
      </div>
      <div className='w-[50%]'>
         <button className='bg-primary rounded-lg text-white px-6 text-[18px] py-2'>Update</button>
         <img width={"250px"} height={"250px"} className='mt-[60px]' src='https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png'/>
      </div>
      </form>
    </div>
  )
}

export default Profile