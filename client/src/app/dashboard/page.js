'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_BASE_URL = 'http://127.0.0.1:5000';


const sampleInventory = [
  { name: "Sofa", category: "Furniture", condition: "Good" },
  { name: "TV", category: "Electronics", condition: "New" },
  { name: "Dining Table", category: "Furniture", condition: "Used" }
];

const sampleCompanies = [
  { name: "Fast Movers", email: "contact@fastmovers.com" },
  { name: "Smooth Relocations", email: "info@smoothrelocations.com" },
  { name: "Budget Movers", email: "support@budgetmovers.com" }
];

const sampleReviews = [
  { name: "Luka", time: "2 days ago", text: "Amazing service! Highly recommend." },
  { name: "Sofia", time: "3 days ago", text: "Very professional movers, made my move stress-free." },
  { name: "James", time: "5 days ago", text: "Affordable and reliable!" }
];


const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(2); 
  const [currentYear, setCurrentYear] = useState(2025);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear(currentYear - 1);
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear(currentYear + 1);
  };

  return (
    <Card className="w-1/3 p-4">
      <CardContent className="flex flex-col items-center">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold mb-4">
          Move day +
        </button>
        <div className="flex justify-between w-full mb-3">
          <Button onClick={prevMonth} className="text-sm bg-gray-200">◀</Button>
          <h2 className="text-lg font-semibold">{months[currentMonth]} {currentYear}</h2>
          <Button onClick={nextMonth} className="text-sm bg-gray-200">▶</Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-gray-600 font-semibold">
          {daysOfWeek.map((day) => <span key={day} className="text-sm">{day}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="w-10 h-10"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, day) => (
            <button
              key={day + 1}
              className={`p-2 w-10 h-10 rounded-full text-sm font-medium 
                ${selectedDate === day + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => setSelectedDate(day + 1)}
            >
              {day + 1}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const [userName, setUserName] = useState("Loading...");
  const [selectedDate, setSelectedDate] = useState(3);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userResponse = await fetch(`${API_BASE_URL}/users/me`, { credentials: 'include' });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserName(userData.name || "User");
        } else {
          setUserName("Guest");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold">Welcome, {userName}! Ready to start planning your move?</h1>
      <p className="text-gray-600 mt-2">Move in just a few steps</p>

     
      <div className="w-full flex gap-2 mt-4">
        {["Fill out your inventory", "Get quotes from movers", "Schedule your move date", "Move day"].map((step, index) => (
          <div key={index} className={`flex-1 h-2 rounded ${index < 0 ? 'bg-blue-600' : 'bg-gray-300'}`} />
        ))}
      </div>

      
      <div className="flex gap-8 mt-8">
        <Card className="w-1/2 p-4">
          <CardContent>
            <h2 className="text-lg font-semibold">Inventory</h2>
            <table className="w-full mt-4 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody>
                {sampleInventory.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>

     
      <div className="mt-8 w-1/3">
        <h2 className="text-lg font-semibold text-blue-600">Moving Companies</h2>
        <div className="mt-4 space-y-3">
          {sampleCompanies.map((company, index) => (
            <div key={index} className="p-3 border rounded-lg bg-white flex justify-between">
              <div>
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-gray-500 text-sm">{company.email}</p>
              </div>
              <Button className="bg-blue-500 text-white text-sm">Details</Button>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mt-12">
        <h2 className="text-lg font-semibold">Customer Reviews</h2>
        <div className="flex gap-6 mt-4">
          {sampleReviews.map((review, index) => (
            <Card key={index} className="w-1/3 p-4">
              <CardContent>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-gray-500 text-sm">{review.time}</p>
                <p className="mt-2 text-gray-600">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
