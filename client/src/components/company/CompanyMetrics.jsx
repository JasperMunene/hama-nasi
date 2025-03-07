"use client";
import React, { useState, useEffect } from "react";
import Badge from "../elements/badge/Badge";
import { ArrowDown, ArrowUp, Box, House, Star } from "lucide-react";

export const CompanyMetrics = () => {
  const [mover, setMover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch mover data from the API endpoint
    const fetchMover = async () => {
      try {
        const response = await fetch("/api/mover", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch mover data");
        }
        const data = await response.json();
        setMover(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMover();
  }, []);

  if (loading) {
    return <div>Loading mover data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Use the fetched mover data.
  // For example, assume the API returns fields "rating" and "movesCount" (or similar).
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 pb-5">
      {/* Metric for Rating */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Star className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Rating
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {mover.rating}
            </h4>
          </div>
          
        </div>
      </div>
      {/* Metric for Moves (assuming the API returns a moves count; otherwise, adjust accordingly) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <House className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Preffered House Type
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {mover.house_type }
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
