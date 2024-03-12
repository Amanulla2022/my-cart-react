import React from "react";
import { FaCartPlus } from "react-icons/fa";

const Header = ({ productCount }) => {
  return (
    <header className=" flex justify-around bg-blue-500 text-white p-4">
      <h1 className="text-3xl">MyCart</h1>
      <div className="flex items-center text-3xl">
        <FaCartPlus className="text-slate-300" />
        <sup className="text-green-700">
          {productCount > 0 ? productCount : 0}
        </sup>
      </div>
    </header>
  );
};

export default Header;
