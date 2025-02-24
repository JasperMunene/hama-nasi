import React from "react";
import { FaBox, FaMoneyBillWave, FaClock } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { title: "Total Moves", value: 50, change: "+1.3%", icon: <FaBox />, color: "text-blue-500" },
    { title: "Total Sales", value: "KES 589,000", change: "-4.3%", icon: <FaMoneyBillWave />, color: "text-purple-500" },
    { title: "Pending Moves", value: 10, change: "+1.8%", icon: <FaClock />, color: "text-green-500" }
  ];

  const moves = [
    { id: 1, name: "Luka", price: "KES 200,000", route: "Nairobi - Mombasa", image: "/person1.jpg" },
    { id: 2, name: "Mark", price: "KES 200,000", route: "Nairobi - Mombasa", image: "/person2.jpg" },
    { id: 3, name: "Marcy", price: "KES 200,000", route: "Nairobi - Mombasa", image: "/person3.jpg" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center">
            <div className={`text-3xl ${stat.color} mr-4`}>{stat.icon}</div>
            <div>
              <p className="text-gray-500">{stat.title}</p>
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mt-6">Get your next Move</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {moves.map((move) => (
          <div key={move.id} className="p-4 bg-white rounded-lg shadow-md">
            <img src={move.image} alt={move.name} className="rounded-lg w-full h-40 object-cover" />
            <h3 className="text-lg font-bold mt-2">{move.name}</h3>
            <p className="text-gray-500">{move.route}</p>
            <p className="text-gray-700 font-bold">{move.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Bid</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
