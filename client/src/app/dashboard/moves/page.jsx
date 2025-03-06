'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/elements/button/Button';
import Input from '@/components/form/input/InputField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Package, Search, ArrowRight, ArrowUpDown, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Spinner from '@/components/elements/Spinner';

export default function MovesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch moves data from the API when the component mounts.
  useEffect(() => {
    async function fetchMoves() {
      try {
        const res = await fetch('/api/move');
        if (!res.ok) {
          throw new Error('Failed to fetch moves');
        }
        const data = await res.json();
        setMoves(data.moves);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMoves();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Format price by using approved_price if available, otherwise estimated_price.
  const formatPrice = (move) => {
    const price = move.approved_price || move.estimated_price;
    return `KES ${price}`;
  };

  // Format the distance to one decimal place.
  const formatDistance = (distance) => {
    return `${Number(distance).toFixed(1)} km`;
  };

  // Format the move date to "Month Day, Year" (e.g., February 28, 2025).
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter moves by checking the from and to addresses.
  const filteredMoves = moves.filter(move =>
    move.from_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    move.to_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Moves</h1>
            <p className="text-gray-600 mt-1">Track and manage all your moving activities</p>
          </div>
          <Button className="bg-[#0063ff] hover:bg-[#0055dd]" asChild>
            <a href="/dashboard/book-move">Book New Move</a>
          </Button>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Search and Filters */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search moves by location..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort by Date
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Moves List */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Moves</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {/* All Moves Tab */}
            <TabsContent value="all" className="space-y-4">
              {filteredMoves.map((move) => (
                <Card key={move.id} className="hover:border-blue-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Move Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(move.move_status)}`}>
                            {getStatusIcon(move.move_status)}
                            {move.move_status}
                          </span>
                          <span className="text-lg font-semibold text-gray-900">{formatPrice(move)}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#0063ff] mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">From</p>
                                <p className="font-medium">{move.from_address}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-green-500 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">To</p>
                                <p className="font-medium">{move.to_address}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Moving Date</p>
                                <p className="font-medium">{formatDate(move.move_date)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Package className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Distance</p>
                                <p className="font-medium">{formatDistance(move.distance)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button variant="outline" className="w-full md:w-auto" asChild>
                        <a href={`/dashboard/moves/${move.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Pending Moves Tab */}
            <TabsContent value="pending">
              {filteredMoves
                .filter(move => move.move_status.toLowerCase() === 'pending')
                .map((move) => (
                  <Card key={move.id} className="hover:border-blue-200 transition-colors mb-4">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(move.move_status)}`}>
                              {getStatusIcon(move.move_status)}
                              {move.move_status}
                            </span>
                            <span className="text-lg font-semibold text-gray-900">{formatPrice(move)}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#0063ff] mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">From</p>
                                  <p className="font-medium">{move.from_address}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">To</p>
                                  <p className="font-medium">{move.to_address}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Moving Date</p>
                                  <p className="font-medium">{formatDate(move.move_date)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Distance</p>
                                  <p className="font-medium">{formatDistance(move.distance)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full md:w-auto" asChild>
                          <a href={`/dashboard/moves/${move.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            {/* In Progress Moves Tab */}
            <TabsContent value="in-progress">
              {filteredMoves
                .filter(move => move.move_status.toLowerCase() === 'in progress')
                .map((move) => (
                  <Card key={move.id} className="hover:border-blue-200 transition-colors mb-4">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(move.move_status)}`}>
                              {getStatusIcon(move.move_status)}
                              {move.move_status}
                            </span>
                            <span className="text-lg font-semibold text-gray-900">{formatPrice(move)}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#0063ff] mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">From</p>
                                  <p className="font-medium">{move.from_address}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">To</p>
                                  <p className="font-medium">{move.to_address}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Moving Date</p>
                                  <p className="font-medium">{formatDate(move.move_date)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Distance</p>
                                  <p className="font-medium">{formatDistance(move.distance)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full md:w-auto" asChild>
                          <a href={`/dashboard/moves/${move.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            {/* Completed Moves Tab */}
            <TabsContent value="completed">
              {filteredMoves
                .filter(move => move.move_status.toLowerCase() === 'completed')
                .map((move) => (
                  <Card key={move.id} className="hover:border-blue-200 transition-colors mb-4">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(move.move_status)}`}>
                              {getStatusIcon(move.move_status)}
                              {move.move_status}
                            </span>
                            <span className="text-lg font-semibold text-gray-900">{formatPrice(move)}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#0063ff] mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">From</p>
                                  <p className="font-medium">{move.from_address}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">To</p>
                                  <p className="font-medium">{move.to_address}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Moving Date</p>
                                  <p className="font-medium">{formatDate(move.move_date)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Distance</p>
                                  <p className="font-medium">{formatDistance(move.distance)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full md:w-auto" asChild>
                          <a href={`/dashboard/moves/${move.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
