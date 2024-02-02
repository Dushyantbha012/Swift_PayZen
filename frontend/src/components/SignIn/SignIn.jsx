import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authatom } from "../atoms/atoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigateTo = useNavigate();
  const [auth, setAuth] = useRecoilState(authatom);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios({
        url: "http://localhost:3000/api/v1/user/signin",
        method: "POST",
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        setAuth(res.data.token);
        localStorage.setItem("token", res.data.token)
        navigateTo("/dashboard");
      }
    } catch(e) {
      if(e.response.status===404){
        alert("user not found")
      }
      else{
        alert("SignIn Unsuccessful")
      }
    }
  };

  return (
    <div className="flex flex-nowrap items-center justify-center align-middle pt-[80px]">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-wrap w-[30%] rounded-xl border border-black"
      >
        <label className="w-full font-extrabold text-6xl text-center">
          Sign In
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
          <button
            type="submit"
            className="px-4 py-1 border border-black text-4xl rounded-xl my-5"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
