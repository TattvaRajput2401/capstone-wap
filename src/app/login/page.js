import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#E0E0E0',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#4CAF50', marginBottom: '20px' }}>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: '80%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #4CAF50',
            borderRadius: '4px',
            backgroundColor: '#1E1E1E',
            color: '#E0E0E0',
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: '80%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #4CAF50',
            borderRadius: '4px',
            backgroundColor: '#1E1E1E',
            color: '#E0E0E0',
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px', color: '#B0B0B0' }}>
        Don't have an account?{' '}
        <Link href="/signup" style={{ color: '#4CAF50', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}