import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#E0E0E0',
        margin: '0',
        padding: '0',
        height: '100vh',
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
        <Link href="/login">
          <button
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
        </Link>
      </section>

      {/* Testimonials Section */}
      <section
        style={{
          display: 'flex',
          overflowX: 'scroll',
          gap: '20px',
          padding: '20px',
          backgroundColor: '#1E1E1E',
        }}
      >
        {[
          { name: 'John Doe', text: 'This app changed my life!' },
          { name: 'Jane Smith', text: 'Highly recommend for tracking meals.' },
          { name: 'Alice Johnson', text: 'Easy to use and very helpful.' },
          { name: 'Bob Brown', text: 'A must-have for fitness enthusiasts.' },
          { name: 'Emily Davis', text: 'Great features and user-friendly.' },
        ].map((testimonial, index) => (
          <div
            key={index}
            style={{
              minWidth: '300px',
              padding: '20px',
              backgroundColor: '#333',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#E0E0E0',
              fontSize: '1rem',
              textAlign: 'center',
            }}
          >
            <p style={{ fontStyle: 'italic' }}>&quot;{testimonial.text}&quot;</p>
            <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#4CAF50' }}>
              - {testimonial.name}
            </p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: '0 20px 50px 20px',
          backgroundColor: '#1E1E1E',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul style={{ maxWidth: '700px', listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold', marginRight: '12px', fontSize: '1.5rem' }}>•</span>
            <div>
              <span style={{ fontWeight: 'bold', color: '#E0E0E0' }}>Meal Logging:</span>
              <span style={{ color: '#B0B0B0', marginLeft: '6px' }}>
                Quickly record your daily meals and snacks with an intuitive interface.
              </span>
            </div>
          </li>
          <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold', marginRight: '12px', fontSize: '1.5rem' }}>•</span>
            <div>
              <span style={{ fontWeight: 'bold', color: '#E0E0E0' }}>Personalized Suggestions:</span>
              <span style={{ color: '#B0B0B0', marginLeft: '6px' }}>
                Receive tailored meal and nutrition recommendations based on your goals.
              </span>
            </div>
          </li>
          <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold', marginRight: '12px', fontSize: '1.5rem' }}>•</span>
            <div>
              <span style={{ fontWeight: 'bold', color: '#E0E0E0' }}>Progress Tracking:</span>
              <span style={{ color: '#B0B0B0', marginLeft: '6px' }}>
                Monitor your calorie intake, macros, and progress over time with clear charts.
              </span>
            </div>
          </li>
          <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold', marginRight: '12px', fontSize: '1.5rem' }}>•</span>
            <div>
              <span style={{ fontWeight: 'bold', color: '#E0E0E0' }}>Barcode Scanning:</span>
              <span style={{ color: '#B0B0B0', marginLeft: '6px' }}>
                Instantly add foods by scanning barcodes for quick and accurate logging.
              </span>
            </div>
          </li>
          <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold', marginRight: '12px', fontSize: '1.5rem' }}>•</span>
            <div>
              <span style={{ fontWeight: 'bold', color: '#E0E0E0' }}>Goal Setting:</span>
              <span style={{ color: '#B0B0B0', marginLeft: '6px' }}>
                Set daily calorie and nutrient targets to stay motivated and on track.
              </span>
            </div>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold', marginRight: '12px', fontSize: '1.5rem' }}>•</span>
            <div>
              <span style={{ fontWeight: 'bold', color: '#E0E0E0' }}>Data Privacy:</span>
              <span style={{ color: '#B0B0B0', marginLeft: '6px' }}>
                Your information is securely stored and never shared without your consent.
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section
        style={{
          padding: '50px 20px',
          backgroundColor: '#1E1E1E',
        }}
      >
        <h2 style={{ fontSize: '2rem', color: '#4CAF50' }}>Contact Us</h2>
        <p style={{ fontSize: '1.2rem', color: '#B0B0B0', margin: '20px 0' }}>
          Have questions? Reach out to us anytime, and we&apos;ll be happy to assist you.
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#1E1E1E',
          color: '#B0B0B0',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Nutrition Tracker. All rights reserved.</p>
        <div style={{ marginTop: '10px' }}>
          <Link href="/privacy" style={{ color: '#4CAF50', textDecoration: 'none', marginRight: '15px' }}>
            Privacy Policy
          </Link>
          <Link href="/terms" style={{ color: '#4CAF50', textDecoration: 'none' }}>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}