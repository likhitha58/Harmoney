import React from 'react';
import '../styles/signup.css';
import loginSideImage from '../assets/loginSideImage.png';
import logo from '../assets/Harmoney.png'; // Animated logo video
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Title + Animated Logo */}
      <div className="welcome-header text-center">
        <img src={logo} alt="Logo Image" />
      </div>

      {/* Glass Form Card */}
      <div className="glass-container d-flex justify-content-center align-items-center">
        <div className="glass-card d-flex shadow-lg">
          {/* Left: Image */}
          <div className="glass-image">
            <img src={loginSideImage} alt="Side Image" />
          </div>

          {/* Right: Form */}
          <div className="glass-form p-4">
            <h3 className="fw-bold mb-2">Sign Up</h3>
            <p className="text-muted mb-4">Welcome to Harmoney. Start saving now!!</p>

            <form>
              <input type="email" placeholder="Email" className="form-input" />
              <input type="password" placeholder="Password" className="form-input" />
              <button type="submit" className="submit-btn" onClick={() => navigate('/SecurityQuestions')}>Sign Up</button>
            </form>

            <div className="mt-3 text-center">
              <small>Started saving already? <span className="link-text" onClick={() => navigate('/login')}>Login</span></small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
