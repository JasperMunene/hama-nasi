'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FaTruckMoving, FaBox } from 'react-icons/fa';
import Image from 'next/image';

const Onboarding = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(15); // Initial progress at 15%
  const router = useRouter();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setProgress(30); // Update progress when user selects an option
  };

  const handleContinue = () => {
    setProgress(50); // Update progress when clicking continue

    setTimeout(() => {
      if (selectedOption === 'Mover') {
        router.push('/onboarding/mover'); 
      } else if (selectedOption === 'Moving Company') {
        router.push('/onboarding/company');
      }
    }, 500); // Small delay to show progress animation
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Left Section */}
      <div className="flex flex-col justify-center px-24 w-1/2">
        <h1 className="text-4xl font-bold mb-6">Hama Nasi</h1>

        {/* Progress Bar */}
        <div className="w-48 h-2 bg-gray-300 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-[#4548ED] transition-all duration-300" 
            style={{ width: `${progress}%` }} // Dynamic width update
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-semibold mb-8">How do you want to use Hama Nasi?</h2>

        {/* Options */}
        <div className="flex gap-6">
          <button
            className={`w-44 h-44 flex flex-col items-center justify-center rounded-lg transition ${
              selectedOption === 'Mover' ? 'bg-[#3336D6]' : 'bg-[#4548ED]'
            } text-white`}
            onClick={() => handleSelect('Mover')}
          >
            <FaBox className="text-5xl mb-2" />
            <span className="text-lg font-semibold">Mover</span>
          </button>

          <button
            className={`w-44 h-44 flex flex-col items-center justify-center rounded-lg transition ${
              selectedOption === 'Moving Company' ? 'bg-[#3336D6]' : 'bg-[#4548ED]'
            } text-white`}
            onClick={() => handleSelect('Moving Company')}
          >
            <FaTruckMoving className="text-5xl mb-2" />
            <span className="text-lg font-semibold">Moving Company</span>
          </button>
        </div>

        {/* Continue Button */}
        <button
          className={`mt-10 w-72 py-4 rounded-lg text-lg font-semibold transition ${
            selectedOption ? 'bg-[#4548ED] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={!selectedOption}
        >
          Continue →
        </button>
      </div>

     
    </div>
  );
};

export default Onboarding;
