'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleGetStarted = () => {
    if (localStorage.getItem('loggedIn') === 'true') {
      router.push('/content/content');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    router.refresh?.(); // For Next.js 13+ to refresh the client component state
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    router.refresh?.();
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#E0E0E0',
        margin: '0',
        padding: '0',
        minHeight: '100vh',
        overflowY: 'scroll',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#1E1E1E',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/TrackEat.jpeg"
            alt="Logo"
            width={50}
            height={50}
          />
          <h1 style={{ marginLeft: '10px', fontSize: '1.5rem', color: '#4CAF50' }}>
            Nutrition Tracker
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/about" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            About
          </Link>
          <Link href="/services" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            Services
          </Link>
          <Link href="/blog" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            Blog
          </Link>
        </div>
        <div>
          {loggedIn && user ? (
            <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <Image
                  src="/profile-placeholder.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%', objectFit: 'cover', background: '#333' }}
                />
                <span style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '1rem' }}>
                  {user.name}
                </span>
                <svg width="16" height="16" style={{ fill: '#4CAF50' }} viewBox="0 0 20 20">
                  <path d="M5.25 7.5L10 12.5L14.75 7.5H5.25Z" />
                </svg>
              </div>
              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: '#232323',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    minWidth: '160px',
                    zIndex: 100,
                    padding: '8px 0'
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      background: 'none',
                      color: '#E0E0E0',
                      border: 'none',
                      padding: '12px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '16px',
                      borderBottom: '1px solid #333'
                    }}
                  >
                    Log Out
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    style={{
                      width: '100%',
                      background: 'none',
                      color: '#FF5252',
                      border: 'none',
                      padding: '12px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <button
                  style={{
                    marginRight: '10px',
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
              </Link>
              <Link href="/signup">
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '50px 20px',
          backgroundColor: '#1E1E1E',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', color: '#4CAF50' }}>
          Your Nutrition Companion
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#B0B0B0', margin: '20px 0' }}>
          Track your meals, get personalized suggestions, and achieve your fitness goals.
        </p>
        <button
          onClick={handleGetStarted}
          style={{
            padding: '15px 30px',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: '40px 20px',
          backgroundColor: '#181818',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#4CAF50', fontSize: '2rem', marginBottom: '20px' }}>
          Features
        </h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#232323',
              borderRadius: '8px',
              padding: '30px',
              width: '280px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Meal Tracking</h4>
            <p style={{ color: '#B0B0B0' }}>
              Log your daily meals and monitor your calorie intake with ease.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#232323',
              borderRadius: '8px',
              padding: '30px',
              width: '280px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Personalized Suggestions</h4>
            <p style={{ color: '#B0B0B0' }}>
              Get meal and nutrition suggestions tailored to your goals.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#232323',
              borderRadius: '8px',
              padding: '30px',
              width: '280px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Progress Tracking</h4>
            <p style={{ color: '#B0B0B0' }}>
              Visualize your progress and stay motivated on your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1E1E1E',
          color: '#B0B0B0',
          textAlign: 'center',
          padding: '20px 0',
          marginTop: '40px',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Nutrition Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}