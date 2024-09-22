'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../buttons.css';
import '../feed.css';
import '../globals.css';

const CompetitionsPage: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('Active');
  const router = useRouter();  // Use router for programmatic navigation

  const cardStyle = {
    color: '#FFFFFF',
    border: '1px solid #555',
    padding: '15px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative' as const,
  };

  const buttonStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',  // Reduced padding
    backgroundColor: 'black',
    border: '2px solid white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '12px',  // Reduced font size
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
  };

  const arrowStyle = {
    position: 'absolute' as const,
    right: '15px',
    top: '15px',
    fontSize: '1.2em',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px'
      }}>
        <div></div>
        <div>
          {/* Apply and Sponsor buttons removed from here */}
        </div>
      </header>

      {/* Feed Header Section */}
      <section style={{
        marginTop: '20px',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontWeight: '575', fontSize: '26px', color: '#FFFFFF', marginBottom: '15px', marginTop: '35px' }}>Competitions</h2>
      </section>

      {/* Tabs Section */}
      <section style={{
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {/* Tab Navigation for Active / Completed */}
        <nav style={{
          display: 'flex',
          justifyContent: 'flex-start',
          borderBottom: '1px solid #FFF'
        }}>
          <a
            href='#'
            onClick={() => setActiveTab('Active')}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: activeTab === 'Active' ? '#FFFFFF' : '#888',
              borderBottom: activeTab === 'Active' ? '3px solid #FFF' : 'none',
              fontWeight: activeTab === 'Active' ? 'bold' : 'normal',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = activeTab === 'Active' ? '#FFFFFF' : '#888';
            }}
          >
            Active
          </a>
          <a
            href='#'
            onClick={() => setActiveTab('Completed')}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: activeTab === 'Completed' ? '#FFFFFF' : '#888',
              borderBottom: activeTab === 'Completed' ? '3px solid #FFF' : 'none',
              fontWeight: activeTab === 'Completed' ? 'bold' : 'normal',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = activeTab === 'Completed' ? '#FFFFFF' : '#888';
            }}
          >
            Completed
          </a>
        </nav>

        {/* Active Content */}
        {activeTab === 'Active' && (
          <div style={{ paddingTop: '15px' }}>
            {/* In Progress Section */}
            <h3 style={{ fontWeight: '500', fontSize: '20px', color: '#FFFFFF', marginBottom: '10px' }}>In Progress</h3>
            <div 
              className="feed-card" 
              style={{
                ...cardStyle,
                boxShadow: 'none',
                backgroundColor: 'transparent'
              }}
              onClick={() => router.push('/roundDetails')}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid #FFFFFF';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) arrow.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid #555';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) arrow.style.opacity = '0.7';
              }}
            >
              <div className="card-content">
                <h3 style={{ color: '#FFFFFF' }}>Inaugural Tournament</h3>
                <p style={{ color: '#FFFFFF', marginBottom: '5px' }}>Six emerging writers compete for cash and exposure in a three-round tournament:</p>
                <ul style={{ listStyleType: 'disc', color: '#FFFFFF', paddingLeft: '20px', marginTop: '5px' }}>
                  <li style={{ color: '#FFFFFF' }}>Best Listicle</li>
                  <li style={{ color: '#FFFFFF' }}>Best Book Review</li>
                  <li style={{ color: '#FFFFFF' }}>Best Short Story</li>
                </ul>
                <p style={{ color: '#FFFFFF' }}>Each round lasts one week. Two writers are eliminated in each round.</p>
                <div className="date-container" style={{ color: '#FFFFFF', marginBottom: '15px' }}>
                  <p style={{ margin: '0', color: '#FFFFFF' }}>Start Date: 2024-07-28</p>
                  <p style={{ margin: '0', color: '#FFFFFF' }}>End Date: 2024-08-28</p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                }}>
                  <Link href="/vote" style={{
                    ...buttonStyle,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                  }}>
                    Vote
                  </Link>
                </div>
              </div>
              <span className="arrow" style={arrowStyle}>→</span>
            </div>

            {/* Subtle Divider */}
            <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '20px 0' }} />

            {/* Open to Entries Section */}
            <h3 style={{ fontWeight: '500', fontSize: '20px', color: '#FFFFFF', marginBottom: '10px' }}>Open to Applicants</h3>
            <div 
              className="feed-card" 
              style={{
                ...cardStyle,
                boxShadow: 'none',
                backgroundColor: 'transparent',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid #FFFFFF';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) arrow.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid #555';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) arrow.style.opacity = '0.7';
              }}
            >
              <div className="card-content">
                <h3 style={{ color: '#FFFFFF' }}>Explanations Tournament</h3>
                <p style={{ color: '#FFFFFF', marginBottom: '5px' }}>Compete in three  of explanatory writing:</p>
                <ul style={{ listStyleType: 'disc', color: '#FFFFFF', paddingLeft: '20px', marginTop: '5px' }}>
                  <li style={{ color: '#FFFFFF' }}>Telescope Explanations: One sentence, one paragraph, one page</li>
                  <li style={{ color: '#FFFFFF' }}>Visual Diagram Explanations</li>
                  <li style={{ color: '#FFFFFF' }}>Verbal Explanations</li>
                </ul>
                <p style={{ color: '#FFFFFF' }}>Showcase your ability to explain complex concepts clearly and concisely.</p>
                <div className="date-container" style={{ color: '#FFFFFF', marginBottom: '15px' }}>
                  <p style={{ margin: '0', color: '#FFFFFF' }}>Start Date: 2024-09-01</p>
                  <p style={{ margin: '0', color: '#FFFFFF' }}>End Date: 2024-10-01</p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  gap: '5px',
                }}>
                  <Link href="/apply" style={{
                    ...buttonStyle,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                  }}>
                    Apply
                  </Link>
                  <Link href="/sponsor" style={{
                    ...buttonStyle,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                  }}>
                    Sponsor
                  </Link>
                </div>
              </div>
              <span className="arrow" style={arrowStyle}>→</span>
            </div>
          </div>
        )}

        {/* Completed Content */}
        {activeTab === 'Completed' && (
          <div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompetitionsPage;
