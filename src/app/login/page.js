'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.email !== email) {
        setError('User does not exist');
        return;
      }
      if (user.password !== password) {
        setError('Incorrect password');
        return;
      }
      localStorage.setItem('loggedIn', 'true');
      router.push('/');
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup');
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '32px 24px',
      background: 'var(--input-background)',
      borderRadius: '8px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '24px' }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid var(--input-border)',
              borderRadius: '4px',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '18px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid var(--input-border)',
              borderRadius: '4px',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)'
            }}
            required
          />
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
      {error && (
        <div style={{ marginTop: '16px' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <button
            onClick={handleSignupRedirect}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
            )}
          </div>
        );
      }