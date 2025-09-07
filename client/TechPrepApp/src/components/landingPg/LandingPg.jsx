import React from 'react';
import { Link } from "react-router-dom"
import './LandingPg.css'
import codingguy from './images/codingguy.webp'
const LandingPg = () => {
  return (
    <div className="page-wrapper">
      <header className="navbar">
        <h1 className="logo">Get Better</h1>
        <nav className="nav-links">
        <Link to="/signin" className="button">Sign In</Link>
        <Link to="/signup" className="button primary">Sign Up</Link>
        </nav>
      </header>

      <section className="hero">
        <h1 className="hero-heading">Learn, Grow, Succeed</h1>
        <p className="hero-subtext">
          Join thousands of learners improving their skills every day.
        </p>
        <img
            src = {codingguy}
            alt = "personcoding"
            className = "hero-image"
        />
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">🎓</div>
          <p className="feature-description">Interactive Learning</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚀</div>
          <p className="feature-description">Lightning-Fast Custom Code Judge</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📑</div>
          <p className="feature-description">Huge Problem Library</p>
        </div>

      </section>

      <section className='testimonials'>
        <h2 className='testimonials-heading'>What our Learners Say</h2>
        <div className='testimonial'>
          <p className="testimonial-text">
            "Get Better has completely transformed how I learn."
          </p>
          <h4 className="testimonial-author">- MithunRaaj</h4>
        </div>
        <div className="testimonial">
          <p className="testimonial-text">
            "The interactive learning experience and fast code judge helped me excel in coding interviews!"
          </p>
          <h4 className="testimonial-author">- Noor Afik Jalaludeen</h4>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">Copyright © 2024 Get Better. All rights reserved.</p>
        <p className="footer-contact">rishi212004200@gmail.com</p>
      </footer>
    </div>
  );
};

export default LandingPg;
