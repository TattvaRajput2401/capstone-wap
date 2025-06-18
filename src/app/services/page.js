'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Dummy products/services data
const services = [
  {
    title: 'Personalized Meal Plans',
    image: '/services/meal-plan.jpg',
    short: 'Custom meal plans tailored to your goals and preferences.',
    details: 'Our personalized meal plans are crafted by expert nutritionists to fit your dietary needs, lifestyle, and health goals. Get daily meal suggestions, grocery lists, and nutrition breakdowns.',
  },
  {
    title: 'Calorie & Macro Tracking',
    image: '/services/calorie-tracking.jpg',
    short: 'Easily track your calories, macros, and nutrients.',
    details: 'Track every meal and snack with our intuitive calorie and macro tracker. Visualize your daily intake, set targets, and monitor your progress with detailed analytics.',
  },
  {
    title: 'Expert Consultations',
    image: '/services/consultation.jpg',
    short: 'Book sessions with certified nutritionists and dietitians.',
    details: 'Connect with certified experts for one-on-one consultations. Get personalized advice, meal reviews, and ongoing support to help you stay on track.',
  },
  {
    title: 'Community Support',
    image: '/services/community.jpg',
    short: 'Join a supportive community of health enthusiasts.',
    details: 'Share your journey, ask questions, and get motivated by our vibrant community. Participate in challenges, share recipes, and celebrate your milestones together.',
  },
];

const faqs = [
  {
    question: 'How do I purchase a product or service?',
    answer: 'Simply sign up, browse our offerings, and select the service you want. You can purchase directly through our secure platform.',
  },
  {
    question: 'Can I customize my meal plan?',
    answer: 'Absolutely! Our meal plans are fully customizable to fit your dietary preferences, allergies, and health goals.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes, we offer a 14-day money-back guarantee on all premium services. Your satisfaction is our priority.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach our support team via email at support@nutritiontracker.com or call us at +91 98765 43210.',
  },
];

export default function ServicesPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Carousel state
  const [selected, setSelected] = useState(0);
  const carouselRef = useRef(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

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
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/services" className="nav-link active">Services</Link>
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
          background: 'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url("/services-hero.jpg") center/cover no-repeat',
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
            Services Designed for Your Success
          </h2>
          <p style={{ color: 'var(--foreground)', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Explore our premium products and services to help you achieve your health and nutrition goals.
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
            src="/services-hero-img.png"
            alt="Our Services"
            width={320}
            height={220}
            style={{ borderRadius: '16px', objectFit: 'cover', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
          />
        </div>
      </section>

      {/* Services Carousel */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 40px auto', padding: '0 20px', animation: 'fadeInUp 1.2s' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.7rem', marginBottom: '18px', textAlign: 'center' }}>
          Our Services
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
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => setSelected(idx)}
                className="carousel-card"
                style={{
                  minWidth: '260px',
                  maxWidth: '260px',
                  background: selected === idx ? '#2e2e2e' : 'var(--card-bg)',
                  borderRadius: '10px',
                  boxShadow: selected === idx ? '0 4px 16px #4CAF5040' : 'var(--shadow)',
                  padding: '24px 16px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: selected === idx ? '2px solid var(--primary-color)' : '2px solid transparent',
                  transition: 'border 0.2s, box-shadow 0.2s'
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={100}
                  height={100}
                  style={{ borderRadius: '12px', objectFit: 'cover', marginBottom: '12px', background: '#333' }}
                />
                <h4 style={{ color: 'var(--primary-color)', margin: '8px 0 4px 0', fontSize: '1.1rem' }}>{service.title}</h4>
                <p style={{ color: 'var(--secondary-color)', fontWeight: 'bold', margin: '0 0 8px 0', fontSize: '1rem' }}>{service.short}</p>
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
        {/* Detailed Description */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px',
            background: 'var(--card-bg)',
            borderRadius: '12px',
            padding: '32px 24px',
            gap: '32px'
          }}
        >
          <div style={{ flex: '1 1 320px', minWidth: '260px', maxWidth: '500px' }}>
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', marginBottom: '10px' }}>{services[selected].title}</h3>
            <p style={{ color: 'var(--secondary-color)', fontSize: '1.05rem' }}>{services[selected].details}</p>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: '180px', textAlign: 'center' }}>
            <Image
              src={services[selected].image}
              alt={services[selected].title}
              width={180}
              height={180}
              style={{ borderRadius: '12px', objectFit: 'cover', background: '#333' }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '900px', margin: '0 auto 40px auto', padding: '0 20px', animation: 'fadeInUp 1.3s' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.7rem', marginBottom: '18px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '8px',
                marginBottom: '14px',
                boxShadow: 'var(--shadow)',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  background: 'none',
                  color: 'var(--primary-color)',
                  border: 'none',
                  padding: '18px 20px',
                  textAlign: 'left',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  outline: 'none',
                  borderBottom: openFaq === idx ? '1px solid var(--primary-color)' : '1px solid #333'
                }}
              >
                {faq.question}
                <span style={{ float: 'right', fontWeight: 'normal', color: 'var(--secondary-color)' }}>
                  {openFaq === idx ? '-' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div style={{ padding: '0 20px 18px 20px', color: 'var(--secondary-color)', fontSize: '1rem' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
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