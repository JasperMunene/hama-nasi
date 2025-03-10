'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/elements/button/Button';

import { 
  MapPin, 
  Calendar, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Phone,
  Mail,
  MessageSquare,
  FileText,
  AlertCircle,
  Star,
  Shield
} from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Spinner from '@/components/elements/Spinner';

export default function MovePage() {
  const [moveDetails, setMoveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchMove() {
      try {
        const res = await fetch(`/api/move/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch move details');
        }
        const data = await res.json();
        setMoveDetails(data.move);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMove();
  }, [params.id]);

  const timeline = [
    {
      title: "Booking Confirmed",
      description: "Your move has been scheduled",
      time: "Feb 28, 2025 - 10:30 AM",
      completed: true
    },
    {
      title: "Inventory Approved",
      description: "Mover has reviewed and accepted your inventory",
      time: "Mar 1, 2025 - 2:15 PM",
      completed: true
    },
    {
      title: "Moving in Progress",
      description: "Movers are currently handling your items",
      time: "Mar 15, 2025 - 9:00 AM",
      completed: false
    },
    {
      title: "Delivery",
      description: "Items will be delivered to destination",
      time: "Mar 15, 2025 - 2:00 PM",
      completed: false
    }
  ];

  const inventory = [
    { category: "Living Room", items: ["3-Seater Sofa", "Coffee Table", "TV Stand", "Floor Lamp"] },
    { category: "Bedroom", items: ["Queen Size Bed", "Wardrobe", "Dresser", "Bedside Tables (2)"] },
    { category: "Kitchen", items: ["Refrigerator", "Microwave", "Dining Table Set", "Kitchen Cabinets"] }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  if (error || !moveDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error || "Move details not available"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Move #{moveDetails.id}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(moveDetails.move_status)}`}>
                {moveDetails.move_status}
              </span>
            </div>
            <p className="text-gray-600">Scheduled for {formatDate(moveDetails.move_date)}</p>
          </div>
          <div className="flex gap-3">
            {/* <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Download Invoice
            </Button> */}
            {/* <Button className="bg-[#0063ff] hover:bg-[#0055dd] flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contact Support
            </Button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Move Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Move Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-[#0063ff]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pickup Location</p>
                        <p className="font-medium">{moveDetails.from_address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivery Location</p>
                        <p className="font-medium">{moveDetails.to_address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-medium">{formatDate(moveDetails.move_date)}</p>
                        <p className="text-sm text-gray-500">{moveDetails.move_time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Package className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Move Size</p>
                        <p className="font-medium">{moveDetails.items} items</p>
                        <p className="text-sm text-gray-500">{moveDetails.distance} km</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Move Timeline</h2>
                <div className="relative">
                  {timeline.map((step, index) => (
                    <div key={index} className="flex gap-4 pb-8 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {step.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        {index !== timeline.length - 1 && (
                          <div className={`w-0.5 h-full mt-2 ${
                            step.completed ? 'bg-green-200' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{step.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Move Inventory</h2>
                <div className="space-y-6">
                  {inventory.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-900 mb-3">{category.category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                          >
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Mover Details */}
            {/* <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Moving Company</h2>
                <div className="flex items-start gap-4 mb-6">
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{moveDetails.mover.name}</h3>
                      {moveDetails.mover.verified && (
                        <Shield className="w-4 h-4 text-[#0063ff]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{moveDetails.mover.rating}</span>
                      <span className="text-gray-500">({moveDetails.mover.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{moveDetails.mover.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{moveDetails.mover.email}</span>
                  </div>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  View Company Profile
                </Button>
              </CardContent>
            </Card> */}

            {/* Important Notes */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Important Notes</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      Please ensure all items are packed and ready before the movers arrive.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Keep valuable items and important documents with you during the move.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
