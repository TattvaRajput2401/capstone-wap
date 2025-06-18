'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Dummy team data for the carousel
const teamMembers = [
  {
    name: 'Aarav Sharma',
    role: 'Founder & CEO',
    photo: '/team/aarav.jpg',
    bio: 'Aarav is passionate about nutrition and technology. He leads the team with a vision for healthier living.',
  },
  {
    name: 'Priya Patel',
    role: 'Lead Nutritionist',
    photo: '/team/priya.jpg',
    bio: 'Priya brings 10+ years of experience in nutrition science and helps design our meal plans.',
  },
  {
    name: 'Rahul Verma',
    role: 'Full Stack Developer',
    photo: '/team/rahul.jpg',
    bio: 'Rahul builds robust and scalable features for our platform, ensuring a seamless user experience.',
  },
  {
    name: 'Sneha Kapoor',
    role: 'UI/UX Designer',
    photo: '/team/sneha.jpg',
    bio: 'Sneha crafts beautiful and intuitive interfaces that make healthy living easy and fun.',
  },
];

export default function AboutPage() {
  // For navbar login state
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

  // Carousel scroll logic
  const carouselRef = useRef(null);
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
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
          <Link href="/about" className="nav-link active">About</Link>
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
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '320px',
          background: 'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url("/about-hero.jpg") center/cover no-repeat',
          padding: '40px 0 60px 0',
          marginBottom: '40px',
          animation: 'fadeIn 1s'
        }}
      >
        <div className="hero-content" style={{
          flex: '1 1 400px',
          maxWidth: '600px',
          padding: '40px',
          background: 'rgba(30,30,30,0.85)',
          borderRadius: '12px',
          margin: '20px',
          animation: 'fadeInUp 1.2s'
        }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2.2rem', marginBottom: '18px' }}>
            Empowering Healthy Living
          </h2>
          <p style={{ color: 'var(--foreground)', fontSize: '1.2rem', lineHeight: '1.6' }}>
            At Nutrition Tracker, our mission is to help you achieve your wellness goals through smart nutrition tracking and personalized insights.
          </p>
        </div>
        <div className="hero-img" style={{
          flex: '1 1 300px',
          minWidth: '300px',
          minHeight: '220px',
          margin: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeInUp 1.4s'
        }}>
          <Image
            src="/about-hero-img.png"
            alt="About Us"
            width={320}
            height={220}
            style={{ borderRadius: '16px', objectFit: 'cover', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
          />
        </div>
      </section>

      {/* Company History */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        padding: '0 20px',
        animation: 'fadeInUp 1.2s'
      }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.7rem', marginBottom: '12px', textAlign: 'left' }}>
          Our History
        </h2>
        <p style={{ color: 'var(--secondary-color)', fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'left' }}>
          Founded in 2022 in Bengaluru, Nutrition Tracker began as a small team passionate about making nutrition accessible to everyone. 
          In 2023, we launched our first app version, helping thousands of users track their meals and improve their health. 
          Our journey has been marked by continuous innovation, including the introduction of AI-powered meal suggestions and a growing team of experts dedicated to your wellness.
        </p>
      </section>

      {/* Mission & Vision */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        padding: '0 20px',
        animation: 'fadeInUp 1.3s'
      }}>
        <div className="card" style={{
          flex: '1 1 300px',
          padding: '32px 24px',
          minWidth: '260px'
        }}>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', marginBottom: '10px' }}>Our Mission</h3>
          <p style={{ color: 'var(--secondary-color)', fontSize: '1.05rem' }}>
            To empower individuals to take control of their nutrition and health through easy-to-use technology and expert guidance.
          </p>
        </div>
        <div className="card" style={{
          flex: '1 1 300px',
          padding: '32px 24px',
          minWidth: '260px'
        }}>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', marginBottom: '10px' }}>Our Vision</h3>
          <p style={{ color: 'var(--secondary-color)', fontSize: '1.05rem' }}>
            To become the world’s most trusted platform for nutrition tracking and healthy living, inspiring positive change for millions.
          </p>
        </div>
      </section>

      {/* Team Section (Horizontal Carousel) */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto 40px auto',
        padding: '0 20px',
        animation: 'fadeInUp 1.4s'
      }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.7rem', marginBottom: '18px', textAlign: 'center' }}>
          Meet the Team
        </h2>
        <div style={{ position: 'relative' }}>
          <button
            aria-label="Scroll left"
            onClick={() => scrollCarousel('left')}
            className="btn"
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              padding: 0,
              minWidth: 0,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >&lt;</button>
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '24px',
              padding: '12px 48px',
              scrollBehavior: 'smooth'
            }}
          >
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="carousel-card"
                style={{
                  minWidth: '260px',
                  maxWidth: '260px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  marginBottom: '8px'
                }}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={100}
                  height={100}
                  style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', background: '#333' }}
                />
                <h4 style={{ color: 'var(--primary-color)', margin: '8px 0 4px 0', fontSize: '1.1rem' }}>{member.name}</h4>
                <p style={{ color: 'var(--secondary-color)', fontWeight: 'bold', margin: '0 0 8px 0', fontSize: '1rem' }}>{member.role}</p>
                <p style={{ color: 'var(--secondary-color)', fontSize: '0.98rem', margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
          <button
            aria-label="Scroll right"
            onClick={() => scrollCarousel('right')}
            className="btn"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              padding: 0,
              minWidth: 0,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >&gt;</button>
        </div>
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
              <li><Link href="/about" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="/services" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Services</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Contact</Link></li>
              <li><Link href="/privacy" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Contact</h4>
            <p style={{ margin: 0, color: 'var(--secondary-color)' }}>Bengaluru, India</p>
            <p style={{ margin: 0, color: 'var(--secondary-color)' }}>+91 98765 43210</p>
            <p style={{ margin: 0, color: 'var(--secondary-color)' }}>info@nutritiontracker.com</p>
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