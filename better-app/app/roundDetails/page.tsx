'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import { useRouter } from 'next/navigation';
import '../drawer.css'; // Assuming drawer.css is in the same directory

const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  const router = useRouter();
  
  const isRoundOne = typeof seed.id === 'number' && seed.id <= 4;

  return (
    <Seed
      mobileBreakpoint={breakpoint}
      style={{ cursor: isRoundOne ? 'pointer' : 'default' }}
      onClick={() => isRoundOne && router.push(`/some-link/${seed.id}`)}
    >
      <SeedItem
        style={{
          backgroundColor: 'black',
          border: `1px solid ${isRoundOne ? 'white' : '#808080'}`,
          transition: isRoundOne ? 'background-color 0.1s, border-color 0.1s' : 'none',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (isRoundOne) {
            e.currentTarget.style.backgroundColor = '#1a1a1a';
            e.currentTarget.style.borderColor = '#cccc00'; // Darker yellow
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          if (isRoundOne) {
            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.borderColor = 'white';
          }
        }}
      >
        <div>
          <SeedTeam>
            {isRoundOne ? (seed.teams[0]?.name || 'NO TEAM') : ''}
          </SeedTeam>
          <SeedTeam>
            {isRoundOne ? (seed.teams[1]?.name || 'NO TEAM') : ''}
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const rounds: IRoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      { id: 1, date: new Date().toDateString(), teams: [{ name: 'Team A' }, { name: 'Team B' }] },
      { id: 2, date: new Date().toDateString(), teams: [{ name: 'Team C' }, { name: 'Team D' }] },
      { id: 3, date: new Date().toDateString(), teams: [{ name: 'Team E' }, { name: 'Team F' }] },
      { id: 4, date: new Date().toDateString(), teams: [{ name: 'Team G' }, { name: 'Team H' }] },
    ],
  },
  {
    title: 'Round 2',
    seeds: [
      { id: 5, date: new Date().toDateString(), teams: [{ name: '' }, { name: '' }] },
      { id: 6, date: new Date().toDateString(), teams: [{ name: '' }, { name: '' }] },
    ],
  },
  {
    title: 'Finals',
    seeds: [{ id: 7, date: new Date().toDateString(), teams: [{ name: '' }, { name: '' }] }],
  },
];

const BracketWithCustomSeed = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setSelectedTeam(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bracket-table-container" style={{ alignItems: 'flex-start', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Bracket
          rounds={rounds}
          renderSeedComponent={CustomSeed}
          roundTitleComponent={(title: React.ReactNode) => (
            <div style={{ textAlign: 'center', color: 'white', fontSize: '20px', userSelect: 'none' }}>{title}</div>
          )}
          swipeableProps={{ enableMouseEvents: false }}
        />
      </div>

      {/* Competitors Table */}
      <table className="competitor-table" style={{ width: '400px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Competitor</th>
            <th style={{ textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((competitor) => (
            <tr 
              key={competitor.name} 
              onClick={(e) => {
                e.preventDefault();
                setSelectedTeam(competitor.name);
              }}
              style={{ 
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.boxShadow = '0 0 0 1px #cccc00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <td style={{ padding: '8px', textAlign: 'left' }}>{competitor.name}</td>
              <td style={{ padding: '8px', textAlign: 'left' }}>
                <span
                  className={`status-button ${competitor.status === 'active' ? 'status-green' : 'status-red'}`}
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTeam && (
        <div className="drawer drawer-open" ref={drawerRef}>
          <button className="drawer-close-button" onClick={() => setSelectedTeam(null)}>Close</button>
          <div className="drawer-content">
            <h3>{selectedTeam}</h3>
            <p>{selectedTeam} has been consistently performing well.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BracketWithCustomSeed;
