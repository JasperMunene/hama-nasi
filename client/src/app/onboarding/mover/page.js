'use client'

import React, { useState, useEffect } from 'react';

const Mover = ({progress}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "6px", // Rectangular height
        backgroundColor: "#f3f4f6", // Light background color for progress track
        zIndex: 9999 ,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "#4caf50", // Green color for progress
          transition: "width 0.1s ease-in-out", // Smooth transition
        }}
      ></div>
    </div>
  );
};

export default Mover;
// 