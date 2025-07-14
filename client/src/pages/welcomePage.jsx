import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/welcomePage.css';
import logo from '../assets/logo.png';
import goalImage from '../assets/FinancialGoals.png';
import infoImage from '../assets/FinancialInfo.png';
import savingsImage from '../assets/FinancialSavings.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 text-dark overflow-hidden welcome-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg px-4 py-3 bg-transparent">
        <div className="container-fluid">
          <span
            className="navbar-brand"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Harmoney Logo" />
          </span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate('/about')}>About Us</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate('/features')}>Features</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate('/login')}>Login</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate('/signup')}>Sign Up</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-md-6 mb-4">
            <h1 className="display-5 fw-bold">Unpack Your Financial Goals</h1>
            <p className="text-secondary mt-3">
              Feeling overwhelmed by managing your finances? <strong>We get it.</strong> That’s why we created Harmoney — a personalized approach to help you achieve your financial goals.
            </p>
            <button
              className="btn btn-warning px-4 py-2 fw-semibold mt-3"
              onClick={() => navigate('/signup')}
            >
              Get Started Today
            </button>
          </div>

          {/* Right Glass Cards */}
          <div className="col-md-6 d-flex flex-column align-items-center gap-3">
            <div className="glass-card p-4 rounded-4 text-dark w-75 shadow mt-2 ms-5 text-center">
              <img src={infoImage} alt="Global Users" className="mb-2" style={{ width: '40px' }} />
              <p className="fw-semibold mb-0">Get personalised inputs based on financial information</p>
            </div>
            <div className="glass-card p-4 rounded-4 text-dark w-75 shadow text-center">
              <img src={goalImage} alt="Track Goals" className="mb-3" style={{ width: '40px' }} />
              <p className="mb-1 fw-medium">Set Goals And Track Your Progress Easily</p>
              <p className="text-end fw-bold">$3,000.00</p>
            </div>
            <div className="glass-card p-4 rounded-4 text-dark w-75 shadow text-center">
              <img src={savingsImage} alt="Invest" className="mb-3" style={{ width: '40px' }} />
              <p className="mb-0 fw-medium">Get motivated to save with Harmoney</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
