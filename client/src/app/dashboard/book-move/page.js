'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Package, ArrowRight, Info, Truck, Clock, CheckCircle2 } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const googleMapsLoader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
});

const houseTypes = [
  {
    id: 'bedsitter',
    name: 'Bedsitter',
    description: 'Perfect for single room setups',
    basePrice: 10000,
    ratePerKm: 1000,
    icon: Package
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Ideal for open-plan living',
    basePrice: 20000,
    ratePerKm: 1500,
    icon: Package
  },
  {
    id: 'one_bedroom',
    name: 'One Bedroom',
    description: 'Suitable for small households',
    basePrice: 30000,
    ratePerKm: 2000,
    icon: Package
  },
  {
    id: 'two_bedroom',
    name: 'Two Bedroom',
    description: 'Great for families',
    basePrice: 40000,
    ratePerKm: 2500,
    icon: Package
  }
];

export default function BookMove() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
  const [dateError, setDateError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

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
      setIsLoading(true);
      try {
        const moveDateObj = new Date(formData.moveDate);
        const move_date = moveDateObj.toISOString().split('T')[0];
        const move_time = moveDateObj.toTimeString().split(' ')[0];

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
          throw new Error('Failed to create move');
        }
        
        router.push(
          `/dashboard/book-move/success?fromLocation=${encodeURIComponent(formData.fromLocation)}&toLocation=${encodeURIComponent(formData.toLocation)}&moveDate=${encodeURIComponent(formData.moveDate)}&houseType=${encodeURIComponent(formData.houseType)}&price=${encodeURIComponent(price)}&distance=${encodeURIComponent(distance)}`
        );
      } catch (error) {
        console.error('Error creating move:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const canContinue = () => {
    if (step === 1) {
      return formData.fromLocation && formData.toLocation && distance !== null;
    } else if (step === 2) {
      const selectedDate = new Date(formData.moveDate);
      return formData.moveDate && selectedDate > new Date() && formData.houseType && !dateError;
    }
    return true;
  };

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
        disableDefaultUI: true,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7c93a3" }]
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#e8f0f9" }]
          }
        ]
      });

      const ds = new google.maps.DirectionsService();
      const dr = new google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#0063ff",
          strokeWeight: 4
        }
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
    setIsCalculating(true);

    const request = {
      origin: formData.fromLocation,
      destination: formData.toLocation,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      setIsCalculating(false);
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        const route = result.routes[0].legs[0];
        setDistance(route.distance.value / 1000);
        map.fitBounds(result.routes[0].bounds);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Move</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to schedule your move</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />
            <motion.div
              className="absolute left-0 top-1/2 h-0.5 bg-[#0063ff] -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={{ width: `${(step - 1) * 50}%` }}
              transition={{ duration: 0.5 }}
            />
            {[1, 2, 3].map((number) => (
              <motion.div
                key={number}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: number * 0.1 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    step >= number
                      ? 'bg-[#0063ff] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > number ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    number
                  )}
                </div>
                <span className="text-sm mt-2 font-medium text-gray-600">
                  {number === 1 ? 'Location' : number === 2 ? 'Details' : 'Review'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-xl shadow-gray-200/50">
              <CardContent className="p-8">
                {step === 1 && (
                  <div className="space-y-6">
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
                      disabled={!(formData.fromLocation && formData.toLocation) || isCalculating}
                      className={`w-full px-4 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all ${
                        !(formData.fromLocation && formData.toLocation) || isCalculating
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-[#0063ff] hover:bg-[#0055dd] shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isCalculating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          >
                            <Truck className="h-5 w-5" />
                          </motion.div>
                          Calculating Route...
                        </>
                      ) : (
                        <>
                          <Truck className="h-5 w-5" />
                          Calculate Route
                        </>
                      )}
                    </button>

                    <div
                      ref={mapRef}
                      className="w-full h-96 rounded-xl border overflow-hidden shadow-lg transition-all duration-300"
                      style={{
                        opacity: formData.fromLocation && formData.toLocation ? 1 : 0.5
                      }}
                    />

                    {distance && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="h-5 w-5 text-[#0063ff]" />
                            <span className="font-medium text-gray-900">Distance</span>
                          </div>
                          <p className="text-2xl font-bold text-[#0063ff]">
                            {distance.toFixed(1)} km
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900">Est. Duration</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            {Math.ceil(distance / 30)} hr
                          </p>
                        </div>
                      </motion.div>
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
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          <Info className="h-4 w-4" />
                          {dateError}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        House Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {houseTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <motion.div
                              key={type.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                formData.houseType === type.id
                                  ? 'border-[#0063ff] bg-blue-50 shadow-lg'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() =>
                                handleInputChange({
                                  target: { name: 'houseType', value: type.id }
                                })
                              }
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${
                                  formData.houseType === type.id
                                    ? 'bg-[#0063ff]'
                                    : 'bg-gray-100'
                                } flex items-center justify-center transition-colors`}>
                                  <Icon className={`h-6 w-6 ${
                                    formData.houseType === type.id
                                      ? 'text-white'
                                      : 'text-gray-500'
                                  }`} />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                                  <p className="text-sm text-gray-500">{type.description}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {price && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-[#0063ff] to-[#001a4d] p-6 rounded-xl text-white"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/10 rounded-xl">
                            <Package className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-200">Estimated Total</p>
                            <p className="text-3xl font-bold mt-1">
                              Ksh {price.toLocaleString()}
                            </p>
                            <p className="text-sm text-blue-200 mt-2">
                              Includes base fee and distance charges
                            </p>
                          </div>
                        </div>
                      </motion.div>
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
                    <div className="bg-gradient-to-r from-[#0063ff] to-[#001a4d] rounded-xl p-6 text-white">
                      <h3 className="text-xl font-semibold mb-6">Move Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-200">From</p>
                              <p className="font-medium">{formData.fromLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-200">To</p>
                              <p className="font-medium">{formData.toLocation}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-200">Moving Date & Time</p>
                              <p className="font-medium">
                                {new Date(formData.moveDate).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <Package className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-blue-200">House Type</p>
                              <p className="font-medium">
                                {houseTypes.find(t => t.id === formData.houseType)?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {price && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-200">Total Cost</p>
                              <p className="text-3xl font-bold mt-1">
                                Ksh {price.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-blue-200">Distance</p>
                              <p className="text-xl font-medium mt-1">
                                {distance.toFixed(1)} km
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-[#0063ff] mt-1" />
                        <div>
                          <p className="font-medium text-gray-900 mb-2">
                            Before You Confirm
                          </p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• We will match you with verified professional movers</li>
                            <li>• You will receive a confirmation email with booking details</li>
                            <li>• Our team will contact you to confirm move details</li>
                            <li>• Payment will be processed after move confirmation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-end gap-4">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 rounded-xl text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleContinue}
                    disabled={!canContinue() || isLoading}
                    className={`px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 transition-all ${
                      canContinue() && !isLoading
                        ? 'bg-[#0063ff] hover:bg-[#0055dd] shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Truck className="h-5 w-5" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {step === 3 ? 'Confirm Booking' : 'Continue'}
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}