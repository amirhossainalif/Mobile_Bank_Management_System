
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "../api";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    router.push("/pages/Login");
  };

  const handleSettings = async () => {
    router.push("/pages/Merchant/Settings");
  };

  const handleTransfer = async () => {
    router.push("/pages/Merchant/Transfer");
  };

  const handleHistory = async () => {
    router.push("/pages/Merchant/TransactionHistory");
  };

  const handleDashboard = async () => {
    router.push("/pages/Merchant/dashboard");
  };

  const handleMessage = async () => {
    router.push("/pages/Merchant/Message");
  };

  return (
    <nav className="bg-sky-400 text-white p-4 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Merchant</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={handleDashboard}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={handleMessage}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Message
            </button>
          </li>
          <li>
            <button
              onClick={handleTransfer}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Transfer Money
            </button>
          </li>
          <li>
            <button
              onClick={handleHistory}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Transaction History
            </button>
          </li>
          <li>
            <button
              onClick={handleSettings}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-sky-400 px-4 py-2 rounded-lg hover:bg-sky-400"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;