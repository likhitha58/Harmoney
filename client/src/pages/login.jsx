import React, { useState } from 'react';
import '../styles/login.css';
import loginSideImage from '../assets/loginSideImage.png';
import logo from '../assets/Harmoney.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        toast.error(data.message || 'Login failed', {
          className: 'custom-toast error',
        });
        return;
      }

      // Save token & user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful!', {
        className: 'custom-toast success',
      });

      // Redirect after short delay
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', {
        className: 'custom-toast error',
      });
    }
  };

  return (
    <>
      <div className="welcome-header text-center">
        <img src={logo} alt="Logo" />
      </div>

      <div className="glass-container d-flex justify-content-center align-items-center">
        <div className="glass-card d-flex shadow-lg">
          <div className="glass-image">
            <img src={loginSideImage} alt="Side" />
          </div>

          <div className="glass-form p-4">
            <h3 className="fw-bold mb-2">Login</h3>
            <p className="text-muted mb-4">
              Welcome back to Harmoney.. Continue your savings!!
            </p>

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
              <small>
                Forgot password?{" "}
                <span
                  className="link-text"
                  onClick={() => navigate('/ResetPassword')}
                >
                  Reset Password
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
