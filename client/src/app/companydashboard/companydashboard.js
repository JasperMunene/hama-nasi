"use client";
import React, { useState } from "react";
import { FaBars, FaBox, FaMoneyBillWave, FaClock, FaHome, FaTruck, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-gray-900 text-white w-64 min-h-screen p-5 fixed transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
      <h2 className="text-2xl font-bold text-center">MoversApp</h2>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
          <FaHome />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
          <FaTruck />
          <span>Moves</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer">
          <FaCog />
          <span>Settings</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-red-400 cursor-pointer mt-10">
          <FaSignOutAlt />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const stats = [
    { title: "Total Moves", value: 50, change: "+1.3%", icon: <FaBox />, color: "text-blue-500 bg-blue-100" },
    { title: "Total Sales", value: "KES 589,000", change: "-4.3%", icon: <FaMoneyBillWave />, color: "text-purple-500 bg-purple-100" },
    { title: "Pending Moves", value: 10, change: "+1.8%", icon: <FaClock />, color: "text-green-500 bg-green-100" }
  ];

  const moves = [
    { id: 1, name: "Luka", price: "KES 200,000", route: "Nairobi - Mombasa", image: "/person1.jpg" },
    { id: 2, name: "Mark", price: "KES 200,000", route: "Nairobi - Mombasa", image: "/person2.jpg" },
    { id: 3, name: "Marcy", price: "KES 200,000", route: "Nairobi - Mombasa", image: "/person3.jpg" }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-64 transition-all">
        <button className="md:hidden text-gray-900 text-2xl mb-4" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Dashboard Stats */}
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center">
              <div className={`text-3xl ${stat.color} p-3 rounded-full mr-4`}>{stat.icon}</div>
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Available Moves */}
        <h2 className="text-2xl font-bold mt-6">Get your next Move</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {moves.map((move) => (
            <div key={move.id} className="p-4 bg-white rounded-lg shadow-md">
              <img src={move.image} alt={move.name} className="rounded-lg w-full h-40 object-cover" />
              <h3 className="text-lg font-bold mt-2">{move.name}</h3>
              <p className="text-gray-500">{move.route}</p>
              <p className="text-gray-700 font-bold">{move.price}</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600 w-full">
                Bid
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
