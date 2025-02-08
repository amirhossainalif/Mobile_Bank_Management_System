
'use client';

import { useState } from "react";
import API from "../api";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";

interface Message {
  senderId: number;
  receiverId: number;
  content: string;
}

interface ProfileData {
    id: number;
    name: string;
    email: string;
  }

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [receiverId, setReceiverId] = useState("");
  const [senderId1, setsenderId] = useState(Number);
  const [content, setContent] = useState("");
  const router = useRouter();
  const fetchProfile = async () => {
    try {
      const res = await API.get<ProfileData>('/merchant/profile');
      setProfile(res.data);
      setsenderId(res.data.id)
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("data fetching error")
      router.push('/pages/Login');
    }
  };

  const sendMessage = () => {
    const senderId = senderId1; 
    const receiverIdNum = Number(receiverId); 

  if (isNaN(receiverIdNum)) {
    alert("Receiver ID must be a valid number");
    return;
  }
  
  setMessages((prev) => [
    ...prev,
    { senderId, receiverId: receiverIdNum, content },
  ]);
  };

  return (
    <div><Navbar />
    <div className="flex items-center justify-center h-screen bg-sky-300">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          className="w-full p-2 border rounded mb-2"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Receiver ID"
        />
        <input
          className="w-full p-2 border rounded mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>

        <div className="mt-4 border-t pt-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border-b">
              <b>{msg.senderId}:</b> {msg.content}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chatbox;
