'use client';

import React, { useState, useEffect } from 'react';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';

const rounds: IRoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
    ],
  },
  // Add more rounds as needed
];

const CustomSeed = ({seed}: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={0}>
      <SeedItem>
        <div>
          <SeedTeam>{seed.teams[0]?.name || 'TBD'}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'TBD'}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const RoundDetails = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.9);
      setHeight(window.innerHeight * 0.8);
    };

    handleResize(); // Call once to set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Bracket Example</h1>
      <div style={{ width: `${width}px`, height: `${height}px`, overflow: 'auto' }}>
        <Bracket
          rounds={rounds}
          renderSeedComponent={CustomSeed}
        />
      </div>
    </div>
  );
};

export default RoundDetails;
