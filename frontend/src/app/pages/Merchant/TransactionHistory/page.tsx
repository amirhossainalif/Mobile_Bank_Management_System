
"use client";


import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api';
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";
import * as XLSX from 'xlsx'; 

type Transaction = {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  date: string;
};

interface ProfileData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  balance: number;
}


const TransactionHistory = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);  
  const router = useRouter();
  const [merchantId, setMerchantId] = useState<number | null>(null);
  //const [userid, setid] = useState<number | null>(null);


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        if (!merchantId) {
          setError('Merchant ID not found.');
          return;
        }
    
        try {
          const res = await API.get<{ transactions: Transaction[] }>('/merchant/history', {
            params: { merchantId, startDate, endDate },
            withCredentials: true,
          });
    
          setTransactions(res.data.transactions);
          //setTransactions(res.data.transactions.slice(0, 5)); // Ensure max 5 transactions are shown

        } catch (err) {
          setError('Error fetching transaction history');
        }
      };
      const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(transactions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transaction History');
    
        XLSX.writeFile(wb, 'transaction_history.xlsx');
      };



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get<ProfileData>('/merchant/profile'); 
        setProfile(res.data);  
        setMerchantId(res.data.id);
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push('/pages/Merchant/dashboard');  
      }
    };

    fetchProfile();
  }, []);


  return (
    <div><Navbar />

    <div className="min-h-screen bg-sky-400 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
      <div className="w-full max-w-4xl bg-white rounded shadow-lg p-6">
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black text-center mb-4">Transaction History</h2>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-black">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 w-full text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endDate" className="block text-black">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 w-full text-black"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Search</button>
          </form>
        </div>
        </div>
        <br></br>
        <div className="w-full max-w-4xl bg-sky-300 rounded shadow-lg p-6">
        
        {transactions.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Transaction History</h3>
             
             <button
                onClick={handleExport}
                className="bg-green-500 text-white p-2 rounded mb-4"
              >
                Export to Excel
              </button>
            <table className="w-full table-auto border-collapse text-lg font-semibold text-black mb-4">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Sender ID</th>
                  <th className="border-b px-4 py-2 text-left">Receiver ID</th>
                  <th className="border-b px-4 py-2 text-left">Amount</th>
                  <th className="border-b px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="border-b px-4 py-2">{transaction.senderId}</td>
                    <td className="border-b px-4 py-2">{transaction.receiverId}</td>
                    <td className="border-b px-4 py-2">${transaction.amount}</td>
                    <td className="border-b px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-black mt-4">No transactions found for the selected dates.</p>
        )}
      </div>
      </div>
    </div>
    </div>
  );
};

export default TransactionHistory;
