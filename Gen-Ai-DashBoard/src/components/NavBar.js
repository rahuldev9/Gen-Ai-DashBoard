import React, { useState } from "react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0  z-50 bg-gradient-to-br from-gray-900 to-purple-900 p-3 h-[100px] shadow-md">
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl md:text-4xl text-white">
          <span className="text-pink-400">Gen AI</span>
          <span className="text-yellow-400"> Analytics</span> Dashboard
          <i className="fa-solid fa-robot text-blue-400 ml-2"></i>
        </p>

        <div className="hidden md:flex gap-6 text-white font-semibold">
          <button className="bg-transparent text-white px-4 py-2 rounded" >Home</button>
          <button className="bg-transparent text-white px-4 py-2 rounded">Analytics</button>
          <button className="bg-transparent text-white px-4 py-2 rounded">Reports</button>
          <button className="bg-transparent text-white px-4 py-2 rounded">Settings</button>
        </div>


        <div className="flex items-center gap-4">
          <i className="fa-solid fa-user-circle text-white text-3xl cursor-pointer"></i>
          <button
            className="md:hidden text-white px-3 py-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64  bg-gray-800 text-white transform transition-transform duration-300  ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          <i className="fa-solid fa-times"></i>
        </button>
        <div className="flex flex-col items-start p-6 mt-10">
          <button className="bg-transparent text-white px-4 py-2 rounded w-full text-left">Home</button>
          <button className="bg-transparent text-white px-4 py-2 rounded w-full text-left">Analytics</button>
          <button className="bg-transparent text-white px-4 py-2 rounded w-full text-left">Reports</button>
          <button className="bg-transparent text-white px-4 py-2 rounded w-full text-left">Settings</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;