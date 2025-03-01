"use client";  // Ensure this is marked as a client component
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MoveDetails = () => {
  const { moveId } = useParams();  // Correct way to get dynamic params in App Router
  const [move, setMove] = useState(null);

  useEffect(() => {
    if (moveId) {
      // Simulating fetching move details
      const moveData = {
        id: moveId,
        name: "Example Mover",
        route: "Nairobi - Mombasa",
        price: "KES 200,000",
        distance: "500 km",
      };
      setMove(moveData);
    }
  }, [moveId]);

  if (!move) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{move.name}</h2>
      <p>Route: {move.route}</p>
      <p>Price: {move.price}</p>
      <p>Distance: {move.distance}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
        Accept Move
      </button>
    </div>
  );
};

export default MoveDetails;
