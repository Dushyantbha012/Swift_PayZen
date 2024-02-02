import React, { useState } from "react";
import axios from "axios"
function User({ user }) {
  const [amount,setAmount]=useState(0);
  const clickHandel=async()=>{
    try{
      const res = await axios({
        url: "http://localhost:3000/api/v1/account/transfer",
        method:"POST",
        headers:{authorisation:localStorage.getItem("token")},
        data:{"to":user._id,"amount":amount}
      })
      console.log(res)
      if(res.status===200){
        alert("transaction successful !!!!")
      }
      else{
        alert("transaction failed")
      }
    }
    catch{
     alert("transaction failed")
    }
    
  }
  return (
    <div className="flex flex-wrap border-[3px] border-blue-700 m-3 p-3 w-[350px] rounded-md bg-white">
      <div className="text-center text-xl w-full">
      {user.firstName} {user.lastName}
    </div>
      <div className="flex flex-nowrap align-middle items-center justify-around w-full">
      <input className="border border-blue-700 rounded-md px-2"
      value={amount}
      type="number"
      onChange={(e)=>setAmount(e.target.value)}></input>
      <button className="border border-blue-700  px-2 rounded-md"
      onClick={clickHandel}>Send</button>
      </div>
    </div>
  );
}

export default User;
