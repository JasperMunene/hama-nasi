'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Home, Phone, MapPin } from 'lucide-react';

export default function Mover() {
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    houseType: ''
  });
  const [progress, setProgress] = useState(50);
  const [animateBackground, setAnimateBackground] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start background animation after component mounts
    setAnimateBackground(true);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleContinue = async () => {
    // Ensure all fields are provided
    if (formData.location && formData.phone && formData.houseType) {
      setProgress(80);
      try {
        const res = await fetch('/api/user', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          // Ensure cookies are sent along with the request
          credentials: 'include',
          body: JSON.stringify({
            location: formData.location,
            phone: formData.phone,
            house_type: formData.houseType  // Correct key to match backend expectation
          })
        });

        if (!res.ok) {
          console.error('Failed to update user details');
          return;
        }
        setProgress(100);
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const isFormValid = formData.location && formData.phone && formData.houseType;

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Animated Background with Content */}
      <div className="w-full md:w-1/2 bg-[#001a4d] relative overflow-hidden flex items-center justify-center p-8 md:p-0">
        <div className={`absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-[#0063ff]/20 transition-all duration-1500 ease-in-out ${animateBackground ? 'scale-110' : 'scale-100'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#0063ff]/10 transition-all duration-2000 delay-300 ease-in-out ${animateBackground ? 'scale-125' : 'scale-100'}`}></div>
        <div className="relative z-10 text-white max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tell Us More About <span className="text-blue-300">You</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            We will customize our services to match your specific needs and ensure a smooth relocation experience.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 flex-shrink-0" />
              <span className="text-blue-50">Personalized moving plans</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 flex-shrink-0" />
              <span className="text-blue-50">Accurate pricing based on your needs</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 flex-shrink-0" />
              <span className="text-blue-50">Professional movers for your home type</span>
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
      
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#001a4d]">Hama Nasi</h2>
            <p className="text-gray-500 mt-2">Your Relocation Partner</p>
          </div>
          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step 2 of 3</span>
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
            Tell Us More About You
          </h3>
          <div className="space-y-6 mb-10">
            {/* Location Field */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Your Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0063ff] focus:border-[#0063ff] bg-white text-gray-900"
                />
              </div>
            </div>
            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0063ff] focus:border-[#0063ff] bg-white text-gray-900"
                />
              </div>
            </div>
            {/* House Type Field */}
            <div className="space-y-2">
              <label htmlFor="houseType" className="block text-sm font-medium text-gray-700">
                House Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="houseType"
                  value={formData.houseType}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0063ff] focus:border-[#0063ff] bg-white text-gray-900 appearance-none"
                >
                  <option value="">Select your house type</option>
                  <option value="bedsitter">Bedsitter</option>
                  <option value="kibanda">Kibanda</option>
                  <option value="studio">Studio</option>
                  <option value="one_bedroom">One Bedroom</option>
                  <option value="two_bedroom">Two Bedroom</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`w-full py-5 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-300 ${
              isFormValid 
                ? 'bg-[#0063ff] hover:bg-[#0055dd] cursor-pointer shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!isFormValid}
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
