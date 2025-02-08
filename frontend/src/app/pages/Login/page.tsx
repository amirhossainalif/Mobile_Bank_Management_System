'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../Merchant/api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Link from 'next/link';

// import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
// import { Button, Card, TextInput } from "flowbite-react";

interface LoginResponse {
  accessToken: string;
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await API.post<LoginResponse>('/auth/login', { email, password });
            Cookies.set('token', res.data.accessToken, { expires: 1 });
            toast.success('Login successful!');
            alert("Login successful!")
            router.push('/pages/Merchant/dashboard');
        } catch (err) {
            toast.error('Invalid credentials');
            alert("Invalid credentials")
        }
    };

    const handleReg = async () => {
      router.push("/pages/Merchant/Registration");
    };

    return (
    <div className="bg-sky-300 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>
      <form className="mt-4 text-black mb-4" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don't have an account? <a href="/pages/Merchant/Registration" className="text-blue-600">Register</a>
      </p>
    </div>
  </div>
    );
};

export default Login;

