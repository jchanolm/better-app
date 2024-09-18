'use client';

import React, { useState } from 'react';
import '../roundDetails.css'; // Import for styling

const RoundDetails = () => {
  const CompetitorRectangle = ({ isInactive = false, isFinal = false }: { isInactive?: boolean, isFinal?: boolean }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
      setIsSelected(true);
      setTimeout(() => setIsSelected(false), 500);
    };

    return (
      <div
        className={`competitor-rectangle ${isSelected ? 'selected' : ''} ${
          isInactive ? 'inactive' : ''
        } ${isFinal ? 'final-rectangle' : ''}`}
        onClick={handleSelect}
      >
        {/* No text inside the rectangle */}
      </div>
    );
  };

  return (
    <div className="round-details-container">
      <header className="round-details-header">
        <div className="round-title-container">
          <h1 className="round-title">Round 1: Creative Writing</h1>

          <div className="bracket-grid">
            {/* First Stage */}
            <div className="column">
              <CompetitorRectangle />
              <CompetitorRectangle />
              <div className="blank-cell"></div>

              <CompetitorRectangle />
              <CompetitorRectangle />
              <div className="blank-cell"></div>

              <CompetitorRectangle />
              <CompetitorRectangle />
              <div className="blank-cell"></div>
            </div>

            {/* Second Stage */}
            <div className="column">
              <div className="blank-cell"></div>
              <CompetitorRectangle isInactive={true} />
              <CompetitorRectangle isInactive={true} />
              <div className="blank-cell"></div>

              <CompetitorRectangle isInactive={true} />
              <CompetitorRectangle isInactive={true} />
              <div className="blank-cell"></div>
            </div>

            {/* Final Stage */}
            <div className="column">
              <div className="blank-cell"></div>
              <div className="blank-cell"></div>
              <CompetitorRectangle isInactive={true} />
              <CompetitorRectangle isInactive={true} />
              <div className="blank-cell"></div>
              <div className="blank-cell"></div>
            </div>

            {/* Winner Column (Final Rectangle) */}
            <div className="final-column">
              <CompetitorRectangle isFinal={true} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default RoundDetails;
