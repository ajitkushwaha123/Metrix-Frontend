import React from 'react'
import Navbar from '../components/Navbar'
import BreadCrum from '../components/BreadCrum'

const Inventory = () => {
  return (
    <div>
      <Navbar title={"Inventory"}/>
      <BreadCrum title={"Inventory"} back={"/"} />
    </div>
  )
}

export default Inventory