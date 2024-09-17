// app/rounds/page.js

import React from 'react';

const RoundsPage = () => {
  // Sample data for rounds
  const rounds = [
    {
      id: 1,
      title: 'Round 1: Short Stories',
      description: 'Submit your best short stories.',
      deadline: '2024-01-15',
    },
    {
      id: 2,
      title: 'Round 2: Book Reviews',
      description: 'Review a book you love.',
      deadline: '2024-03-01',
    },
  ];

  return (
    <div>
      <h1>Current Rounds</h1>
      <ul>
        {rounds.map((round) => (
          <li key={round.id}>
            <h2>{round.title}</h2>
            <p>{round.description}</p>
            <p>Deadline: {round.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundsPage;
