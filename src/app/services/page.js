import React from 'react';

export default function ServicesPage() {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#E0E0E0',
        minHeight: '100vh',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#4CAF50', fontSize: '2rem', marginBottom: '20px' }}>Our Services</h1>
      <p style={{ color: '#B0B0B0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
        Discover the range of services we offer, from personalized nutrition tracking to expert guidance and community support. Nutrition Tracker is here to help you every step of the way.
      </p>
    </div>
  );
}