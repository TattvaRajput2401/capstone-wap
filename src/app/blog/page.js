'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Dummy blog data
const blogs = [
  {
    title: '5 Easy Ways to Improve Your Nutrition',
    description: 'Discover simple habits you can start today to boost your nutrition and overall health.',
    image: '/blog/nutrition-tips.jpg',
    author: 'Priya Patel',
    link: '#',
  },
  {
    title: 'Understanding Macros: A Beginner’s Guide',
    description: 'Learn what macronutrients are, why they matter, and how to balance them in your diet.',
    image: '/blog/macros.jpg',
    author: 'Rahul Verma',
    link: '#',
  },
  {
    title: 'Meal Planning for Busy Professionals',
    description: 'Save time and eat healthy with our top meal planning strategies for busy people.',
    image: '/blog/meal-planning.jpg',
    author: 'Sneha Kapoor',
    link: '#',
  },
  {
    title: 'The Science Behind Hydration',
    description: 'Explore the importance of hydration and how it impacts your daily performance.',
    image: '/blog/hydration.jpg',
    author: 'Aarav Sharma',
    link: '#',
  },
];

export default function BlogPage() {
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

  // Blog carousel state
  const [currentBlog, setCurrentBlog] = useState(0);

  const handlePrev = () => {
    setCurrentBlog((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentBlog((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#E0E0E0',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
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
          <Link href="/">
            <Image src="/TrackEat.jpeg" alt="Logo" width={50} height={50} style={{ cursor: 'pointer' }} />
          </Link>
          <h1 style={{ marginLeft: '10px', fontSize: '1.5rem', color: '#4CAF50' }}>
            Nutrition Tracker
          </h1>
        </div>
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flex: 1
        }}>
          <Link href="/" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/about" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            About
          </Link>
          <Link href="/services" style={{ color: '#E0E0E0', textDecoration: 'none' }}>
            Services
          </Link>
          <Link href="/blog" style={{
            color: '#4CAF50',
            textDecoration: 'underline',
            fontWeight: 'bold',
            background: '#232323',
            borderRadius: '4px',
            padding: '4px 12px'
          }}>
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '320px',
          background: 'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url("/blog-hero.jpg") center/cover no-repeat',
          padding: '60px 0 60px 0',
          marginBottom: '40px'
        }}
      >
        <h2 style={{ color: '#4CAF50', fontSize: '2.5rem', marginBottom: '18px', textAlign: 'center' }}>
          Our Blog
        </h2>
        <p style={{ color: '#E0E0E0', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', textAlign: 'center' }}>
          Explore the latest trends, insights, and stories from our experts. Inspiring ideas and industry insights for every reader.
        </p>
      </section>

      {/* Blog Carousels */}
      <section style={{ maxWidth: '700px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <div style={{
          background: '#232323',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '32px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            aria-label="Previous blog"
            onClick={handlePrev}
            style={{
              background: '#181818',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#4CAF50',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >&lt;</button>
          <div style={{ flex: '1 1 320px', minWidth: '220px', maxWidth: '340px', textAlign: 'left' }}>
            <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '10px' }}>{blogs[currentBlog].title}</h3>
            <p style={{ color: '#B0B0B0', fontSize: '1.05rem', marginBottom: '10px' }}>{blogs[currentBlog].description}</p>
            <p style={{ color: '#E0E0E0', fontWeight: 'bold', marginBottom: '10px' }}>By {blogs[currentBlog].author}</p>
            <Link href={blogs[currentBlog].link} style={{ color: '#4CAF50', textDecoration: 'underline', fontWeight: 'bold' }}>
              Read More
            </Link>
          </div>
          <div style={{ flex: '1 1 120px', minWidth: '120px', textAlign: 'center' }}>
            <Image
              src={blogs[currentBlog].image}
              alt={blogs[currentBlog].title}
              width={120}
              height={120}
              style={{ borderRadius: '12px', objectFit: 'cover', background: '#333' }}
            />
          </div>
          <button
            aria-label="Next blog"
            onClick={handleNext}
            style={{
              background: '#181818',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#4CAF50',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >&gt;</button>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ maxWidth: '500px', margin: '0 auto 40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '10px' }}>Subscribe to Our Newsletter</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            alert('Thank you for subscribing!');
          }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', alignItems: 'center' }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #4CAF50',
              borderRadius: '4px',
              backgroundColor: '#181818',
              color: '#E0E0E0',
              width: '220px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Subscribe
          </button>
        </form>
      </section>

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
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '18px'
        }}>
          <div>
            <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Home</Link></li>
              <li><Link href="/about" style={{ color: '#B0B0B0', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="/services" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Services</Link></li>
              <li><Link href="/blog" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Blog</Link></li>
              <li><Link href="/privacy" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Contact</h4>
            <p style={{ margin: 0, color: '#B0B0B0' }}>Bengaluru, India</p>
            <p style={{ margin: 0, color: '#B0B0B0' }}>+91 98765 43210</p>
            <p style={{ margin: 0, color: '#B0B0B0' }}>support@nutritiontracker.com</p>
          </div>
          <div>
            <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>Follow Us</h4>
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