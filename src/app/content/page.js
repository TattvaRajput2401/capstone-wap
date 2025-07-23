'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import food1 from "/public/food2.png"

// Nutritionix API constants (replace with your own key/appId)
const NUTRITIONIX_APP_ID = '3d787046';
const NUTRITIONIX_API_KEY = '21be5380907b1d74022b534de66013b6';

export default function ContentPage() {
  const [query, setQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [log, setLog] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Navbar user state
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // User's daily goal (can be made dynamic)
  const DAILY_CALORIE_GOAL = 2000;

  // Calculate totals
  const totalCalories = log.reduce((sum, item) => sum + (item.nf_calories || 0), 0);
  const totalProtein = log.reduce((sum, item) => sum + (item.nf_protein || 0), 0);
  const totalCarbs = log.reduce((sum, item) => sum + (item.nf_total_carbohydrate || 0), 0);
  const totalFat = log.reduce((sum, item) => sum + (item.nf_total_fat || 0), 0);

  // Fetch food data from Nutritionix API
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setFoodData(null);
    setLoading(true);
    try {
      const res = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_API_KEY,
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (data.foods && data.foods.length > 0) {
        setFoodData(data.foods[0]);
      } else {
        setError('No nutritional data found for this food.');
      }
    } catch (err) {
      setError('Error fetching data. Please check your API key and network.');
    }
    setLoading(false);
  };

  // Add food to log
  const handleAdd = () => {
    if (foodData) {
      setLog([...log, foodData]);
      setFoodData(null);
      setQuery('');
    }
  };

  // Remove food from log
  const handleRemove = (idx) => {
    setLog(log.filter((_, i) => i !== idx));
  };

  // Navbar logic
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

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <Image src="/TrackEat.jpeg" alt="Logo" width={50} height={50} style={{ cursor: 'pointer' }} />
          </Link>
          <h1 style={{ marginLeft: '10px', fontSize: '1.5rem', color: 'var(--primary-color)' }}>
            Nutrition Tracker
          </h1>
        </div>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
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
          ) : null}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '50px 20px 30px 20px',
          background: 'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url("/nutrition-hero.jpg") center/cover no-repeat',
          animation: 'fadeIn 1s',
        }}
      >
        <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', animation: 'fadeInUp 1.1s' }}>
          Track Your Nutrition Effortlessly
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--secondary-color)', margin: '18px 0 0 0', animation: 'fadeInUp 1.2s' }}>
          Log your food, track calories and nutrients, and reach your daily goals!
        </p>
      </section>

      {/* Main Tracker Content */}
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 0' }}>
        {/* Food Search */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            animation: 'fadeInUp 1.3s'
          }}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter food (e.g. 2 eggs, 1 apple)"
            style={{
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid var(--primary-color)',
              borderRadius: '4px',
              backgroundColor: 'var(--input-background)',
              color: 'var(--foreground)',
              width: '320px',
            }}
            required
          />
          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && (
          <div style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '16px', animation: 'fadeInUp 1.4s' }}>{error}</div>
        )}

        {/* Food Data Display */}
        {foodData && (
          <div
            className="card"
            style={{
              maxWidth: '400px',
              margin: '0 auto 24px auto',
              padding: '24px',
              textAlign: 'center',
              animation: 'fadeInUp 1.4s'
            }}
          >
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>{foodData.food_name}</h3>
            <Image
              src={foodData.photo?.thumb || food1}
              alt={foodData.food_name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px',
                background: '#333',
              }}
            />
            <div style={{ color: 'var(--secondary-color)', fontSize: '1rem', marginBottom: '8px' }}>
              <div>Calories: <b>{foodData.nf_calories}</b></div>
              <div>Protein: <b>{foodData.nf_protein}g</b></div>
              <div>Carbs: <b>{foodData.nf_total_carbohydrate}g</b></div>
              <div>Fat: <b>{foodData.nf_total_fat}g</b></div>
            </div>
            <button
              onClick={handleAdd}
              className="btn"
              style={{ marginTop: '10px' }}
            >
              Add to Log
            </button>
          </div>
        )}

        {/* Food Log */}
        <section
          className="card"
          style={{
            padding: '24px',
            margin: '0 auto 32px auto',
            maxWidth: '600px',
            animation: 'fadeInUp 1.5s'
          }}
        >
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '16px', textAlign: 'center' }}>Today&lsquo;s Log</h2>
          {log.length === 0 ? (
            <p style={{ color: 'var(--secondary-color)', textAlign: 'center' }}>No food logged yet.</p>
          ) : (
            <table style={{ width: '100%', color: 'var(--foreground)', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '8px', color: 'var(--primary-color)' }}>Food</th>
                  <th style={{ padding: '8px', color: 'var(--primary-color)' }}>Calories</th>
                  <th style={{ padding: '8px', color: 'var(--primary-color)' }}>Protein</th>
                  <th style={{ padding: '8px', color: 'var(--primary-color)' }}>Carbs</th>
                  <th style={{ padding: '8px', color: 'var(--primary-color)' }}>Fat</th>
                  <th style={{ padding: '8px' }}></th>
                </tr>
              </thead>
              <tbody>
                {log.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #232323' }}>
                    <td style={{ padding: '8px' }}>{item.food_name}</td>
                    <td style={{ padding: '8px' }}>{item.nf_calories}</td>
                    <td style={{ padding: '8px' }}>{item.nf_protein}g</td>
                    <td style={{ padding: '8px' }}>{item.nf_total_carbohydrate}g</td>
                    <td style={{ padding: '8px' }}>{item.nf_total_fat}g</td>
                    <td style={{ padding: '8px' }}>
                      <button
                        onClick={() => handleRemove(idx)}
                        style={{
                          background: 'var(--accent)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Progress Section */}
        <section
          className="card"
          style={{
            padding: '24px',
            margin: '0 auto 32px auto',
            maxWidth: '600px',
            textAlign: 'center',
            animation: 'fadeInUp 1.6s'
          }}
        >
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '16px' }}>Today&lsquo;s Progress</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ color: 'var(--secondary-color)' }}>Calories</div>
              <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.3rem' }}>{totalCalories} / {DAILY_CALORIE_GOAL}</div>
            </div>
            <div>
              <div style={{ color: 'var(--secondary-color)' }}>Protein</div>
              <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.3rem' }}>{totalProtein}g</div>
            </div>
            <div>
              <div style={{ color: 'var(--secondary-color)' }}>Carbs</div>
              <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.3rem' }}>{totalCarbs}g</div>
            </div>
            <div>
              <div style={{ color: 'var(--secondary-color)' }}>Fat</div>
              <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.3rem' }}>{totalFat}g</div>
            </div>
          </div>
          {/* Progress Bar */}
          <div style={{
            background: 'var(--input-background)',
            borderRadius: '8px',
            height: '18px',
            width: '100%',
            margin: '0 auto',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
          }}>
            <div
              style={{
                background: 'var(--primary-color)',
                height: '100%',
                width: `${Math.min((totalCalories / DAILY_CALORIE_GOAL) * 100, 100)}%`,
                transition: 'width 0.4s',
              }}
            />
          </div>
          <div style={{ color: 'var(--secondary-color)', fontSize: '0.95rem', marginTop: '8px' }}>
            {totalCalories >= DAILY_CALORIE_GOAL
              ? "You've reached your daily calorie goal!"
              : `${DAILY_CALORIE_GOAL - totalCalories} calories left today.`}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1E1E1E',
          color: '#B0B0B0',
          textAlign: 'center',
          padding: '32px 0 20px 0',
          marginTop: '40px',
        }}
      >
        <div className="footer-content" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '18px'
        }}>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Home</Link></li>
              <li><Link href="/about" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="/services" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Services</Link></li>
              <li><Link href="/blog" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Contact</h4>
            <p style={{ margin: 0, color: 'var(--secondary-color)' }}>Bengaluru, India</p>
            <p style={{ margin: 0, color: 'var(--secondary-color)' }}>+91 98765 43210</p>
            <p style={{ margin: 0, color: 'var(--secondary-color)' }}>support@nutritiontracker.com</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Image src="/social/facebook.svg" alt="Facebook" width={24} height={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Image src="/social/twitter.svg" alt="Twitter" width={24} height={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Image src="/social/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Image src="/social/instagram.svg" alt="Instagram" width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
        <p style={{ color: '#777', marginTop: '16px', fontSize: '0.98rem' }}>
          &copy; {new Date().getFullYear()} Nutrition Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}