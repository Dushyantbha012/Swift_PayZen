import {React, useEffect} from 'react'
import { authatom } from '../atoms/atoms'
import { useRecoilValue } from 'recoil'
import {NavLink} from "react-router-dom"
function Home() {
  const auth = useRecoilValue(authatom)

  return (

    <div className='flex flexwrap justify-center align-middle items-center my-8'>
      <NavLink to="/dashboard"><div className='border border-black px-4 py-3 text-3xl rounded-md'>DashBoard</div></NavLink>
    </div>
  )
}

export default Home