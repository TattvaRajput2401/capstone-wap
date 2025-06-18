'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill all fields.');
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      localStorage.setItem('loggedIn', 'true');
      router.push('/');
    }
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
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '24px' }}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
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
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}
    </div>
  );
}