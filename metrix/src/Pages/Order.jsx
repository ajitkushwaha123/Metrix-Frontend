import React from 'react'
import Navbar from '../components/Navbar'
import BreadCrum from '../components/BreadCrum'
import { LuUsers2 } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import Stats from '../components/Stats';
import { BsFolder2Open } from 'react-icons/bs';
import { TiPlus } from "react-icons/ti";
import InvTable from '../DataTable/Table';
import { NavLink } from 'react-router-dom';
import OrderTable from '../DataTable/OrderTable';
import NewOrder from './NewOrder';

const Order = () => {
  return (
    <div>
      <Navbar title={"Order"}/>
      <BreadCrum title={"Order"} back={"/"} />
      <div className='flex justify-between items-center px-[30px] py-[10px]'>
        <h3 className='font-normal pt-[10px] text-[20px] font-poppins'>Order Summary</h3>
        <NavLink to={"/inventory/new-product"}><button className='bg-primary rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2'><TiPlus className='mr-[15px]'/>Add a New Order</button></NavLink>
        {/* <NewOrder /> */}
      </div>


      {/* Stats */}
      <div className='flex px-[28px] py-[10px]'>
      <div className='w-full mt-[4px]'>
          <div className='w-full'>
           <Stats 
             icon={<BsFolder2Open />}
             bgColor={"primary"}
             title1={"All Orders"}
             title2={"Pending"}
             txtColor={"white"}
             title3={"Completed"}
             stat1={"23"}
             stat2={"3"}
             stat3={"2"}
             present={"1"}
          />
        </div>
          </div>

        <div className='w-full pl-[30px]'>
           <Stats 
             icon={<BsHandbag />}
             title1={"Cancelled"}
             title2={"Return"}
             txtColor={"text-red-200"}
             title3={"Customers"}
             stat1={"23"}
             stat2={"3"}
             stat3={"2"}
             present={"1"}
           />
        </div>
      </div>

      <div className='px-[30px] py-[30px]'>
        <div className='bg-white py-[40px] px-[40px]'>
          <OrderTable />
        </div>
      </div>
    </div>
  )
}

export default Order