import React from 'react'
import Navbar from '../components/Navbar'
import BreadCrum from '../components/BreadCrum'
import { LuUsers2 } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import Stats from '../components/Stats';
import { BsFolder2Open } from 'react-icons/bs';
import { TiPlus } from "react-icons/ti";
import table from '../Inventory/Table';

const Inventory = () => {
  return (
    <div>
      <Navbar title={"Inventory"}/>
      <BreadCrum title={"Inventory"} back={"/"} />
      <div className='flex justify-between items-center px-[30px] py-[10px]'>
        <h3 className='font-normal pt-[10px] text-[20px] font-poppins'>Inventory Summary</h3>
        <button className='bg-primary rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2'><TiPlus className='mr-[15px]'/>Add a New Product</button>
      </div>


      {/* Stats */}
      <div className='flex px-[28px] py-[10px]'>
      <div className='w-[45%] mt-[4px]'>
           <Stats 
             bgColor="primary"
             height='170px'
             icon={<BsFolder2Open />}
             title1={"All Products"}
             title2={"Active"}
             stat1={"45"}
             stat2={"32"}
             padY={"10"}
             txtColor={"white"}
           />
          </div>
        <div className='w-[55%] pl-[30px]'>
           <Stats 
             icon={<BsHandbag />}
             title1={"Low Stock Alert"}
             title2={"Expired"}
             txtColor={"text-red-200"}
             title3={"1 Start Rating"}
             stat1={"23"}
             stat2={"3"}
             stat3={"2"}
             present={"1"}
           />
        </div>
      </div>

      
    </div>
  )
}

export default Inventory