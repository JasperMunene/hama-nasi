"use client";  // Ensure this is marked as a client component
import React, { useState } from "react";
import { useRouter } from 'next/navigation';  // Import from 'next/navigation' for app directory
import { FaBars, FaMoneyBillWave, FaClock, FaHome, FaTruck, FaStar, FaCog, FaChartLine } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-gray-900 text-white w-56 min-h-screen p-5 fixed transition-transform ${isOpen ? "translate-x-0" : "-translate-x-56"} md:translate-x-0`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">MoversApp</h2>
        <FaCog className="cursor-pointer" />
      </div>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer" onClick={() => document.getElementById("dashboard-section").scrollIntoView({ behavior: "smooth" })}>
          <FaHome />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer" onClick={() => document.getElementById("moves-section").scrollIntoView({ behavior: "smooth" })}>
          <FaTruck />
          <span>Moves</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer" onClick={() => document.getElementById("revenue-section").scrollIntoView({ behavior: "smooth" })}>
          <FaMoneyBillWave />
          <span>Total Revenue</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer" onClick={() => document.getElementById("analytics-section").scrollIntoView({ behavior: "smooth" })}>
          <FaChartLine />
          <span>Analytics</span>
        </li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const router = useRouter();  // Initialize the router

  // Dashboard stats data
  const stats = [
    { title: "Total Moves", value: 6, icon: <FaTruck />, color: "text-blue-500", change: "+2 this week" },
    { title: "Pending Moves", value: 2, icon: <FaClock />, color: "text-yellow-500", change: "-1 from last week" },
    { title: "Total Sales", value: "KES 1,250,000", icon: <FaMoneyBillWave />, color: "text-green-500", change: "+KES 100,000" },
    { title: "Total Revenue", value: "KES 3,500,000", icon: <FaMoneyBillWave />, color: "text-green-500", change: "+KES 200,000 this month" }
  ];

  const moves = [
    { id: 1, name: "Luka", price: "KES 200,000", route: "Nairobi - Mombasa", image: "https://thumbs.dreamstime.com/b/laughing-african-man-gray-shirt-copy-space-single-handsome-young-bald-head-long-sleeve-folded-arms-over-neutral-71706646.jpg"},
    { id: 2, name: "Mark", price: "KES 200,000", route: "Nairobi - Mombasa", image: "https://media.istockphoto.com/id/1367909982/photo/young-african-american-man-uses-a-mobile-phone-on-the-go.jpg?s=612x612&w=0&k=20&c=tPLvf_JIFcwQr-XGJBjJbgiXBJYYSzTQMZZz-nYkbUw="},
    { id: 3, name: "Marcy", price: "KES 200,000", route: "Nairobi - Mombasa", image: "https://media.istockphoto.com/id/969233490/photo/young-african-woman-smiling-at-sunset.jpg?s=612x612&w=0&k=20&c=G0cagT6s1rXm455ZN8TCReO1C78ua1xGJPXDi6eKGLA="},
    { id: 4, name: "Alice", price: "KES 180,000", route: "Kisumu - Eldoret", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB3nKn29BD_0ZikgE2L4euqqY7RkwJe61G7b4p3cU1TPeQrks5UfcOUvq5_pFoojBnf0w&usqp=CAU" },
    { id: 5, name: "John", price: "KES 220,000", route: "Nairobi - Nakuru", image: "https://static.vecteezy.com/system/resources/previews/035/814/723/non_2x/ai-generated-portrait-of-handsome-businessman-wearing-white-shirt-isolated-gray-background-ai-generated-free-photo.jpg" },
    { id: 6, name: "Sarah", price: "KES 250,000", route: "Mombasa - Malindi", image: "https://media.istockphoto.com/id/478803372/photo/attractive-young-sports-woman-outdoors.jpg?s=612x612&w=0&k=20&c=wunjloTp0r1ydA6HPNK7FhDc2377owrjYao8p1EL0II=" }
  ];

  const reviews = [
    { id: 1, customer: "Luka", rating: 5, comment: "Great service! Mover was on time and professional!" },
    { id: 2, customer: "Mark", rating: 4, comment: "Good job overall, but could be faster."},
    { id: 3, customer: "Marcy", rating: 5, comment: "Excellent experience. Highly recommend!" },
    { id: 4, customer: "Alice", rating: 3, comment: "Average service."}
  ];

  const handleViewClick = (moveId) => {
    router.push(`/companydashboard/${moveId}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-56 transition-all">
        <button className="md:hidden text-gray-900 text-2xl mb-4" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Dashboard Stats */}
        <h2 className="text-2xl font-bold" id="dashboard-section">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center">
              <div className={`text-3xl ${stat.color} p-3 rounded-full mr-4`}>
                {stat.icon}
              </div>
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

        {/* Moves Section */}
        <section id="moves-section" className="mt-10">
          <h2 className="text-2xl font-bold">Get your next Move</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {moves.map((move) => (
              <div key={move.id} className="p-4 bg-white rounded-lg shadow-md">
                <img src={move.image} alt={move.name} className="rounded-lg w-full h-40 object-cover" />
                <h3 className="text-lg font-bold mt-2">{move.name}</h3>
                <p className="text-gray-500">{move.route}</p>
                <p className="text-gray-700 font-bold">{move.price}</p>
                <div className="flex justify-between items-center mt-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600" onClick={() => handleViewClick(move.id)}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews-section" className="mt-10">
          <h2 className="text-2xl font-bold">Customer Reviews & Ratings</h2>
          <div className="mt-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-white rounded-lg shadow-md mb-4">
                <p className="text-gray-700 font-bold">{review.customer}</p>
                <p className="text-gray-500">Rating: {review.rating} <FaStar className="inline text-yellow-500" /></p>
                <p className="text-gray-600 italic">"{review.comment}"</p>
                <div className="mt-2">
                  <textarea className="w-full p-2 border rounded" placeholder="Write your feedback here..."></textarea>
                  <button className="bg-green-500 text-white px-4 py-2 rounded mt-2 transition duration-300 hover:bg-green-600">
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
