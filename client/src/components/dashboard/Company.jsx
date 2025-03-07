"use client";

import React, { useEffect, useState } from "react";
import { CompanyMetrics } from "@/components/company/CompanyMetrics";
import QuoteSummary from "@/components/company/QuoteSummary";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const CompanyDash = () => {
  const [mostRecentMove, setMostRecentMove] = useState(null);
  const [otherMoves, setOtherMoves] = useState([]);
  const [loadingMoves, setLoadingMoves] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch("/api/moves");
        if (!response.ok) throw new Error("Failed to fetch moves");
        const data = await response.json();

        // Sort moves by created_at (newest first)
        const sortedMoves = data.moves.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        // The first item is the most recent
        setMostRecentMove(sortedMoves[0]);
        // The rest go into the otherMoves array
        setOtherMoves(sortedMoves.slice(1));
      } catch (err) {
        console.error("Error fetching moves:", err);
        setError(err.message);
      } finally {
        setLoadingMoves(false);
      }
    };
    fetchMoves();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Left column: Company metrics */}
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CompanyMetrics />

        {/* Most Recent Move (shown below the metrics) */}
        {loadingMoves ? (
          <p className="text-gray-500">Loading most recent move...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : mostRecentMove ? (
          <Link href={`/dashboard/find-move/${mostRecentMove.id}`}>
            <Card className="group hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      mostRecentMove.move_status.toLowerCase() === "pending"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {mostRecentMove.move_status}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(mostRecentMove.estimated_price)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium text-gray-900">
                        {mostRecentMove.from_address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium text-gray-900">
                        {mostRecentMove.to_address}
                      </p>
                    </div>
                  </div>

                  {mostRecentMove.distance && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Distance</span>
                      <span className="font-medium">
                        {mostRecentMove.distance.toFixed(1)} km
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(mostRecentMove.move_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{mostRecentMove.move_time}</span>
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
        ) : null}
      </div>

      {/* Right column: Quote summary */}
      <div className="col-span-12 xl:col-span-5">
        <QuoteSummary />
      </div>

      {/* Remaining moves in a grid */}
      <div className="col-span-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Other Moves
        </h2>
        {loadingMoves ? (
          <p className="text-gray-500">Loading moves...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : otherMoves.length === 0 ? (
          <p className="text-gray-500">No other moves found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMoves.map((move) => (
              <Link href={`/dashboard/find-move/${move.id}`} key={move.id}>
                <Card className="group hover:shadow-xl transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          move.move_status.toLowerCase() === "pending"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
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
                          <p className="font-medium text-gray-900">
                            {move.from_address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium text-gray-900">
                            {move.to_address}
                          </p>
                        </div>
                      </div>

                      {move.distance && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Distance</span>
                          <span className="font-medium">
                            {move.distance.toFixed(1)} km
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(move.move_date).toLocaleDateString()}
                          </span>
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
        )}
      </div>
    </div>
  );
};

export default CompanyDash;
