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
    image: '/nutrition-tips.jpeg',
    author: 'Priya Patel',
    link: '#',
  },
  {
    title: 'Understanding Macros: A Beginner’s Guide',
    description: 'Learn what macronutrients are, why they matter, and how to balance them in your diet.',
    image: '/macros.jpeg',
    author: 'Rahul Verma',
    link: '#',
  },
  {
    title: 'Meal Planning for Busy Professionals',
    description: 'Save time and eat healthy with our top meal planning strategies for busy people.',
    image: '/meal-planning.jpeg',
    author: 'Sneha Kapoor',
    link: '#',
  },
  {
    title: 'The Science Behind Hydration',
    description: 'Explore the importance of hydration and how it impacts your daily performance.',
    image: '/hydration.jpeg',
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
    <div>
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
          <Link href="/blog" className="nav-link active">Blog</Link>
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '320px',
          background: 'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url("/blog-hero.jpg") center/cover no-repeat',
          padding: '60px 0 60px 0',
          marginBottom: '40px',
          animation: 'fadeIn 1s'
        }}
      >
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '18px', textAlign: 'center', animation: 'fadeInUp 1.1s' }}>
          Our Blog
        </h2>
        <p style={{ color: 'var(--foreground)', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', textAlign: 'center', animation: 'fadeInUp 1.2s' }}>
          Explore the latest trends, insights, and stories from our experts. Inspiring ideas and industry insights for every reader.
        </p>
      </section>

      {/* Blog Carousels */}
      <section style={{ maxWidth: '700px', margin: '0 auto 40px auto', padding: '0 20px', animation: 'fadeInUp 1.2s' }}>
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow)',
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
            className="btn"
            style={{
              background: '#181818',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: 'var(--primary-color)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >&lt;</button>
          <div style={{ flex: '1 1 320px', minWidth: '220px', maxWidth: '340px', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', marginBottom: '10px' }}>{blogs[currentBlog].title}</h3>
            <p style={{ color: 'var(--secondary-color)', fontSize: '1.05rem', marginBottom: '10px' }}>{blogs[currentBlog].description}</p>
            <p style={{ color: 'var(--foreground)', fontWeight: 'bold', marginBottom: '10px' }}>By {blogs[currentBlog].author}</p>
            <Link href={blogs[currentBlog].link} style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontWeight: 'bold' }}>
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
            className="btn"
            style={{
              background: '#181818',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: 'var(--primary-color)',
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
      <section style={{ maxWidth: '500px', margin: '0 auto 40px auto', padding: '0 20px', textAlign: 'center', animation: 'fadeInUp 1.3s' }}>
        <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', marginBottom: '10px' }}>Subscribe to Our Newsletter</h3>
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
              border: '1px solid var(--primary-color)',
              borderRadius: '4px',
              backgroundColor: '#181818',
              color: 'var(--foreground)',
              width: '220px'
            }}
          />
          <button
            type="submit"
            className="btn"
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
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
              <li><Link href="/privacy" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Terms of Service</Link></li>
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