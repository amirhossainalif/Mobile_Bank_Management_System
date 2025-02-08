
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "../Merchant/api";

const Topbar = () => {
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/pages/Login");
  };

  const handleReg = async () => {
    router.push("/pages/Merchant/Registration");
  };

  const handleabout = async () => {
    router.push("http://localhost:3001/pages/about");
  };

  const handleHome = async () => {
    router.push("http://localhost:3001/");
  };


  return (
    <nav className="bg-sky-400 text-white p-4 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mobile Banking System</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={handleHome}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={handleabout}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={handleReg}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Registration
            </button>
          </li>
          <li>
            <button
              onClick={handleLogin}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topbar;