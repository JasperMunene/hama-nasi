'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Mover = () => {
  const [location, setLocation] = useState('');
  const [houseType, setHouseType] = useState('');
  const [progress, setProgress] = useState(50);
  const router = useRouter();

  const handleContinue = () => {
    console.log('Location:', location);
    console.log('House Type:', houseType);
  };

  return (
    <div className="flex h-screen w-screen bg-[#ECEDFD] items-start justify-center pt-10">
      <div className="flex flex-col px-16 py-8 w-[40%]">
        <h1 className="text-2xl font-bold mb-2 text-[#4548ED]">Hama Nasi</h1>
        <p className="text-sm text-gray-600 mb-2">2 of 2</p>
        <div className="w-40 h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-[#4548ED] transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-[#4548ED]">Tell us more about you</h2>

        <div className="mb-4">
          <label htmlFor="location" className="block text-md font-medium mb-2">Where do you live?</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4548ED]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="houseType" className="block text-md font-medium mb-2">What house do you currently live in?</label>
          <select
            id="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4548ED]"
          >
            <option value="">Select House</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="studio">Studio</option>
            <option value="one_bedroom">One Bedroom</option>
            <option value="two_bedroom">Two Bedroom</option>
          </select>
        </div>

        <button
          onClick={handleContinue}
          className="w-40 py-2 text-md font-semibold bg-[#7D97F4] text-white rounded-lg transition-all duration-300 hover:bg-[#637BCC] active:bg-[#4E61A5] flex items-center justify-center gap-2"
        >
          Continue →
        </button>
      </div>
      
      <div className="w-[40%] flex items-center justify-center">
        <Image 
          src="/6333.jpg" 
          alt="Moving Illustration"
          width={350} 
          height={450} 
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Mover;
