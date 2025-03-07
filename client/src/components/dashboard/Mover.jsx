'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Package, Truck, Star, ChevronRight, Plus } from 'lucide-react';

export default function MoverDash() {
  const [recentMove, setRecentMove] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [loadingMoves, setLoadingMoves] = useState(true);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [userName, setUserName] = useState(''); 
  const [movers, setMovers] = useState([]);

  // Hardcoded recommended movers for now.
  

  useEffect(() => {
    // Fetch current user info from /api/user
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          // Assuming your API returns a field named "name"
          setUserName(data.name);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch moves
    const fetchMoves = async () => {
      try {
        const res = await fetch('/api/move', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          if (data.moves && data.moves.length > 0) {
            // Set the most recent move (assumes moves are sorted by creation)
            setRecentMove(data.moves[data.moves.length - 1]);
          }
        } else {
          console.error('Failed to fetch moves');
        }
      } catch (error) {
        console.error('Error fetching moves:', error);
      } finally {
        setLoadingMoves(false);
      }
    };

    // Fetch user inventory
    const fetchInventory = async () => {
      try {
        const res = await fetch('/api/inventory/', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data.inventory)
          setUserInventory(data.inventory);
        } else {
          console.error('Failed to fetch user inventory');
        }
      } catch (error) {
        console.error('Error fetching user inventory:', error);
      } finally {
        setLoadingInventory(false);
      }
    };

    const fetchMovers = async () => {
      try {
        const res = await fetch('/api/movers', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          // Sort movers by rating descending and take the top 4
          const sortedMovers = data.movers.sort((a, b) => b.rating - a.rating).slice(0, 4);
          setMovers(sortedMovers);
        } else {
          console.error('Failed to fetch movers');
        }
      } catch (error) {
        console.error('Error fetching movers:', error);
      }
    };

    fetchUser();
    fetchMoves();
    fetchInventory();
    fetchMovers();
  }, []);

  // Format the move date (e.g. "March 15")
  const formatMoveDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  // Calculate days left until the move.
  const daysLeft = (moveDateString) => {
    const moveDate = new Date(moveDateString);
    const today = new Date();
    const diffTime = moveDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8 overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
        <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userName || 'User'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">Let's plan your next move</p>
        </div>
        <Link
          href="/dashboard/book-move"
          className="flex items-center gap-2 px-4 py-2 bg-[#0063ff] text-white rounded-xl hover:bg-[#0055dd] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Book a Move
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-[#0063ff] to-[#001a4d] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Next Move</p>
                <h3 className="text-2xl font-bold mt-1">
                  {recentMove ? formatMoveDate(recentMove.move_date) : 'N/A'}
                </h3>
                {recentMove && (
                  <p className="text-sm text-blue-200 mt-1">
                    In {daysLeft(recentMove.move_date)} day{daysLeft(recentMove.move_date) !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <Calendar className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Items</p>
                <h3 className="text-2xl font-bold mt-1">{userInventory.length}</h3>
                <p className="text-sm text-gray-400 mt-1">In inventory</p>
              </div>
              <Package className="h-10 w-10 text-[#0063ff]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Moving Distance</p>
                <h3 className="text-2xl font-bold mt-1">
                  {recentMove && recentMove.distance ? recentMove.distance.toFixed(2) + ' km' : 'N/A'}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Estimated</p>
              </div>
              <Truck className="h-10 w-10 text-[#0063ff]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Moves */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Upcoming Moves</h2>
                <Link href="/dashboard/moves" className="text-[#0063ff] hover:text-[#0055dd] text-sm flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              {loadingMoves ? (
                <p>Loading moves...</p>
              ) : recentMove ? (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#0063ff]" />
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium">{recentMove.from_address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium">{recentMove.to_address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {recentMove.move_status}
                      </span>
                      <p className="mt-2 text-sm text-gray-500">
                        {recentMove.estimated_price ? recentMove.estimated_price.toLocaleString() : 'N/A'} Ksh
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No moves found.</p>
              )}
            </CardContent>
          </Card>

          {/* Your Inventory Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Inventory</h2>
                <Link href="/dashboard/inventory" className="text-[#0063ff] hover:text-[#0055dd] text-sm flex items-center">
                  Manage Inventory <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              {loadingInventory ? (
                <p>Loading inventory...</p>
              ) : userInventory && userInventory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-4">Item ID</th>
                        <th className="pb-4">Item</th>
                        
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {userInventory.map((inv) => (
                        <tr key={inv.id} className="border-t border-gray-100">
                          <td className="py-3">{inv.id}</td>
                          <td className="py-3">{inv.item_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No inventory found.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Recommended Movers */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Recommended Movers</h2>
              <div className="space-y-4">
                {movers.map((mover, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Image
                      src={mover.image}
                      alt={mover.company_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{mover.company_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{mover.rating}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
