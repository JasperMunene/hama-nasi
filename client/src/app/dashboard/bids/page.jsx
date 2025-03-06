'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import  Button  from '@/components/elements/button/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, CheckCircle, X, ArrowRight, Shield, Calendar, DollarSign, Truck, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function BidsPage() {
  const [selectedBidId, setSelectedBidId] = useState(null);

  const bids = [
    {
      id: 1,
      mover: {
        name: "Swift Movers Ltd",
        rating: 4.8,
        reviews: 128,
        verified: true,
        image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=400&h=400&auto=format&fit=crop&q=80"
      },
      price: "KES 25,000",
      timeEstimate: "4-5 hours",
      availableDate: "March 15, 2025",
      description: "Professional moving service with experienced team. We handle all items with care and provide full insurance coverage.",
      services: ["Packing", "Loading", "Transport", "Unloading", "Insurance"],
      status: "pending"
    },
    {
      id: 2,
      mover: {
        name: "Pro Movers Kenya",
        rating: 4.7,
        reviews: 96,
        verified: true,
        image: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?w=400&h=400&auto=format&fit=crop&q=80"
      },
      price: "KES 22,500",
      timeEstimate: "5-6 hours",
      availableDate: "March 16, 2025",
      description: "Efficient and reliable moving service. We specialize in residential moves and have a great track record.",
      services: ["Loading", "Transport", "Unloading", "Insurance"],
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Moving Bids</h1>
            <p className="text-gray-600 mt-1">Compare and choose the best mover for your needs</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Move Date:</span>
            <span className="font-medium">March 15, 2025</span>
          </div>
        </div>
      </div>

      {/* Move Summary */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Truck className="w-6 h-6 text-[#0063ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">Westlands, Nairobi</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">Kilimani, Nairobi</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget Range</p>
                  <p className="font-medium">KES 20,000 - 30,000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bids List */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bids ({bids.length})</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {bids.map((bid) => (
              <Card 
                key={bid.id} 
                className={`hover:border-blue-200 transition-colors ${
                  selectedBidId === bid.id ? 'border-[#0063ff]' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Mover Info */}
                    <div className="lg:w-1/3">
                      <div className="flex items-start gap-4">
                        <Image
                          src={bid.mover.image}
                          alt={bid.mover.name}
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{bid.mover.name}</h3>
                            {bid.mover.verified && (
                              <Shield className="w-4 h-4 text-[#0063ff]" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{bid.mover.rating}</span>
                            <span className="text-gray-500">({bid.mover.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bid Details */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Price Quote</p>
                          <p className="text-2xl font-bold text-gray-900">{bid.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time Estimate</p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <p className="font-medium">{bid.timeEstimate}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Available Date</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="font-medium">{bid.availableDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Services Included</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {bid.services.map((service, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{bid.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      View Profile
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      className="bg-[#0063ff] hover:bg-[#0055dd]"
                      onClick={() => setSelectedBidId(bid.id)}
                    >
                      Accept Bid
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="shortlisted">
            <div className="text-center py-12">
              <p className="text-gray-500">No shortlisted bids yet</p>
            </div>
          </TabsContent>

          <TabsContent value="declined">
            <div className="text-center py-12">
              <p className="text-gray-500">No declined bids</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}