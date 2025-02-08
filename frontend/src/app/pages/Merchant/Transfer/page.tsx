"use client";
import { useState, useEffect } from 'react';
import API from '../api'; 
import Navbar from "../Navbar/page";


// interface BalanceResponse {
//     balance: number;
//     id: number;
//   }

interface ProfileData {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    balance: number;
  }
  
  interface TransferResponse {
    //message: string;
    amount: number;
    senderid: number;
    receiverId: number
  }
const TransferForm = () => {
  const [receiverId, setReceiverId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
   const [sendid, setid] = useState<number>(0);  

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await API.get<ProfileData>('/merchant/profile'); 
        setBalance(res.data.balance);
        setid(res.data.id);
      } catch (err) {
        setError('Error fetching balance');
      }
    };
    fetchBalance();
  }, []);

  if (!sendid) {
    return <div className="h-screen flex items-center justify-center bg-sky-300 text-lg font-semibold">
      Loading...
    </div>;
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (amount <= 0) {
      setError('Amount must be greater than zero');
      return;
    }
    if (amount > balance) {
      setError('Insufficient balance');
      return;
    }

    setLoading(true); 

    try {
      if (receiverId==sendid){
        alert("same account transaction not possible!")
      }else{

        const res = await API.post<TransferResponse>('/merchant/transfer', 
          {sendid, receiverId, amount });
    
          setMessage('Transfer successful!');
          setReceiverId(0); 
          setAmount(0);
          setBalance(0);
      }

      

      const updatedBalance = await API.get<ProfileData>('/merchant/profile');
      setBalance(updatedBalance.data.balance);
    } catch (err) {
      setError('Error transferring money');
    } finally {
      setLoading(false);
    }
  };

  return (


    <div>
      <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-sky-400 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Transfer Money</h2>
        {error && <div className="text-red-500 text-2xl font-bold mb-2">{error}</div>}
        {message && <div className="text-green-500 text-2xl font-bold mb-2">{message}</div>}
        <div className="mb-4 text-2xl font-bold text-gray-800">
          <p>Your current balance: <span className="text-blue-600">${balance}</span></p>
        </div>
        <form onSubmit={handleTransfer} className="space-y-4">
          <label className="block text-2xl font-bold text-gray-800">
            Receiver ID
            <input
              type="number"
              id="receiverId"
              value={receiverId}
              onChange={(e) => setReceiverId(Number(e.target.value))}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </label>
          <label className="block text-2xl font-bold text-gray-800">
            Amount
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </label>
          <button 
            type="submit" 
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition text-2xl font-bold"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Transfer'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default TransferForm;
