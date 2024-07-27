import React from 'react';
import { AiOutlinePieChart } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Stats = ({
  title1,
  height = '145px',
  title2,
  icon,
  stat1,
  stat1per,
  stat2,
  stat2per,
  present = 0,
  title3,
  stat3,
  stat3per,
  padY = "5",
  bgColor="white",
  txtColor
}) => {
  return (
    <div className={`font-poppins h-${height} text-${txtColor} flex justify-center flex-col pb-[19px] bg-${bgColor} rounded-xl`}>
      <div className={`flex justify-between py-5 px-5`}>
        <p className='bg-secondary text-[24px] text-primary p-2 rounded-lg'>
          {icon}
        </p>
        <p className={`flex text-${txtColor} text-txtPrimary justify-center items-center`}>
          {/* This Week <MdOutlineKeyboardArrowDown className='text-[22px]' /> */}

          
        </p>
      </div>

      <div className='flex px-5'>
        <div className='w-[50%]'>
          <p className={`text-txtPrimary text-start text-${txtColor}`}>{title1}</p>
          <div className='flex'>
            <p>{stat1}</p>
            <p className={`text-txtGreen text-${txtColor} ml-[10px]`}>{stat1per}</p>
          </div>
        </div>
        <div className='w-[50%]'>
          <p className={`text-txtPrimary text-start text-${txtColor}`}>{title2}</p>
          <div className='flex'>
            <p>{stat2}</p>
            <p className={`text-txtGreen text-${txtColor} ml-[10px]`}>{stat2per}</p>
          </div>
        </div>

        {present == 1 && (
          <div className='w-[50%]'>
            <p className='text-txtPrimary text-start'>{title3}</p>
            <div className='flex'>
              <p>{stat3}</p>
              <p className='text-txtGreen ml-[10px]'>{stat3per}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
