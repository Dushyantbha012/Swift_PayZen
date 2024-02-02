import { React, useState } from "react";
import axios from "axios"
import { useRecoilState } from "recoil";
import {authatom} from "../atoms/atoms"
import {useNavigate} from "react-router-dom"

function SignUp() {
  const navigateTo = useNavigate();
  const [auth,setAuth]=useRecoilState(authatom);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios({url:"http://localhost:3000/api/v1/user/signup", method:"POST", data:formData,});
    if(res.status===200){
      localStorage.setItem("token", res.data.token)
      setAuth(res.data.token)
      navigateTo("/dashboard")
    }
    }
    catch{
      alert("Registration Unsuccessful !!!!")
    }
  };

  
  return (
    <div className="flex flex-nowrap items-center justify-center align-middle pt-[80px]">
      <form
        onSubmit={formSubmit}
        className="flex flex-wrap w-[30%] rounded-xl border border-black"
      >
        <label className="w-full font-extrabold text-6xl text-center">
          Register
        </label>
        <div className="w-full flex flex-wrap items-left justify-left align-middle py-5">
          <label className="px-5 text-4xl text-left w-full">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onFormChange}
            className="border border-black rounded-lg h-[30px] w-[400px] ml-5 mt-3"
          />
        </div>
        <div className="w-full flex flex-wrap items-left justify-left align-middle py-5">
          <label className="px-5 text-4xl text-left w-full">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onFormChange}
            className="border border-black rounded-lg h-[30px] w-[400px] ml-5 mt-3"
          />
        </div>
        <div className="w-full flex flex-wrap items-left justify-left align-middle py-5">
          <label className="px-5 text-4xl text-left w-full">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onFormChange}
            className="border border-black rounded-lg h-[30px] w-[400px] ml-5 mt-3"
          />
        </div>
        <div className="w-full flex flex-wrap items-left justify-left align-middle py-5">
          <label className="px-5 text-4xl text-left w-full">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onFormChange}
            className="border border-black rounded-lg h-[30px] w-[400px] ml-5 mt-3"
          />
        </div>
        <div className="w-full flex flex-nowrap items-center justify-center">
        <button type="submit" className="px-4 py-1 border border-black text-4xl rounded-xl my-5">Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
