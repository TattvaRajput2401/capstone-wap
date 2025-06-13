import React from 'react';

export default function AboutPage() {
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
      <h1 style={{ color: '#4CAF50', fontSize: '2rem', marginBottom: '20px' }}>About Nutrition Tracker</h1>
      <p style={{ color: '#B0B0B0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
        Nutrition Tracker is your companion for a healthier lifestyle. Our mission is to help you log meals, track your nutrition, and reach your wellness goals with ease. 
        Whether you’re a fitness enthusiast or just starting your journey, our app provides the tools and insights you need to succeed.
      </p>
    </div>
  );
}