'use client';

import React from 'react';
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps } from 'react-brackets';

const CustomSeed = ({ seed, breakpoint }: RenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div style={{ textAlign: 'left' }}>
          <SeedTeam>{seed.teams[0]?.name || 'TBD'}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'TBD'}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const roundsLeft: RoundProps[] = [
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
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team E' }, { name: 'Team F' }],
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [{ name: 'Team G' }, { name: 'Team H' }],
      },
    ],
  },
  {
    title: 'Round 2',
    seeds: [
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [{ name: 'Winner A-B' }, { name: 'Winner C-D' }],
      },
      {
        id: 6,
        date: new Date().toDateString(),
        teams: [{ name: 'Winner E-F' }, { name: 'Winner G-H' }],
      },
    ],
  },
  {
    title: 'Finals',
    seeds: [
      {
        id: 7,
        date: new Date().toDateString(),
        teams: [{ name: 'Winner A-D' }, { name: 'Winner E-H' }],
      },
    ],
  },
];

const RoundDetailsPage = () => {
  return (
    <div className="container">
      <h1>Tournament Bracket</h1>
      <div className="brackets-container">
        <Bracket rounds={roundsLeft} renderSeedComponent={CustomSeed} />
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          display: flex;
          justify-content: center;
        }

        .brackets-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default RoundDetailsPage;
