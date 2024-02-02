import React from "react";
import {NavLink} from "react-router-dom"
function Header() {
  return (
    <div className="flex flex-nowrap align-middle justify-between px-5 py-3 border-b-2 border-blue-600 bg-blue-600">
     <NavLink to="/"> <div className="text-4xl text-white border border-white rounded-2xl p-2 bg-slate-500">Swift PayZen</div></NavLink>
      <div className="flex flex-nowrap align-middle justify-center items-center">
        <ul className="flex flex-nowrap justify-between align-middle items-center">
          <NavLink to="/signup"><li className="px-2 text-2xl">Register</li></NavLink>
          <NavLink to="/signin"><li className="px-2 text-2xl">Sign In</li></NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Header;
