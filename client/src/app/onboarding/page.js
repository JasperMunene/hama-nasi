"use client";
import { useState } from "react";
import "./Onboarding.css"; // Import the CSS file

export default function Onboarding() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h2 className="onboarding-title">How do you want to use Hama Nasi?</h2>

        <div className="onboarding-options">
          <button
            onClick={() => setSelected("Mover")}
            className={`onboarding-option ${selected === "Mover" ? "selected" : ""}`}
          >
            Mover
          </button>

          <button
            onClick={() => setSelected("Moving Company")}
            className={`onboarding-option ${selected === "Moving Company" ? "selected" : ""}`}
          >
            Moving Company
          </button>
        </div>

        <button className="onboarding-continue" disabled={!selected}>
          Continue →
        </button>
      </div>
    </div>
  );
}

