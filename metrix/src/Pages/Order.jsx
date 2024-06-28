import React from 'react'
import Navbar from '../components/Navbar'
import BreadCrum from '../components/BreadCrum'

const Order = () => {
  return (
    <div>
      <Navbar title={"Orders"}/>
      <BreadCrum title={"Orders"} back={"/"} />
    </div>
  )
}

export default Order
