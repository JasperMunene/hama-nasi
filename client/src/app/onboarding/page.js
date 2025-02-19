'use client'

import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">How do you want to use Hama Nasi?</h2>
        <div className="space-y-4">
          <button
            onClick={() => setSelected("Mover")}
            className={`w-full p-4 rounded-lg flex items-center justify-center border ${
              selected === "Mover" ? "border-blue-500 bg-blue-100" : "border-gray-300"
            }`}
          >
            Mover
          </button>
          <button
            onClick={() => setSelected("Moving Company")}
            className={`w-full p-4 rounded-lg flex items-center justify-center border ${
              selected === "Moving Company" ? "border-blue-500 bg-blue-100" : "border-gray-300"
            }`}
          >
            Moving Company
          </button>
        </div>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg disabled:bg-gray-300"
          disabled={!selected}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}