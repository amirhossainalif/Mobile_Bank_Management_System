 "use client";

import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/pages/Login");
  };

  return (
    <div className="bg-sky-300 min-h-screen flex flex-col">
      
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">MobileBank</div>
          <nav>
            <ul className="flex space-x-6 text-gray-800">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      
      <section className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-semibold text-gray-800">Your Mobile Banking Solution</h1>
        <p className="mt-4 text-lg text-gray-700">Access your bank anytime, anywhere.</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
        onClick={handleLogin} >Get Started</button>
      </section>

     
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Secure Transactions</h3>
              <p className="mt-2 text-gray-600">Ensure that your transactions are encrypted and secure with our mobile banking system.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Instant Balance Updates</h3>
              <p className="mt-2 text-gray-600">Check your bank balance in real-time, and manage your finances on the go.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
              <p className="mt-2 text-gray-600">Our customer service is available 24/7 to help with any issues or inquiries.</p>
            </div>
          </div>
        </div>
      </section>

  
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">About Us</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We provide a secure and easy-to-use platform for managing your finances. With our mobile banking system, you can
            send money, track your expenses, and keep your account secure with advanced features.
          </p>
        </div>
      </section>

      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">Have any questions? Reach out to us, and we’ll get back to you as soon as possible.</p>
          <form className="mt-6 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            ></textarea>
            <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="py-6 bg-sky-500 text-white text-center">
        <p>&copy; 2025 MobileBank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;


