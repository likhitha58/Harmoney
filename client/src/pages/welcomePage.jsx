import React from 'react';
import '../styles/welcomePage.css';
import loginSideImage from '../assets/loginSideImage.png'; // Replace with your image path
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-container d-flex justify-content-center align-items-center">
      <div className="glass-card d-flex shadow-lg">
        {/* Left: Image */}
        <div className="glass-image">
          <img src={loginSideImage} alt="Side Image" />
        </div>

        {/* Right: Form */}
        <div className="glass-form p-4">
          <div className="text-end">
            <button className="close-btn">&times;</button>
          </div>
          <h3 className="fw-bold mb-2">Sign In</h3>
          <p className="text-muted mb-4">Welcome to Harmoney. Start saving now!!</p>

          <form>
            <input type="email" placeholder="Email" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <div className="mt-3 text-center">
            <small>Started saving already? <span className="link-text" onClick={() => navigate('/signup')}>Login</span></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
