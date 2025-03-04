'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import  Button  from '@/components/elements/button/Button';
import  Input  from '@/components/form/input/InputField';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(3);
  const inventoryItems = [
    { item: 'Bed', category: 'Furniture', condition: 'New' },
    { item: 'Dresser', category: 'Furniture', condition: 'New' },
    { item: 'Dining Table', category: 'Furniture', condition: 'New' },
    { item: 'Dining Chairs', category: 'Furniture', condition: 'Used' },
    { item: 'TV', category: 'Appliances', condition: 'New' },
    { item: 'Refrigerator', category: 'Appliances', condition: 'New' },
    { item: 'Microwave', category: 'Appliances', condition: 'New' },
  ];

  const companies = [
    { name: 'Swift Movers', email: 'hello@swiftmovers.com' },
    { name: 'Fast Movers', email: 'contact@fastmovers.com' },
    { name: 'Shift Movers', email: 'info@shiftmovers.com' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold">Welcome, Sarah! Ready to start planning your move?</h1>
      <p className="text-gray-600 mt-2">Move in just a few steps</p>

      {/* Progress Bar */}
      <div className="w-full flex gap-2 mt-4">
        <div className="w-1/4 h-2 bg-blue-600"></div>
        <div className="w-1/4 h-2 bg-gray-300"></div>
        <div className="w-1/4 h-2 bg-gray-300"></div>
        <div className="w-1/4 h-2 bg-gray-300"></div>
      </div>

      {/* Inventory & Calendar */}
      <div className="flex gap-8 mt-8">
        <Card className="w-1/2 p-4">
          <CardContent>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Inventory</h2>
              <Button className="bg-blue-600 text-white px-3 py-1">See all</Button>
            </div>
            <table className="w-full mt-4 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.item}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="w-1/3 p-4">
          <CardContent>
            <h2 className="text-lg font-semibold mb-3">Move day</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(30).keys()].map((day) => (
                <Button
                  key={day + 1}
                  className={`p-2 w-10 h-10 rounded-lg ${
                    selectedDate === day + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setSelectedDate(day + 1)}
                >
                  {day + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moving Companies */}
      <div className="mt-8 w-1/3">
        <h2 className="text-lg font-semibold text-blue-600">Moving Companies</h2>
        <Input className="w-full p-2 mt-2 border rounded-lg" placeholder="Search for Companies" />
        <div className="mt-4 space-y-3">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-white">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <div>
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-gray-500 text-sm">{company.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold">Customer Review</h2>
        <p className="text-gray-500">Eum fuga consequentur utadsi et.</p>
        <div className="flex gap-6 mt-4">
          <Card className="w-1/3 p-4">
            <CardContent>
              <h3 className="font-semibold">Luka</h3>
              <p className="text-gray-500 text-sm">2 days ago</p>
              <p className="mt-2 text-gray-600">Lorem Ipsum is simply dummy text.</p>
            </CardContent>
          </Card>
          <Card className="w-1/3 p-4">
            <CardContent>
              <h3 className="font-semibold">Sofia</h3>
              <p className="text-gray-500 text-sm">2 days ago</p>
              <p className="mt-2 text-gray-600">Lorem Ipsum is simply dummy text.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
