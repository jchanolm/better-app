'use client'; 

import React, { useState } from 'react';
import '../buttons.css';  
import '../feed.css';
import '../globals.css';

const RoundsPage: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('Active');  // Allow string type for flexibility

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingBottom: '20px'  // Removed borderBottom to remove the gray line
        }}>
        <div></div>
        <div></div>
      </header>

      {/* Feed Header Section */}
      <section style={{ 
          marginTop: '20px',
          maxWidth: '700px', 
          margin: '0 auto', 
        }}>
        <h2 style={{ fontWeight: '575', fontSize: '22px', color: '#FFFFFF', marginBottom: '15px', marginTop: '35px'}}>Rounds</h2>
      </section>

      {/* Tabs Section */}
      <section style={{ 
          maxWidth: '700px', 
          margin: '0 auto', 
        }}>
        
        {/* Tab Navigation for Active / Archived */}
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          borderBottom: '1px solid #FFF' /* White border for the entire navbar */ 
        }}>
          <a
            href='#'
            onClick={() => setActiveTab('Active')}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: activeTab === 'Active' ? '#FFFFFF' : '#888',  // White if Active, otherwise grey
              borderBottom: activeTab === 'Active' ? '3px solid #FFF' : 'none',  // White bar if Active
              fontWeight: activeTab === 'Active' ? 'bold' : 'normal',
              transition: 'color 0.3s',  // Smooth color transition
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';  // Change text color to white on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = activeTab === 'Active' ? '#FFFFFF' : '#888';  // Revert to white if active, grey if not
            }}
          >
            Active
          </a>
          <a
            href='#'
            onClick={() => setActiveTab('Archived')}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: activeTab === 'Archived' ? '#FFFFFF' : '#888',  // White if Archived is selected, otherwise grey
              borderBottom: activeTab === 'Archived' ? '3px solid #FFF' : 'none',  // White bar if Archived
              fontWeight: activeTab === 'Archived' ? 'bold' : 'normal',
              transition: 'color 0.3s',  // Smooth color transition
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';  // Change text color to white on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = activeTab === 'Archived' ? '#FFFFFF' : '#888';  // Revert to white if active, grey if not
            }}
          >
            Archived
          </a>
        </nav>

        {/* Active Content */}
        {activeTab === 'Active' && (
          <div style={{ paddingTop: '15px' }}>
            {/* Feed Card */}
            <div className="feed-card" style={{ color: '#FFFFFF' }}> {/* Add color: white to the card */}
              {/* Card Content */}
              <div className="card-content">
                <h3 style={{ color: '#FFFFFF' }}>Inaugural Tournament</h3> {/* Add color: white to the h3 */}
                <p style={{ color: '#FFFFFF', marginBottom: '5px' }}>Six emerging writers compete for cash and exposure in a three-round tournament:</p>
                  <ul style={{ listStyleType: 'disc', color: '#FFFFFF', paddingLeft: '20px', marginTop: '5px' }}> {/* Reduce top margin */}
                    <li style={{ color: '#FFFFFF' }}>Best Listicle</li>
                    <li style={{ color: '#FFFFFF' }}>Best Book Review</li>
                    <li style={{ color: '#FFFFFF' }}>Best Short Story</li>
                  </ul>
                <p style={{ color: '#FFFFFF' }}>Each round lasts one week. Two writers are eliminated in each round.</p>
                <div className="date-container" style={{ color: '#FFFFFF' }}>
                  <p style={{ margin: '0', color: '#FFFFFF' }}>Start Date: 2024-07-28</p>
                  <p style={{ margin: '0', color: '#FFFFFF' }}>End Date: 2024-08-28</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Archived Content */}
        {activeTab === 'Archived' && (
          <div style={{ paddingTop: '15px' }}>
            {/* Placeholder for future Archived content */}
            <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px' }}>
              <p>No archived rounds available at the moment.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default RoundsPage;
