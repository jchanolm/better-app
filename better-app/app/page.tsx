'use client'

import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const HomePage: React.FunctionComponent = () => {
  const { data: session } = useSession()

  const buttonStyle = {
    color: 'white',
    backgroundColor: 'black',
    border: '2px solid white',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Welcome to Better</h1>
      
      <div style={{ marginBottom: '20px' }}>
        {session ? (
          <>
            <p>Signed in as {session.user?.email}</p>
            <button onClick={() => signOut()} style={buttonStyle}>Sign out</button>
          </>
        ) : (
          <>
            <p>Not signed in</p>
            <button onClick={() => signIn()} style={buttonStyle}>Create Account / Sign In</button>
          </>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Current Competitions</h2>
        <Link href="/rounds" style={{ color: 'white', textDecoration: 'underline' }}>
          View Competitions
        </Link>
      </div>
    </div>
  );
};

export default HomePage;