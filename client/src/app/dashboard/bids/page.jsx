'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/elements/button/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, DollarSign } from 'lucide-react';
import Image from 'next/image';

export default function BidsPage() {
  const [selectedBidId, setSelectedBidId] = useState(null);
  const [latestMove, setLatestMove] = useState(null);
  const [quotes, setQuotes] = useState([]);
  // State to store a mapping of mover id to company name
  const [moverNames, setMoverNames] = useState({});
  const router = useRouter();

  // Fetch latest move
  useEffect(() => {
    fetch('/api/move')
      .then((response) => response.json())
      .then((data) => {
        const moves = data.moves;
        // Determine the latest move by comparing created_at timestamps
        const latest = moves.reduce((prev, curr) => {
          return new Date(curr.created_at) > new Date(prev.created_at) ? curr : prev;
        }, moves[0]);
        setLatestMove(latest);
      })
      .catch((error) => console.error('Error fetching moves:', error));
  }, []);

  // Once the latest move is fetched, retrieve its related quotes
  useEffect(() => {
    if (latestMove) {
      fetch(`/api/moves/${latestMove.id}/quotes`)
        .then((res) => res.json())
        .then((data) => {
          setQuotes(data.quotes);
        })
        .catch((error) => console.error('Error fetching quotes:', error));
    }
  }, [latestMove]);

  // After quotes are loaded, fetch mover details for each unique mover id
  useEffect(() => {
    if (quotes.length > 0) {
      // Get unique mover ids from the quotes
      const uniqueMoverIds = [...new Set(quotes.map((quote) => quote.mover_id))];
      Promise.all(
        uniqueMoverIds.map((id) =>
          fetch(`/api/movers/${id}`)
            .then((res) => res.json())
            .then((data) => [id, data.company_name])
        )
      )
        .then((results) => {
          // Build a mapping of mover id to company name
          const namesMap = results.reduce((acc, [id, companyName]) => {
            acc[id] = companyName;
            return acc;
          }, {});
          setMoverNames(namesMap);
        })
        .catch((error) => console.error('Error fetching mover details:', error));
    }
  }, [quotes]);

  // Handler to accept a bid: updates the move's approved_price and then redirects
  const handleAcceptBid = async (quote) => {
    try {
      const response = await fetch(`/api/moves/${latestMove.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approved_price: quote.quote_amount,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setLatestMove(data.move);
        setSelectedBidId(quote.id);
        router.push(
          `/dashboard/bids/booking-success?fromLocation=${encodeURIComponent(latestMove.from_address)}&toLocation=${encodeURIComponent(latestMove.to_address)}&moveDate=${encodeURIComponent(latestMove.move_date)}&price=${encodeURIComponent(quote.quote_amount)}&distance=${encodeURIComponent(latestMove.distance)}`
        );
      } else {
        console.error('Error accepting bid:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!latestMove) {
    return <div>Loading...</div>;
  }

  // Disable Accept Bid buttons if a bid has already been accepted
  const bidDisabled = latestMove.approved_price !== null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Moving Bids</h1>
            <p className="text-gray-600 mt-1">
              Compare and choose the best mover for your needs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Move Date:</span>
            <span className="font-medium">
              {new Date(latestMove.move_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Move Summary */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* From Address */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Truck className="w-6 h-6 text-[#0063ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{latestMove.from_address}</p>
                </div>
              </div>
              {/* To Address */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{latestMove.to_address}</p>
                </div>
              </div>
              {/* Estimated Price */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Price</p>
                  <p className="font-medium">
                    KES {latestMove.estimated_price.toLocaleString()}
                  </p>
                  {latestMove.approved_price && (
                    <p className="text-sm text-green-600">
                      Approved Price: KES {latestMove.approved_price.toLocaleString()}
                    </p>
                  )}
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
            <TabsTrigger value="all">All Bids ({quotes.length})</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <Card
                  key={quote.id}
                  className={`hover:border-blue-200 transition-colors ${
                    selectedBidId === quote.id ? 'border-[#0063ff]' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Quote (Bid) Info */}
                      <div className="lg:w-1/3">
                        <div className="flex items-start gap-4">
                          {/* Placeholder for mover image/icon */}
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Truck className="w-8 h-8 text-gray-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">
                                {/* Display the mover's company name fetched from /api/movers/:id */}
                                {moverNames[quote.mover_id] || 'Loading...'}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quote Details */}
                      <div className="lg:w-2/3">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Price Quote</p>
                            <p className="text-2xl font-bold text-gray-900">
                              KES {Number(quote.quote_amount).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Quote Details</p>
                            <p className="text-md font-medium text-gray-700">
                              {quote.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
                      <Button
                        disabled={bidDisabled}
                        className="bg-[#0063ff] hover:bg-[#0055dd]"
                        onClick={() => handleAcceptBid(quote)}
                      >
                        Accept Bid
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No bids received yet</p>
              </div>
            )}
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
