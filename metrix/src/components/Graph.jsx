import React from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Chart from './Chart'
import { IoIosArrowDown } from "react-icons/io";
const Graph = ({title , present , present2}) => {
  return (
    <div className='h-[400.67px] rounded-xl bg-white font-poppins'>
      <div className='flex justify-between p-5'>
        <div className='flex justify-center items-center'>
           <p className='text-[18px] font-poppins text-medium mr-[15px]'>Marketting</p>
           {present == 1 &&
             <button className='bg-secondary flex justify-center items-center px-[16px] py-[8px] rounded-xl mr-[20px]'>Sales <IoIosArrowDown className='ml-[10px]'/></button>
           }
        </div>
        <p className='flex text-txtPrimary justify-center items-center'>This Week <MdOutlineKeyboardArrowDown className='text-[22px]'/> </p>
      </div>

      {present2 && 
        <div className='flex px-5 pt-[15px] justify-center items-center'>
          <li className='mr-[10px]  text-center focus:list-disc text-primary'>Acquisition</li>
          <li className='mr-[10px]  text-center text-[#97A5EB]'>Purchase</li>
          <li className='mr-[10px]  text-center text-[#FFCC91]'>Retention</li>
        </div>
      }

      <div className='mx-auto flex justify-center items-center'>
        {title}
      </div>
    </div>
  )
}

export default Graph
