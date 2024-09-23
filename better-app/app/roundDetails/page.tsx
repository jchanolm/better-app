'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Bracket,
  IRoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from 'react-brackets';
import matchData from '../data/matchData.json';
import competitorsData from '../data/competitorsData.json';

import '../drawer.css'; // Ensure the drawer styles are imported

const CustomSeed = ({
  seed,
  breakpoint,
  onSeedClick,
}: IRenderSeedProps & { onSeedClick: (matchId: number) => void }) => {
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ cursor: 'pointer' }}>
      <SeedItem
        style={{
          backgroundColor: 'black',
          border: '0.75px solid white',
          fontSize: '14px',
          transition: 'background-color 0.05s ease',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.backgroundColor = '#2a2828';
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.backgroundColor = 'black';
        }}
        onClick={() => onSeedClick(seed.matchId)}
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
      { id: 1, matchId: 1, teams: [{ name: 'Manali Niggums' }, { name: 'Frah Frah Got' }] },
      { id: 2, matchId: 2, teams: [{ name: 'Team C' }, { name: 'Team D' }] },
      { id: 3, matchId: 3, teams: [{ name: 'Team E' }, { name: 'Team F' }] },
      { id: 4, matchId: 4, teams: [{ name: 'Team G' }, { name: 'Team H' }] },
    ],
  },
  {
    title: 'Round 2',
    seeds: [
      { id: 5, matchId: 5, teams: [{ name: 'TBD' }, { name: 'TBD' }] },
      { id: 6, matchId: 6, teams: [{ name: 'TBD' }, { name: 'TBD' }] },
    ],
  },
  {
    title: 'Final',
    seeds: [{ id: 7, matchId: 7, teams: [{ name: 'TBD' }, { name: 'TBD' }] }],
  },
];

const competitors = competitorsData.map((competitor) => ({
  id: competitor.id,
  name: competitor.name,
  status: competitor.competitions?.find(
    (comp) => comp.competitionName === 'Current Competition'
  )?.status || 'Inactive',
  profile: competitor.profile || '',
  socials: competitor.socials || {},
}));

