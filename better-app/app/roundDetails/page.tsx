'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import { useRouter } from 'next/navigation';
import '../drawer.css'; // Assuming drawer.css is in the same directory
import '../bracketStyles.css'; // Adjust path according to your project structure

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
          border: `0.75px solid white`,
          transition: isRoundOne ? 'background-color 0.1s' : 'none',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (isRoundOne) {
            e.currentTarget.style.backgroundColor = '#1a1a1a';
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          if (isRoundOne) {
            e.currentTarget.style.backgroundColor = 'black';
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
    <div className="bracket-table-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      maxWidth: '1080px', // Reduced by 10% from 1200px
      margin: '0 auto', 
      padding: '54px 36px', // Reduced by 10% from 60px 40px
      fontFamily: "'Open Sans', sans-serif",
      fontSize: '14.4px' // Reduced by 10% from 16px
    }}>
      <div style={{ marginBottom: '54px', width: '100%', padding: '0 4.5%' }}> {/* Reduced marginBottom by 10% from 60px */}
        <Bracket
          rounds={rounds}
          renderSeedComponent={CustomSeed}
          roundTitleComponent={(title: React.ReactNode) => (
            <div style={{ textAlign: 'center', color: 'white', userSelect: 'none', marginBottom: '27px' }}>{title}</div> // Reduced marginBottom by 10% from 30px
          )}
          swipeableProps={{ enableMouseEvents: false }}
        />
      </div>

      {/* Competitors List */}
      <div className="competitor-list" style={{ width: '100%', maxWidth: '495px', padding: '0 27px' }}> {/* Reduced maxWidth by 10% from 550px, padding by 10% from 0 30px */}
        <h3 style={{ textAlign: 'left', marginBottom: '22.5px', color: 'white' }}>Competitors</h3> {/* Reduced marginBottom by 10% from 25px */}
        {competitors.map((competitor, index) => (
          <div 
            key={competitor.name} 
            onClick={() => setSelectedTeam(competitor.name)}
            style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14.4px 7.2px', // Reduced by 10% from 16px 8px
              marginBottom: '10.8px', // Reduced by 10% from 12px
              borderBottom: index < competitors.length - 1 ? '0.675px solid white' : 'none', // Reduced by 10% from 0.75px
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.paddingLeft = '14.4px'; // Reduced by 10% from 16px
              e.currentTarget.style.paddingRight = '14.4px'; // Reduced by 10% from 16px
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.paddingLeft = '7.2px'; // Reduced by 10% from 8px
              e.currentTarget.style.paddingRight = '7.2px'; // Reduced by 10% from 8px
            }}
          >
            <span style={{ color: 'white' }}>{competitor.name}</span>
            <span style={{ 
              color: competitor.status === 'active' ? '#4CAF50' : '#F44336',
            }}>
              {competitor.status === 'active' ? 'Active' : 'Eliminated'}
            </span>
          </div>
        ))}
      </div>

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
