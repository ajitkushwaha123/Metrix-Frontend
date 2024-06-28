import React from 'react'
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { NavLink} from 'react-router-dom';

const BreadCrum = ({title , back}) => {
  return (
    <div className='w-full px-[40px] flex justify-start items-center h-[40px]'>
       <NavLink to={'/'}><SiHomeassistantcommunitystore className='text-primary mr-[10px]'/></NavLink> 
        <h3 className='flex justify-center items-center'><p className='mr-[10px]'>{back}</p> {title}</h3>
    </div>
  )
}

export default BreadCrum
