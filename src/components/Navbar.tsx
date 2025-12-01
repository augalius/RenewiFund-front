import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-5 px-10 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/logo.png"
          alt="logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Menu */}
      <div className="hidden md:flex gap-10 text-gray-800 font-medium">
        <a href="#">Investicijos žmonėms</a>
        <a href="#">Investicijos verslui</a>
        <a href="#">Projektų teikimas</a>
        <a href="#">Apie RenewiFund</a>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center">
        <button className="text-gray-700">EN</button>
        <button className="bg-[#A7E163] px-5 py-2 rounded-full font-semibold">
          Prisijungti
        </button>
      </div>
    </nav>
  );
}
