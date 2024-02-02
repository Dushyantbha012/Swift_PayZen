import React from 'react'
import Users from "./Users"
import Balance from './Balance'

function DashBoard() {

  return (
    <div className='py-10 flex flex-nowrap align-middle justify-center items-center'>
      <div className='flex flex-wrap border border-blue-800 bg-blue-300 text-blue-600 w-[70%] rounded-md p-4'>
      <Balance/>
      <Users />
    </div>
    </div>
  )
}

export default DashBoard