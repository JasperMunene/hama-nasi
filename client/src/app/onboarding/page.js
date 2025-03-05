'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Truck, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Onboarding() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(15);
  const [animateBackground, setAnimateBackground] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start background animation after component mounts
    setAnimateBackground(true);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setProgress(30);
  };

  const handleContinue = async () => {
    if (!selectedOption) return;

    try {
      const res = await fetch('/api/user/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        // Include cookies so that the backend can identify the user.
        credentials: 'include',
        body: JSON.stringify({ role: selectedOption })
      });

      if (!res.ok) {
        console.error('Failed to update user role');
        return;
      }

      // Update progress and navigate after a short delay.
      setProgress(50);
      setTimeout(() => {
        if (selectedOption === 'Mover') {
          router.push('/onboarding/mover');
        } else if (selectedOption === 'Moving Company') {
          router.push('/onboarding/company');
        }
      }, 500);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Animated background with content */}
      <div className="w-full md:w-1/2 bg-[#001a4d] relative overflow-hidden flex items-center justify-center p-8 md:p-0">
        {/* Animated circles in background */}
        <div className={`absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-[#0063ff]/20 transition-all duration-1500 ease-in-out ${animateBackground ? 'scale-110' : 'scale-100'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#0063ff]/10 transition-all duration-2000 delay-300 ease-in-out ${animateBackground ? 'scale-125' : 'scale-100'}`}></div>
        
        {/* Content */}
        <div className="relative z-10 text-white max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Begin Your <span className="text-blue-300">Journey</span> With Hama Nasi
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of satisfied customers who have experienced seamless relocations with our premium moving services.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 flex-shrink-0" />
              <span className="text-blue-50">Professional and reliable service</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 flex-shrink-0" />
              <span className="text-blue-50">Transparent pricing with no hidden fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 flex-shrink-0" />
              <span className="text-blue-50">Customized solutions for your needs</span>
            </div>
          </div>
          
          <div className="hidden md:block relative h-64 w-full max-w-sm mx-auto md:mx-0">
            <Image 
              src="https://cdn.prod.website-files.com/66a6ba5e0799a98c7cb5e8e2/66aa5c42db4da1d9b6e4d98e_Illustation-2.png"
              alt="Moving illustration" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
      {/* Right side - Selection form */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#001a4d]">Hama Nasi</h2>
            <p className="text-gray-500 mt-2">Your Relocation Partner</p>
          </div>
          
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step 1 of 3</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-sm overflow-hidden">
              <div 
                className="h-full bg-[#0063ff] transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            How would you like to use Hama Nasi?
          </h3>
          
          <div className="space-y-6 mb-10">
            <button
              className={`w-full relative p-6 rounded-xl border-2 transition-all duration-300 flex items-center ${
                selectedOption === 'Mover' 
                  ? 'border-[#0063ff] bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleSelect('Mover')}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 transition-all duration-300 ${
                selectedOption === 'Mover' 
                  ? 'bg-[#0063ff]' 
                  : 'bg-[#001a4d]'
              }`}>
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-800 mb-1">I Need to Move</h4>
                <p className="text-gray-500">
                  I am looking for professional moving services
                </p>
              </div>
              {selectedOption === 'Mover' && (
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                  <CheckCircle2 className="h-6 w-6 text-[#0063ff]" />
                </div>
              )}
            </button>

            <button
              className={`w-full relative p-6 rounded-xl border-2 transition-all duration-300 flex items-center ${
                selectedOption === 'Moving Company' 
                  ? 'border-[#0063ff] bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleSelect('Moving Company')}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 transition-all duration-300 ${
                selectedOption === 'Moving Company' 
                  ? 'bg-[#0063ff]' 
                  : 'bg-[#001a4d]'
              }`}>
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-800 mb-1">I Provide Moving Services</h4>
                <p className="text-gray-500">
                  I want to join as a service provider
                </p>
              </div>
              {selectedOption === 'Moving Company' && (
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                  <CheckCircle2 className="h-6 w-6 text-[#0063ff]" />
                </div>
              )}
            </button>
          </div>

          <button
            className={`w-full py-5 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-300 ${
              selectedOption 
                ? 'bg-[#0063ff] hover:bg-[#0055dd] cursor-pointer shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!selectedOption}
          >
            Continue to Next Step
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <p className="text-center text-gray-500 mt-6 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
