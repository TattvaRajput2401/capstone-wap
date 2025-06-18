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
      router.push('/content');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    router.refresh?.();
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
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/TrackEat.jpeg" alt="Logo" width={50} height={50} />
          <h1 style={{ marginLeft: '10px', fontSize: '1.5rem', color: 'var(--primary-color)' }}>
            Nutrition Tracker
          </h1>
        </div>
        <div className="nav-links">
          <Link href="/" className="nav-link active">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
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
                  style={{ borderRadius: '50%', objectFit: 'cover', background: '#333', transition: 'box-shadow 0.2s' }}
                  className="profile-img"
                />
                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1rem' }}>
                  {user.name}
                </span>
                <svg width="16" height="16" style={{ fill: 'var(--primary-color)' }} viewBox="0 0 20 20">
                  <path d="M5.25 7.5L10 12.5L14.75 7.5H5.25Z" />
                </svg>
              </div>
              {dropdownOpen && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: 'var(--card-bg)',
                    borderRadius: '6px',
                    boxShadow: 'var(--shadow)',
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
                      color: 'var(--foreground)',
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
                      color: 'var(--accent)',
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
                <button className="btn" style={{ marginRight: '10px' }}>
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="btn">
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
          animation: 'fadeIn 0.8s',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', animation: 'fadeInUp 0.8s' }}>
          Your Nutrition Companion
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', margin: '20px 0', animation: 'fadeInUp 1s' }}>
          Track your meals, get personalized suggestions, and achieve your fitness goals.
        </p>
        <button
          onClick={handleGetStarted}
          className="btn"
          style={{
            padding: '15px 30px',
            fontSize: '1rem',
            marginTop: '18px',
            animation: 'fadeInUp 1.2s'
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
        <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '20px' }}>
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
          <div className="card" style={{ width: '280px', padding: '30px' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Meal Tracking</h4>
            <p style={{ color: 'var(--secondary-color)' }}>
              Log your daily meals and monitor your calorie intake with ease.
            </p>
          </div>
          <div className="card" style={{ width: '280px', padding: '30px' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Personalized Suggestions</h4>
            <p style={{ color: 'var(--secondary-color)' }}>
              Get meal and nutrition suggestions tailored to your goals.
            </p>
          </div>
          <div className="card" style={{ width: '280px', padding: '30px' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Progress Tracking</h4>
            <p style={{ color: 'var(--secondary-color)' }}>
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