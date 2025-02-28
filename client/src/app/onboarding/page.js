'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBox } from 'react-icons/fa';
import { PiTruckThin } from 'react-icons/pi';
import Image from 'next/image';

const Onboarding = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(15);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setProgress(30);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    setLoading(true);
    setProgress(50);
    setTimeout(() => {
      if (selectedOption === 'Mover') {
        router.push('/onboarding/mover');
      } else if (selectedOption === 'Moving Company') {
        router.push('/onboarding/company');
      }
    }, 1000);
  };

  return (
    <div className="flex h-screen w-screen bg-[#F3F4FF] items-center justify-center px-24 py-12">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-1/2 space-y-8">
        <h1 className="text-5xl font-semibold text-[#1E1E1E]">Hama Nasi</h1>

        {/* Progress Bar */}
        <div className="w-40 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4548ED] rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 text-lg">Step 1 of 2</p>

        <h2 className="text-2xl font-medium text-[#1E1E1E]">How do you want to use Hama Nasi?</h2>
        
        {/* Selection Buttons */}
        <div className="flex gap-10">
          <button
            className={`w-56 h-56 flex flex-col items-center justify-center rounded-3xl border transition-all duration-300 text-white text-lg ${
              selectedOption === 'Mover' ? 'bg-[#001AFF]' : 'bg-[#1E40AF]'
            } hover:bg-[#0010CC] hover:shadow-xl border-transparent`}
            onClick={() => handleSelect('Mover')}
          >
            <FaBox className="text-white text-7xl mb-4" />
            <span className="font-medium">Mover</span>
          </button>
          
          <button
            className={`w-56 h-56 flex flex-col items-center justify-center rounded-3xl border transition-all duration-300 text-white text-lg ${
              selectedOption === 'Moving Company' ? 'bg-[#001AFF]' : 'bg-[#1E40AF]'
            } hover:bg-[#0010CC] hover:shadow-xl border-transparent`}
            onClick={() => handleSelect('Moving Company')}
          >
            <PiTruckThin className="text-white text-7xl mb-4" />
            <span className="font-medium">Moving Company</span>
          </button>
        </div>

        {/* Continue Button */}
        <button
          className={`mt-8 w-56 py-4 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center ${
            selectedOption 
              ? 'bg-[#001AFF] text-white hover:bg-[#0010CC] hover:shadow-lg' 
              : 'bg-[#9FB3FF] text-gray-500 opacity-80 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={!selectedOption || loading}
        >
          {loading ? (
            <span className="animate-spin border-4 border-white border-t-transparent w-6 h-6 rounded-full"></span>
          ) : (
            "Continue →"
          )}
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2 flex items-center justify-center">
        <Image 
          src="/6333.jpg" 
          alt="Onboarding Illustration"
          width={600} 
          height={600} 
          className="object-contain max-w-[550px]"
        />
      </div>
    </div>
  );
};

export default Onboarding;
