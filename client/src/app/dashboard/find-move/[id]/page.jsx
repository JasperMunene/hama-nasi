'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import  Input  from '@/components/form/input/InputField';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Clock, ArrowLeft, DollarSign, Truck } from 'lucide-react';
import Link from 'next/link';

export default function MoveDetails() {
  const params = useParams();
  const [move, setMove] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidNotes, setBidNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const response = await fetch(`/api/move/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch move');
        const data = await response.json();
        setMove(data.move);
      } catch (error) {
        console.error('Error fetching move:', error);
      }
    };
    fetchMove();
  }, [params.id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/moves/${params.id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(bidAmount),
          notes: bidNotes,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit bid');
      
      // Reset form and show success message
      setBidAmount('');
      setBidNotes('');
      alert('Bid submitted successfully!');
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!move) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard/find-move" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Find Moves
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Move Details */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Move Details</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    move.move_status.toLowerCase() === 'pending'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {move.move_status}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium text-gray-900">{move.from_address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium text-gray-900">{move.to_address}</p>
                    </div>
                  </div>

                  {move.distance && (
                    <div className="flex items-center gap-4">
                      <Truck className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="font-medium text-gray-900">{move.distance.toFixed(1)} km</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Estimated Price</p>
                      <p className="font-medium text-gray-900">{formatPrice(move.estimated_price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(move.move_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium text-gray-900">{move.move_time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bid Form */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Your Bid</h2>
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bid Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Enter your bid"
                        className="pl-10"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <Textarea
                      value={bidNotes}
                      onChange={(e) => setBidNotes(e.target.value)}
                      placeholder="Add any additional notes"
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0063ff] hover:bg-[#0055dd]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Bid'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}