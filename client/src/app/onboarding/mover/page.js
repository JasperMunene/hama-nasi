'use client'

import { useState } from 'react';

const Mover = () => {
  
  const [location, setLocation] = useState('');
  const [houseType, setHouseType] = useState('');
  const [progress, setProgress] = useState(15);  

  
  const handleContinue = () => {
    console.log('Location:', location);
    console.log('House Type:', houseType);
    
  };

  return (
    <div className="form-container">
      
      <header className="header">
        <h1>Hama Nasi</h1>
      </header>

      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <header classname="header">
        <h1>Tell Us  More About You</h1>
      </header>

      
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
          width: 250;
          height: 36;
          margin-bottom: 20px;
          font-colour:#000000;
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
          background-color: #4548ED; /* Green */
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
          background-color: #7D97F4;
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