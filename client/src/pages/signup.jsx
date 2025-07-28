import React, { useState } from 'react';
import '../styles/signup.css';
import loginSideImage from '../assets/loginSideImage.png';
import logo from '../assets/Harmoney.png';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // Add state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // use state values
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        return;
      }

      const data = await res.json();
      console.log('Signup success:', data);

      // On success navigate to SecurityQuestions
      navigate('/SecurityQuestions', { state: { email: data.email } });
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <>
      <div className="welcome-header text-center">
        <img src={logo} alt="Logo Image" />
      </div>

      <div className="glass-container d-flex justify-content-center align-items-center">
        <div className="glass-card d-flex shadow-lg">
          <div className="glass-image">
            <img src={loginSideImage} alt="Side Image" />
          </div>

          <div className="glass-form p-4">
            <h3 className="fw-bold mb-2">Sign Up</h3>
            <p className="text-muted mb-4">Welcome to Harmoney. Start saving now!!</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">Sign Up</button>
            </form>

            <div className="mt-3 text-center">
              <small>
                Started saving already?{' '}
                <span className="link-text" onClick={() => navigate('/login')}>Login</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
