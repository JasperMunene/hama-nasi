"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaTruck, FaMoneyBillWave, FaClock, FaBars, FaStar } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Sidebar Component
const Sidebar = ({ isOpen, setActivePage }) => {
  return (
    <div
      className={`bg-white text-black w-56 min-h-screen p-5 fixed shadow-md transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-56"
      } md:translate-x-0`}
    >
      <h2 className="text-lg font-semibold mb-6">Hama Nasi</h2>
      <ul className="space-y-4">
        <li
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
          onClick={() => setActivePage("dashboard")}
        >
          <FaHome /> <span>Home</span>
        </li>
        <li
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
          onClick={() => setActivePage("moves")}
        >
          <FaStar /> <span>Moves</span>
        </li>
        <li
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
          onClick={() => setActivePage("settings")}
        >
          <MdOutlineSettings /> <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

// Moves Component (updated to display as cards)
const Moves = ({ moves, handleViewClick }) => {
  return (
    <div className="w-full p-6 flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {moves.map((move) => (
          <div key={move.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img src={move.image} alt={move.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">{move.name}</h3>
            <p className="text-sm text-gray-500">{move.route}</p>
            <p className="text-lg font-bold text-blue-600 mt-2">{move.price}</p>
            <Button
              onClick={() => handleViewClick(move.id)}
              className="bg-blue-500 text-white mt-4 w-full py-2 rounded-lg hover:bg-blue-600"
            >
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Component
const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
    language: "English",
    privacy: "Public",
    password: "",
    bio: "",
    paymentMethod: "Credit Card",
  });

  return (
    <div className="w-full p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Enable Notifications</span>
            <Switch
              checked={settings.notifications}
              onCheckedChange={() =>
                setSettings({ ...settings, notifications: !settings.notifications })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <Select onValueChange={(value) => setSettings({ ...settings, theme: value })}>
              <SelectTrigger className="border rounded-lg p-2 w-full">{settings.theme}</SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Language</label>
            <Select onValueChange={(value) => setSettings({ ...settings, language: value })}>
              <SelectTrigger className="border rounded-lg p-2 w-full">{settings.language}</SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Change Password</label>
            <Input
              type="password"
              className="border rounded-lg p-2 w-full"
              placeholder="New Password"
              value={settings.password}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <Textarea
              className="border rounded-lg p-2 w-full"
              placeholder="Tell us about yourself"
              value={settings.bio}
              onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
            />
          </div>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // Set initial active page

  const toggleSidebar = () => setIsOpen(!isOpen);

  const router = useRouter(); // Initialize the router

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

  const handleViewClick = (moveId) => {
    router.push(`/companydashboard/${moveId}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-56 transition-all">
        <button className="md:hidden text-gray-900 text-2xl mb-4" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Conditionally render content based on active page */}
        {activePage === "dashboard" && (
          <>
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
          </>
        )}

        {activePage === "moves" && <Moves moves={moves} handleViewClick={handleViewClick} />}

        {activePage === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;
