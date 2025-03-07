'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';


export default function Moves() {
  const [moves, setMoves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch('/api/moves');
        if (!response.ok) throw new Error('Failed to fetch moves');
        const data = await response.json();
        setMoves(data.moves);
      } catch (error) {
        console.error('Error fetching moves:', error);
      }
    };
    fetchMoves();
  }, []);

  const filteredMoves = moves.filter(move => {
    const matchesSearch = 
      move.from_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      move.to_address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || move.move_status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Moves</h1>
        <p className="text-gray-600 mt-1">Browse and bid on customer move requests</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063ff] focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Moves Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoves.map((move) => (
          <Link href={`/dashboard/find-move/${move.id}`} key={move.id}>
            <Card className="group hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    move.move_status.toLowerCase() === 'pending'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {move.move_status}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(move.estimated_price)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium text-gray-900">{move.from_address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium text-gray-900">{move.to_address}</p>
                    </div>
                  </div>

                  {move.distance && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Distance</span>
                      <span className="font-medium">{move.distance.toFixed(1)} km</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(move.move_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{move.move_time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end text-[#0063ff] group-hover:gap-2 transition-all">
                  <span className="text-sm font-medium">View Details</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}