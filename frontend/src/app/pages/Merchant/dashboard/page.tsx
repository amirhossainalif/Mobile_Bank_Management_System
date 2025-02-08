
'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../Navbar/page";
import API from "../api";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProfileData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  balance: number;
}

interface Transaction {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get<ProfileData>('/merchant/profile');
        setProfile(res.data);
        fetchTransactions(res.data.id);
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push('/pages/Login');
      }
    };

    const fetchTransactions = async (userId: number) => {
      try {
        const res = await API.get<Transaction[]>('/merchant/transactions');
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="h-screen flex items-center justify-center bg-sky-300 text-lg font-semibold">
      Loading...
    </div>;
  }

  const totalSent = transactions
    .filter(tx => tx.senderId === profile.id)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalReceived = transactions
    .filter(tx => tx.receiverId === profile.id)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const chartData = {
    labels: ["Sent", "Received"],
    datasets: [
      {
        data: [totalSent, totalReceived],
        backgroundColor: ["#ff6384", "#36a2eb"],
        borderWidth: 1,
        hoverOffset: 4, 
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};


  return (
    <div className="h-screen bg-sky-300 flex flex-col items-center p-4">
      <Navbar />
      <br></br>
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {profile.name}</h1>
      <p className="text-lg text-gray-700 mt-2"><strong>User ID:</strong> {profile.id}</p>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Transaction Summary</h2>
        <div className="w-64 h-64 mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
