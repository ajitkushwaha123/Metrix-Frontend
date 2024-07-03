import React, { useState } from 'react'
import { IoMailOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginValidate, profileValidate } from '../helper/validate';
import toast, { Toaster } from 'react-hot-toast';
import { metrix } from '../assets';
import {useAuthStore} from '../store/store';
import { updateUser } from '../helper/helper';
import useFetch from '../hooks/fetch.hooks';
import convertToBase64 from '../helper/convert';

const Profile = () => {
  const [file , setFile] = useState();
  const {username} = useAuthStore(state => state.auth);
  const [{isLoading , apiData , serverError}] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      name : apiData?.name || 'aj',
      email : apiData?.email || '',
      phone : apiData?.phone || '',
      address : apiData?.address || '',
      city : apiData?.city || '',
      profile : apiData?.profile || '',
    },
    enableReinitialize : true,
    validate : profileValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
       values = await Object.assign(values , {profile : file || ''});
       let updatePromise = updateUser(values);
       toast.promise(updatePromise , {
        loading : 'Updating...',
        success : <b>Update Successfully... !</b>,
        error : <b>Could not update... !</b>
       })
       console.log(apiData?.email);
       console.log(values);
    }
  })

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError)return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

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

         
           <h2 className='text-[20px] mt-[60px]'>{apiData?.email || apiData?.username} </h2>

           <div className='mt-[20px] flex flex-col justify-center'>
            <div className='flex rounded-lg my-[20px] text-[18px] justify-center items-center bg-[#EFF1F9] w-[375px] h-[52px]'> 
              <IoKeyOutline />
              <input {...formik.getFieldProps('name')} className='w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]' placeholder='Name' type='name'/>
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
            </div>
         </div>
      </div>
      <div className='w-[50%]'>
         <button className='bg-primary rounded-lg text-white px-6 text-[18px] py-2'>Update</button>
         <label htmlFor='profile'>
           <img width={"250px"} height={"250px"} name="profile" className='mt-[60px] rounded-full' src={file || apiData?.profile || 'https://i.pinimg.com/564x/44/27/2d/44272df32b1b832c9ea8f596fb4d76b2.jpg'}/>
           <input className='opacity-0' onChange={onUpload} type='file' id='profile' />
         </label>
      </div>
      </form>
    </div>
  )
}

export default Profile