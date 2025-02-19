'use client'

import { useState } from 'react';

const Mover = () => {
  // Define state variables for the form fields
  const [location, setLocation] = useState('');
  const [houseType, setHouseType] = useState('');
  const [progress, setProgress] = useState(50);  // Progress bar starts at 50%

  // Handle the form submission (or continue button click)
  const handleContinue = () => {
    console.log('Location:', location);
    console.log('House Type:', houseType);
    // Here you could proceed to the next step, navigate, or update your app state.
  };

  return (
    <div className="form-container">
      {/* Website Name/Heading */}
      <header className="header">
        <h1>Hama Nasi</h1>
      </header>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Location input field */}
      <div className="form-group">
        <label htmlFor="location">Your Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
      </div>

      {/* House type dropdown */}
      <div className="form-group">
        <label htmlFor="houseType">Select House Type:</label>
        <select
          id="houseType"
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
        >
          <option value="">Select a house type</option>
          <option value="bedsitter">Bedsitter</option>
          <option value="kibanda">Kibanda</option>
          <option value="studio">Studio</option>
          <option value="one_bedroom">One Bedroom</option>
          <option value="two_bedroom">Two Bedroom</option>
        </select>
      </div>

      {/* Continue button */}
      <button onClick={handleContinue} className="continue-btn">
        Continue
      </button>

      <style jsx>{`
        .form-container {
          width: 90%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .progress-bar {
          width: 100%;
          height: 10px;
          background-color: #f0f0f0;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .progress {
          height: 100%;
          background-color: #4caf50; /* Green */
          border-radius: 5px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .continue-btn {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .continue-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Mover;

// 