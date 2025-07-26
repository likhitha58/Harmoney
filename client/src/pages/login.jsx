import React, { useState } from 'react';
import '../styles/login.css';
import loginSideImage from '../assets/loginSideImage.png';
import logo from '../assets/Harmoney.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      // Save token in localStorage (or cookies)
      localStorage.setItem('token', data.token);

      alert('Login successful!');
      // After successful login
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
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
            <h3 className="fw-bold mb-2">Login</h3>
            <p className="text-muted mb-4">Welcome back to Harmoney.. Continue your savings!!</p>

            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="submit-btn">Login</button>
            </form>

            <div className="mt-3 text-center">
              <small>Forgot password? <span className="link-text" onClick={() => navigate('/ResetPassword')}>Reset Password</span></small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
