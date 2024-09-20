'use client';

import React, { useState } from 'react';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import '../drawer.css'; // Assuming drawer.css is in the same directory

const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  return (
    <Seed
      mobileBreakpoint={breakpoint}
      style={{ cursor: 'default' }}
    >
      <SeedItem
        style={{
          backgroundColor: 'black',
          border: `0.75px solid white`,
          fontSize: '14px', // Reduced font size
        }}
      >
        <div>
          <SeedTeam>{seed.teams[0]?.name || 'NO TEAM'}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM'}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const rounds: IRoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'Manali Niggums' }, { name: 'Frah Frah Got' }],
      },
      {
        id: 2,
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
      {
        id: 3,
        teams: [{ name: 'Team E' }, { name: 'Team F' }],
      },
      {
        id: 4,
        teams: [{ name: 'Team G' }, { name: 'Team H' }],
      },
    ],
  },
  {
    title: 'Round 2',
    seeds: [
      {
        id: 5,
        teams: [{ name: 'TBD' }, { name: 'TBD' }],
      },
      {
        id: 6,
        teams: [{ name: 'TBD' }, { name: 'TBD' }],
      },
    ],
  },
  {
    title: 'Final',
    seeds: [
      {
        id: 7,
        teams: [{ name: 'TBD' }, { name: 'TBD' }],
      },
    ],
  },
];

const competitors = [
  { name: 'Team A', status: 'active' },
  { name: 'Team B', status: 'active' },
  { name: 'Team C', status: 'active' },
  { name: 'Team D', status: 'active' },
  { name: 'Team E', status: 'active' },
  { name: 'Team F', status: 'active' },
  { name: 'Team G', status: 'active' },
  { name: 'Team H', status: 'active' },
];

const BracketWithToggle = () => {
  const [showBracket, setShowBracket] = useState(true);

  return (
    <div
      className="bracket-table-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: '100vh',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '14.4px',
        paddingLeft: '60px', // Adjusted to shift inward for a slightly center-left alignment
      }}
    >
      <div style={{ marginTop: '20px', marginBottom: '20px', alignSelf: 'flex-start' }}>
        <button
          onClick={() => setShowBracket(true)}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: showBracket ? 'black' : 'transparent',
            color: 'white',
            border: '1px solid white',
            cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px',
          }}
        >
          View Bracket
        </button>
        <button
          onClick={() => setShowBracket(false)}
          style={{
            padding: '8px 16px',
            backgroundColor: !showBracket ? 'black' : 'transparent',
            color: 'white',
            border: '1px solid white',
            cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px',
          }}
        >
          View Competitors
        </button>
      </div>

      {showBracket ? (
        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 80px)',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              transform: 'scale(0.9)', // Reduced scale
              transformOrigin: 'top left',
              marginLeft: '40px', // Slight inward shift for bracket alignment
            }}
          >
            <Bracket
              rounds={rounds}
              renderSeedComponent={CustomSeed}
              roundTitleComponent={(title: React.ReactNode) => (
                <div
                  style={{
                    textAlign: 'left',
                    color: 'white',
                    userSelect: 'none',
                    marginBottom: '25px', // Reduced margin
                    fontSize: '16px', // Reduced font size
                  }}
                >
                  {title}
                </div>
              )}
              swipeableProps={{
                enableMouseEvents: true,
                animateHeight: true,
                index: 0, // Start from Round 1
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="competitor-list"
          style={{
            width: '100%',
            maxWidth: '495px',
            textAlign: 'left',
            marginLeft: '40px', // Slight inward shift for table alignment
          }}
        >
          <h3 style={{ marginBottom: '22.5px', color: 'white', textAlign: 'left' }}>Competitors</h3>
          {competitors.map((competitor, index) => (
            <div
              key={competitor.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14.4px 7.2px',
                marginBottom: '10.8px',
                borderBottom: index < competitors.length - 1 ? '0.675px solid white' : 'none',
              }}
            >
              <span style={{ color: 'white' }}>{competitor.name}</span>
              <span
                style={{
                  color: competitor.status === 'active' ? '#4CAF50' : '#F44336',
                }}
              >
                {competitor.status === 'active' ? 'Active' : 'Eliminated'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BracketWithToggle;
