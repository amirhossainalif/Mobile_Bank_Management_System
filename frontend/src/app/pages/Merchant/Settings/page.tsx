"use client";


import { useEffect, useState } from 'react';
import API from '../api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from "../Navbar/page";


interface ProfileData {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    balance: number;
    password: string;
  }

  // interface UpdateData {
  //   name: string;
  //   email: string;
  //   phoneNumber: string;
  //   address: string;
  //   balance: number;
  //   password: string;
  // }
  
  const Profile = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);  
    //const [login, setLogin] = useState<loginData | null>(null); 
    const [isEditing, setIsEditing] = useState(false); 
    const [formData, setFormData] = useState<ProfileData | null>(null);  
    //const [formData1, setFormData1] = useState<UpdateData | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await API.get<ProfileData>('/merchant/lo');
          setProfile(res.data);
          setFormData(res.data);  
          // const res1 = await API.get<loginData>('/merchant/lo');
          // setLogin(res1.data);
          // setFormData1(res1.data); 
        } catch (error) {
          console.error("Error fetching profile:", error);
          router.push('/pages/Login');  
        }
      };
  
      fetchProfile();
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const res = await API.put<ProfileData>('/merchant/update', formData); 
        setProfile(res.data);  
        setIsEditing(false);   
        alert("Profile Updated");
        router.push('/pages/Merchant/dashboard');
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("error updating");
      }
    };
  
    if (!profile) {
      return <div>Loading...</div>;
    }
  
    return (

      <div><Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-sky-400 p-4">
      <div className="bg-gray-300 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Profile</h2>
        {!isEditing ? (
          <div className="text-2xl font-bold text-gray-800 space-y-3">
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone Number: {profile.phoneNumber}</p>
            <p>Address: {profile.address}</p>
            <p>Balance: ${profile.balance}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-2xl font-bold text-gray-800">
              Name:
              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>
            <label className="block text-2xl font-bold text-gray-800">
              Email:
              <input
                type="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                required
                disabled
                className="w-full p-3 border rounded-lg bg-gray-200"
              />
            </label>
            <label className="block text-2xl font-bold text-gray-800">
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>
            <label className="block text-2xl font-bold text-gray-800">
              Address:
              <input
                type="text"
                name="address"
                value={formData?.address || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>
            <label className="block text-2xl font-bold text-gray-800">
              Balance:
              <input
                type="number"
                name="balance"
                value={formData?.balance || 0}
                onChange={handleChange}
                required
                disabled
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>
            <label className="block text-2xl font-bold text-gray-800">
              Password:
              <input
                type="text"
                name="password"
                value={formData?.password || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
    );
  };
  
  export default Profile;
