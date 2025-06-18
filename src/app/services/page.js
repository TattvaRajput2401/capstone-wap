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
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
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
          <Link href="/services" style={{
            color: '#4CAF50',
            textDecoration: 'underline',
            fontWeight: 'bold',
            background: '#232323',
            borderRadius: '4px',
            padding: '4px 12px'
          }}>
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
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '320px',
          background: 'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url("/services-hero.jpg") center/cover no-repeat',
          padding: '40px 0 60px 0',
          marginBottom: '40px'
        }}
      >
        <div style={{
          flex: '1 1 400px',
          maxWidth: '600px',
          padding: '40px',
          background: 'rgba(30,30,30,0.85)',
          borderRadius: '12px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#4CAF50', fontSize: '2.2rem', marginBottom: '18px' }}>
            Services Designed for Your Success
          </h2>
          <p style={{ color: '#E0E0E0', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Explore our premium products and services to help you achieve your health and nutrition goals.
          </p>
        </div>
        <div style={{
          flex: '1 1 300px',
          minWidth: '300px',
          minHeight: '220px',
          margin: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
      <section style={{ maxWidth: '1100px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <h2 style={{ color: '#4CAF50', fontSize: '1.7rem', marginBottom: '18px', textAlign: 'center' }}>
          Our Services
        </h2>
        <div style={{ position: 'relative' }}>
          <button
            aria-label="Scroll left"
            onClick={() => scrollCarousel('left')}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              background: '#232323',
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
                style={{
                  minWidth: '260px',
                  maxWidth: '260px',
                  background: selected === idx ? '#2e2e2e' : '#232323',
                  borderRadius: '10px',
                  boxShadow: selected === idx ? '0 4px 16px #4CAF5040' : '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '24px 16px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: selected === idx ? '2px solid #4CAF50' : '2px solid transparent',
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
                <h4 style={{ color: '#4CAF50', margin: '8px 0 4px 0', fontSize: '1.1rem' }}>{service.title}</h4>
                <p style={{ color: '#B0B0B0', fontWeight: 'bold', margin: '0 0 8px 0', fontSize: '1rem' }}>{service.short}</p>
              </div>
            ))}
          </div>
          <button
            aria-label="Scroll right"
            onClick={() => scrollCarousel('right')}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              background: '#232323',
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
        {/* Detailed Description */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px',
            background: '#232323',
            borderRadius: '12px',
            padding: '32px 24px',
            gap: '32px'
          }}
        >
          <div style={{ flex: '1 1 320px', minWidth: '260px', maxWidth: '500px' }}>
            <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '10px' }}>{services[selected].title}</h3>
            <p style={{ color: '#B0B0B0', fontSize: '1.05rem' }}>{services[selected].details}</p>
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
      <section style={{ maxWidth: '900px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <h2 style={{ color: '#4CAF50', fontSize: '1.7rem', marginBottom: '18px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: '#232323',
                borderRadius: '8px',
                marginBottom: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  background: 'none',
                  color: '#4CAF50',
                  border: 'none',
                  padding: '18px 20px',
                  textAlign: 'left',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  outline: 'none',
                  borderBottom: openFaq === idx ? '1px solid #4CAF50' : '1px solid #333'
                }}
              >
                {faq.question}
                <span style={{ float: 'right', fontWeight: 'normal', color: '#B0B0B0' }}>
                  {openFaq === idx ? '-' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div style={{ padding: '0 20px 18px 20px', color: '#B0B0B0', fontSize: '1rem' }}>
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