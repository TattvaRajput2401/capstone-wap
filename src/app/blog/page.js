import React from 'react';

export default function BlogPage() {
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
      <h1 style={{ color: '#4CAF50', fontSize: '2rem', marginBottom: '20px' }}>Blog</h1>
      <p style={{ color: '#B0B0B0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
        Welcome to our blog! Here you'll find articles, tips, and updates about nutrition, wellness, and using Nutrition Tracker to its fullest.
      </p>
    </div>
  );
}