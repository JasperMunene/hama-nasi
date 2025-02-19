'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBox } from 'react-icons/fa';
import { PiTruckThin } from 'react-icons/pi';
import Image from 'next/image';

const onboarding = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(15);
  const router = useRouter();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setProgress(30);
  };

  const handleContinue = () => {
    setProgress(50);
    setTimeout(() => {
      if (selectedOption === 'Mover') {
        router.push('/onboarding/mover');
      } else if (selectedOption === 'Moving Company') {
        router.push('/onboarding/company');
      }
    }, 500);
  };

  return (
    <div className="flex h-screen w-screen bg-[#ECEDFD]">
      <div className="flex flex-col justify-center px-24 w-1/2">
        <h1 className="text-4xl font-bold mb-6">Hama Nasi</h1>
        <div className="w-48 h-2 bg-gray-300 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-[#4548ED] transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <h2 className="text-2xl font-semibold mb-8">How do you want to use Hama Nasi?</h2>

        <div className="flex gap-6">
          <button
            className={`w-44 h-44 flex flex-col items-center justify-center rounded-lg transition ${
              selectedOption === 'Mover' ? 'bg-[#4548ED] text-white' : 'bg-[#4548ED] text-[#FFFFFF]'
            }`}
            onClick={() => handleSelect('Mover')}
          >
            <FaBox className="text-white text-6xl stroke-[7] fill-none" />
            <span className="text-lg font-semibold">Mover</span>
          </button>

          <button
            className={`w-44 h-44 flex flex-col items-center justify-center rounded-lg transition ${
              selectedOption === 'Moving Company' ? 'bg-[#4548ED] text-white' : 'bg-[#4548ED] text-[#FFFFFF]'
            }`}
            onClick={() => handleSelect('Moving Company')}
          >
            <PiTruckThin className="text-5xl  mb-2" />
            <span className="text-lg font-semibold">Moving Company</span>
          </button>
        </div>

        <button
          className={`mt-10 w-72 py-4 rounded-lg text-lg font-semibold transition ${
            selectedOption ? 'bg-[#7D97F4] text-white' : 'bg-[#7D97F4] text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={!selectedOption}
        >
          Continue →
        </button>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <Image 
          src="/courier-delivered-boxes-businessman.png" 
          alt="Ongeza"
          width={400} 
          height={500} 
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default onboarding;