const BracketWithToggle = () => {
  const [showBracket, setShowBracket] = useState(true);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Memoize selected match and competitor to prevent unnecessary re-renders
  const selectedMatch = useMemo(
    () => matchData.find((match) => match.id === selectedMatchId),
    [selectedMatchId]
  );
  const selectedCompetitor = useMemo(
    () => competitors.find((competitor) => competitor.id === selectedCompetitorId),
    [selectedCompetitorId]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Open drawer for a competitor
  const openCompetitorDrawer = useCallback((competitorId: number) => {
    setSelectedCompetitorId(competitorId);
    setSelectedMatchId(null); // Reset match selection
    setIsDrawerOpen(true);
  }, []);

  // Open drawer for a match
  const openMatchDrawer = useCallback((matchId: number) => {
    setSelectedMatchId(matchId);
    setSelectedCompetitorId(null); // Reset competitor selection
    setIsDrawerOpen(true);
  }, []);

  // Close the drawer and reset states
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    // Use a delay to reset state after the drawer has fully closed
    setTimeout(() => {
      setSelectedMatchId(null);
      setSelectedCompetitorId(null);
      setSelectedTeam(null); // Reset team selection on close
      setVoteConfirmed(false); // Reset confirmation on drawer close
    }, 300); // Ensure smooth transition
  }, []);

  // Handle voting logic
  const handleVoteClick = useCallback(
    (teamName: string) => {
      if (!voteConfirmed) {
        setSelectedTeam(teamName);
      }
    },
    [voteConfirmed]
  );

  // Confirm vote
  const confirmVote = () => {
    if (selectedTeam) {
      setVoteConfirmed(true); // Lock in the vote
      setSuccessMessage(true); // Show success message

      // Fade out success message after 3 seconds
      setTimeout(() => setSuccessMessage(false), 3000);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: '100vh',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '14.4px',
        paddingLeft: '60px',
      }}
    >
      {/* Navigation toggle between Bracket and Competitor views */}
      <div style={{ marginTop: '20px', marginBottom: '20px', alignSelf: 'flex-start' }}>
        <nav style={{ display: 'flex', justifyContent: 'flex-start', borderBottom: '1px solid white' }}>
          <a
            href="#"
            onClick={() => setShowBracket(true)}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: showBracket ? '#FFFFFF' : '#888',
              borderBottom: showBracket ? '3px solid #FFF' : 'none',
              fontWeight: showBracket ? 'bold' : 'normal',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = showBracket ? '#FFFFFF' : '#888';
            }}
          >
            View Bracket
          </a>
          <a
            href="#"
            onClick={() => setShowBracket(false)}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: !showBracket ? '#FFFFFF' : '#888',
              borderBottom: !showBracket ? '3px solid #FFF' : 'none',
              fontWeight: !showBracket ? 'bold' : 'normal',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = !showBracket ? '#FFFFFF' : '#888';
            }}
          >
            View Competitors
          </a>
        </nav>
      </div>

      {/* Bracket View */}
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
              transform: 'scale(1)',
              transformOrigin: 'top left',
              marginLeft: '40px',
            }}
          >
            <Bracket
              rounds={rounds}
              renderSeedComponent={(seedProps) => (
                <CustomSeed
                  {...seedProps}
                  onSeedClick={(matchId) => openMatchDrawer(matchId)}
                />
              )}
              roundTitleComponent={(title: React.ReactNode) => (
                <div
                  style={{
                    textAlign: 'left',
                    color: 'white',
                    userSelect: 'none',
                    marginBottom: '25px',
                    fontSize: '16px',
                  }}
                >
                  {title}
                </div>
              )}
              swipeableProps={{
                enableMouseEvents: true,
                animateHeight: true,
                index: 0,
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
            marginLeft: '40px',
          }}
        >
          <h3 style={{ marginBottom: '22.5px', color: 'white', textAlign: 'left' }}>Competitors</h3>
          {competitors.map((competitor, index) => (
            <div
              key={competitor.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14.4px 7.2px',
                marginBottom: '10.8px',
                borderBottom: index < competitors.length - 1 ? '0.675px solid white' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.05s ease',
              }}
              onClick={() => openCompetitorDrawer(competitor.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a2828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ color: 'white' }}>{competitor.name}</span>
              <span
                style={{
                  color: competitor.status === 'Active' ? '#4CAF50' : '#F44336',
                }}
              >
                {competitor.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Drawer for Match or Competitor Details */}
      {isDrawerOpen && (
        <div
          className={`drawer ${isDrawerOpen ? 'drawer-open' : 'drawer-closing'}`}
          ref={drawerRef}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '300px',
            backgroundColor: 'black',
            color: 'white',
            borderLeft: '1px solid white',
            boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
            transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 1000,
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <button
            className="drawer-close-button"
            onClick={closeDrawer}
            style={{
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              position: 'absolute',
              top: '20px',
              left: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6M15 18L21 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="drawer-content" style={{ marginTop: '60px' }}>
            {selectedMatch && (
              <>
                <h2>
                  Match Between {selectedMatch.teams[0]} vs {selectedMatch.teams[1]}
                </h2>

                {/* Vote buttons for each team */}
                <div style={{ margin: '20px 0' }}>
                  <button
                    style={{
                      backgroundColor: selectedTeam === selectedMatch.teams[0] ? 'white' : 'black',
                      color: selectedTeam === selectedMatch.teams[0] ? 'black' : 'white',
                      border: '1px solid white',
                      padding: '10px 20px',
                      marginRight: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      borderRadius: '3px',
                      pointerEvents: voteConfirmed ? 'none' : 'auto', // Disable if vote confirmed
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = 'black';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTeam !== selectedMatch.teams[0]) {
                        e.currentTarget.style.backgroundColor = 'black';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onClick={() => handleVoteClick(selectedMatch.teams[0])}
                  >
                    Vote for {selectedMatch.teams[0]}
                  </button>
                  <button
                    style={{
                      backgroundColor: selectedTeam === selectedMatch.teams[1] ? 'white' : 'black',
                      color: selectedTeam === selectedMatch.teams[1] ? 'black' : 'white',
                      border: '1px solid white',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      borderRadius: '3px',
                      pointerEvents: voteConfirmed ? 'none' : 'auto', // Disable if vote confirmed
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = 'black';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTeam !== selectedMatch.teams[1]) {
                        e.currentTarget.style.backgroundColor = 'black';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onClick={() => handleVoteClick(selectedMatch.teams[1])}
                  >
                    Vote for {selectedMatch.teams[1]}
                  </button>
                </div>

                {/* Confirm Vote Button */}
                {selectedTeam && !voteConfirmed && (
                  <div style={{ margin: '20px 0' }}>
                    <button
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid white',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        borderRadius: '3px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = 'black';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'black';
                        e.currentTarget.style.color = 'white';
                      }}
                      onClick={confirmVote}
                    >
                      Confirm Vote
                    </button>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <p
                    style={{
                      color: 'green',
                      fontWeight: 'bold',
                      marginTop: '10px',
                      transition: 'opacity 0.3s',
                    }}
                  >
                    Success! Your vote for {selectedTeam} has been recorded.
                  </p>
                )}

                {/* Match Details */}
                <p>
                  <strong>Start Time:</strong>{' '}
                  {new Date(selectedMatch.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{' '}
                  {new Date(selectedMatch.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Prompt:</strong> {selectedMatch.prompt}
                </p>
                <p>
                  <strong>Rules:</strong> {selectedMatch.rules}
                </p>
                <h3>Submissions:</h3>
                {selectedMatch.submissions?.map((submission, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h4>{submission.team}</h4>
                    <p>
                      <strong>Submission:</strong> {submission.submission}
                    </p>
                    <p>
                      <strong>User Profiles:</strong>{' '}
                      {submission.userProfiles.join(', ')}
                    </p>
                  </div>
                ))}
              </>
            )}

            {selectedCompetitor && (
              <>
                <h2>{selectedCompetitor.name}</h2>
                <div style={{ margin: '20px 0' }}>
                  <button
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#45a049';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#4CAF50';
                    }}
                  >
                    Become a Patron
                  </button>
                </div>
                <p>{selectedCompetitor.profile}</p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {/* Placeholder Social Icons */}
                  <a
                    href={selectedCompetitor.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/twitter.svg"
                      alt="Twitter"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </a>
                  <a
                    href={selectedCompetitor.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/github.svg"
                      alt="GitHub"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </a>
                </div>
                <h3>Competitions</h3>
                {selectedCompetitor.competitions?.map((competition, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h4>{competition.competitionName} ({competition.year})</h4>
                    <p>
                      <strong>Status:</strong> {competition.status}
                    </p>
                    <ul>
                      {competition.submissions?.map((submission, idx) => (
                        <li key={idx}>{submission}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BracketWithToggle;
