'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Package, ArrowRight, Info } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/navigation';

const googleMapsLoader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
});

const houseTypes = [
  {
    id: 'bedsitter',
    name: 'Bedsitter',
    description: 'Compact single room setup',
    basePrice: 10000,
    ratePerKm: 1000
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Open combined living area',
    basePrice: 20000,
    ratePerKm: 1500
  },
  {
    id: 'one_bedroom',
    name: 'One Bedroom',
    description: 'Separate sleeping area',
    basePrice: 30000,
    ratePerKm: 2000
  },
  {
    id: 'two_bedroom',
    name: 'Two Bedroom',
    description: 'Extra space for comfort',
    basePrice: 40000,
    ratePerKm: 2500
  }
];

export default function BookMove() {
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    moveDate: '',
    houseType: '',
    additionalNotes: ''
  });
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const mapRef = useRef(null);
  const fromAutocompleteRef = useRef(null);
  const toAutocompleteRef = useRef(null);
  
  // Used for date validation error message.
  const [dateError, setDateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'moveDate') {
      const selectedDate = new Date(value);
      const now = new Date();

      if (selectedDate <= now) {
        setDateError('Please select a future date and time.');
      } else {
        // Validate business hours: 9:00 to 17:00
        const hour = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();
        if (hour < 9 || hour > 17 || (hour === 17 && minutes > 0)) {
          setDateError('Time must be between 9:00 and 17:00.');
        } else {
          setDateError('');
        }
      }
    }
  };

  const handleContinue = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submission: Create a new move via the /api/moves endpoint.
      try {
        // Parse the moveDate value into date and time strings.
        const moveDateObj = new Date(formData.moveDate);
        const move_date = moveDateObj.toISOString().split('T')[0]; // YYYY-MM-DD
        const move_time = moveDateObj.toTimeString().split(' ')[0]; // HH:MM:SS

        const payload = {
          from_address: formData.fromLocation,
          to_address: formData.toLocation,
          move_date,
          move_time,
          estimated_price: price,
          distance: distance
        };

        const res = await fetch('/api/moves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          console.error('Failed to create move');
          return;
        }
        // Navigate to dashboard after successful creation.
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } catch (error) {
        console.error('Error creating move:', error);
      }
    }
  };

  // Determines whether the "Continue" button should be enabled.
  const canContinue = () => {
    if (step === 1) {
      return formData.fromLocation && formData.toLocation && distance !== null;
    } else if (step === 2) {
      const selectedDate = new Date(formData.moveDate);
      return formData.moveDate && selectedDate > new Date() && formData.houseType && !dateError;
    }
    return true;
  };

  // Returns the current date and time in the proper format for datetime-local.
  const getMinDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    googleMapsLoader.load().then((google) => {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: -1.2921, lng: 36.8219 },
        zoom: 12,
        disableDefaultUI: true
      });

      const ds = new google.maps.DirectionsService();
      const dr = new google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true
      });

      setMap(mapInstance);
      setDirectionsService(ds);
      setDirectionsRenderer(dr);

      fromAutocompleteRef.current = new google.maps.places.Autocomplete(
        document.getElementById('fromLocation'),
        { types: ['geocode'] }
      );

      toAutocompleteRef.current = new google.maps.places.Autocomplete(
        document.getElementById('toLocation'),
        { types: ['geocode'] }
      );

      fromAutocompleteRef.current.addListener('place_changed', () => {
        const place = fromAutocompleteRef.current.getPlace();
        if (place.formatted_address) {
          setFormData(prev => ({ ...prev, fromLocation: place.formatted_address }));
        }
      });

      toAutocompleteRef.current.addListener('place_changed', () => {
        const place = toAutocompleteRef.current.getPlace();
        if (place.formatted_address) {
          setFormData(prev => ({ ...prev, toLocation: place.formatted_address }));
        }
      });
    });
  }, []);

  useEffect(() => {
    if (distance && formData.houseType) {
      const selectedType = houseTypes.find(t => t.id === formData.houseType);
      const totalPrice = selectedType.basePrice + (distance * selectedType.ratePerKm);
      setPrice(totalPrice);
    }
  }, [distance, formData.houseType]);

  const handleLocationDetails = async () => {
    if (!directionsService || !directionsRenderer) return;

    const request = {
      origin: formData.fromLocation,
      destination: formData.toLocation,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        const route = result.routes[0].legs[0];
        setDistance(route.distance.value / 1000);
        map.fitBounds(result.routes[0].bounds);
      }
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col p-8 overflow-hidden">
      {/* Header */}
      <div className="w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Your Move</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to schedule your move</p>
      </div>

      {/* Progress Steps */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-[#0063ff] -translate-y-1/2"
            style={{ width: `${(step - 1) * 50}%` }}
          />
          {[1, 2, 3].map((number) => (
            <div key={number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= number ? 'bg-[#0063ff] text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {number}
              </div>
              <span className="text-sm mt-2 font-medium text-gray-600">
                {number === 1 ? 'Location' : number === 2 ? 'Details' : 'Review'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full flex-grow">
        <Card className="border-none shadow-xl shadow-gray-200/50 h-full">
          <CardContent className="p-8 h-full flex flex-col justify-between">
            <div className="flex-grow">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Moving From Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moving From
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="fromLocation"
                        type="text"
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleInputChange}
                        placeholder="Enter pickup location"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Moving To Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moving To
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="toLocation"
                        type="text"
                        name="toLocation"
                        value={formData.toLocation}
                        onChange={handleInputChange}
                        placeholder="Enter destination location"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleLocationDetails}
                    disabled={!(formData.fromLocation && formData.toLocation)}
                    className={`px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 ${
                      !(formData.fromLocation && formData.toLocation)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Calculate Distance
                  </button>

                  {/* Map Container */}
                  <div
                    ref={mapRef}
                    className="w-full h-96 rounded-xl border overflow-hidden"
                    style={{ display: formData.fromLocation && formData.toLocation ? 'block' : 'none' }}
                  />

                  {distance && (
                    <div className="flex gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="font-medium">Distance:</span> {distance.toFixed(2)} km
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="font-medium">Price Estimate Available in Next Step</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moving Date & Time
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        name="moveDate"
                        value={formData.moveDate}
                        onChange={handleInputChange}
                        min={getMinDateTime()}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
                      />
                    </div>
                    {dateError && (
                      <p className="text-red-500 text-sm mt-1">{dateError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      House Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {houseTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.houseType === type.id
                              ? 'border-[#0063ff] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() =>
                            handleInputChange({
                              target: { name: 'houseType', value: type.id }
                            })
                          }
                        >
                          <h3 className="font-medium text-gray-900">{type.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {price && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-700">
                            Estimated Total: Ksh {price.toLocaleString()}
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            (Includes base fee and distance charges)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Any special requirements or instructions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Move Summary</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#0063ff] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium">{formData.fromLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#0063ff] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium">{formData.toLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-[#0063ff] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Moving Date & Time</p>
                          <p className="font-medium">{formData.moveDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-[#0063ff] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">House Type</p>
                          <p className="font-medium">
                            {houseTypes.find(t => t.id === formData.houseType)?.name}
                          </p>
                        </div>
                      </div>
                      {price && (
                        <div className="flex items-start gap-3">
                          <Package className="h-5 w-5 text-[#0063ff] mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Estimated Cost</p>
                            <p className="font-medium">Ksh {price.toLocaleString()}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Includes all charges and taxes
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-gray-400 mt-1" />
                      <p className="text-sm text-gray-500">
                        By proceeding, you agree to our terms of service and privacy policy.
                        We will match you with the best available movers for your needs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-end">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mr-4 px-6 py-3 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={async () => {
                  if (step < 3) {
                    setStep(step + 1);
                  } else {
                    // Final submission: Create a move via the /api/moves endpoint.
                    try {
                      // Extract move date and time parts.
                      const moveDateObj = new Date(formData.moveDate);
                      const move_date = moveDateObj.toISOString().split('T')[0]; // YYYY-MM-DD
                      const move_time = moveDateObj.toTimeString().split(' ')[0]; // HH:MM:SS

                      const payload = {
                        from_address: formData.fromLocation,
                        to_address: formData.toLocation,
                        move_date,
                        move_time,
                        estimated_price: price,
                        distance: distance
                      };

                      const res = await fetch('/api/moves', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                      });

                      if (!res.ok) {
                        console.error('Failed to create move');
                        return;
                      }
                      router.push('/dashboard');
                    } catch (error) {
                      console.error('Error creating move:', error);
                    }
                  }
                }}
                disabled={!canContinue()}
                className={`px-6 py-3 rounded-xl text-white flex items-center gap-2 ${
                  canContinue() ? 'bg-[#0063ff] hover:bg-[#0055dd]' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {step === 3 ? 'Confirm Booking' : 'Continue'}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
