import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/welcomePage.css';
import Harmoneylogo from '../assets/logo.png';
import goalImage from '../assets/FinancialGoals.png';
import infoImage from '../assets/FinancialInfo.png';
import savingsImage from '../assets/FinancialSavings.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 overflow-hidden welcome-page">
      {/* Navbar */}
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"> <div class="col-md-3 mb-2 mb-md-0"> <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none"> <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> </a> </div> <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li> <li><a href="#" class="nav-link px-2">Features</a></li> <li><a href="#" class="nav-link px-2">Pricing</a></li> <li><a href="#" class="nav-link px-2">FAQs</a></li> <li><a href="#" class="nav-link px-2">About</a></li> </ul> <div class="col-md-3 text-end"> <button type="button" class="btn btn-outline-primary me-2">Login</button> <button type="button" class="btn btn-primary">Sign-up</button> </div> </header>

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row align-items-start">
          {/* Left Section */}
          <div className="col-md-6 mb-4">
            <h1 className="display-4 fw-bold text-dark">Unpack Your<br />Financial Goals</h1>
            <p className="text-muted mt-3 fs-5">
              <span className="fw-medium">Feeling Overwhelmed</span> By Managing Your Finances?
              <span className="fw-medium text-dark"> We Get It</span>. That’s Why We Created The Financial System –
              A Personalized Approach <span className="fw-medium text-dark">To Help You Achieve Your Financial Goals</span>.
            </p>
            <button
              className="btn btn-warning rounded-pill px-4 py-2 fw-semibold mt-4"
              onClick={() => navigate('/signup')}
            >
              Get Started Today
            </button>
          </div>

          {/* Right Section: Cards */}
          <div className="col-md-6 d-flex flex-column align-items-start gap-3 mt-md-0 mt-5">
            <div className="rounded-4 shadow-sm px-4 py-3 w-75 text-dark"
              style={{ backgroundColor: '#FCAFA0' }}>
              <p className="fw-semibold mb-1">$3421.00</p>
              <p className="fw-medium mb-0">Set Goals And Track Your Progress Easily</p>
            </div>

            <div className="rounded-4 shadow-sm px-4 py-3 w-75 text-dark"
              style={{ backgroundColor: '#B4C4F6' }}>
              <img src={infoImage} alt="Globe" style={{ width: 30, marginBottom: 8 }} />
              <p className="fw-bold mb-0">78+ <span className="fw-normal">Global Customers</span></p>
            </div>

            <div className="rounded-4 shadow-sm px-4 py-3 w-75 text-dark"
              style={{ backgroundColor: '#FFEB7D' }}>
              <p className="fw-semibold mb-1">Invest For Your Future With Us</p>
              <img src={savingsImage} alt="Invest" style={{ width: 60, height: 30 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
