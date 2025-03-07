'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Input from '@/components/form/input/InputField';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  DollarSign,
  Truck,
  Package,
  CheckCircle2,
  Info,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function MoveDetails() {
  const params = useParams();
  const router = useRouter();
  const [move, setMove] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidNotes, setBidNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const response = await fetch(`/api/moves/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch move');
        const data = await response.json();
        setMove(data.move);
      } catch (error) {
        console.error('Error fetching move:', error);
        toast.error('Failed to load move details');
      }
    };
    fetchMove();
  }, [params.id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          move_id: parseInt(params.id),
          quote_amount: parseFloat(bidAmount),
          details: bidNotes,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit bid');

      // Reset form and show success message
      setBidAmount('');
      setBidNotes('');
      toast.success('Bid submitted successfully!', {
        description: 'The customer will be notified of your offer.',
      });
      router.push('/dashboard/find-move');
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error('Failed to submit bid', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!move) return null;

  // Disable bid input if the move status is "completed"
  const isMoveCompleted = move.move_status.toLowerCase() === 'completed';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard/find-move"
          className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Find Moves
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Move Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Move Details</h1>
                    <p className="text-gray-500 mt-1">ID: #{params.id}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${move.move_status.toLowerCase() === 'pending'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                    }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    {move.move_status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-medium text-gray-900 mt-1">{move.from_address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-medium text-gray-900 mt-1">{move.to_address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {move.distance && (
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Truck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Distance</p>
                          <p className="font-medium text-gray-900 mt-1">{move.distance.toFixed(1)} km</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-yellow-50 rounded-lg">
                        <DollarSign className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Estimated Price</p>
                        <p className="font-medium text-gray-900 mt-1">{formatPrice(move.estimated_price)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(move.move_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
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

            {/* Additional Info Card */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Moving Company Information</h2>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-900">Please ensure all belongings are packed securely and labeled with their destination room.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-900">Be sure to be ready at least 30 minutes before your scheduled moving time for a smooth start.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-900">Ensure any large or fragile items are properly noted so we can provide the best care during transport.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-900">Please confirm your address and contact details to avoid any delays on moving day.</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bid Form */}
          <div>
            <Card className="border-none shadow-lg sticky top-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Your Bid</h2>
                <form onSubmit={handleSubmitBid} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        disabled={isMoveCompleted}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      value={bidNotes}
                      onChange={(e) => setBidNotes(e.target.value)}
                      placeholder="Add any additional information about your services"
                      className="min-h-[120px] resize-none"
                      disabled={isMoveCompleted}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0063ff] hover:bg-[#0055dd] h-12 text-base"
                    disabled={isSubmitting || isMoveCompleted}
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
