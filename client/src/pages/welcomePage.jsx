import React from 'react';
<<<<<<< HEAD
import '../styles/welcomePage.css';
import loginSideImage from '../assets/loginSideImage.png'; // Replace with your image path
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/welcomePage.css'; // Glassmorphism styles
import logo from '../assets/logo.png'; // Replace with your logo file path
import goalImage from '../assets/FinancialGoals.png';
import infoImage from '../assets/FinancialInfo.png';
import savingsImage from '../assets/FinancialSavings.png';
>>>>>>> a48d690 (Updated the welcome and sign up pages)
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

<<<<<<< HEAD
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
=======
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
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>
                                    About Us
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/features')}>
                                    Features
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                                    Login
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                                    Sign Up
                                </span>
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
                            Feeling overwhelmed by managing your finances? <strong>We get it.</strong>
                            That’s why we created Harmoney — a personalized approach to help you achieve your financial goals.
                        </p>
                        <button
                            className="btn btn-warning px-4 py-2 fw-semibold mt-3"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started Today
                        </button>
                    </div>

                    {/* Right Glass Cards */}
                    {/* Right Glass Cards */}
                    <div className="col-md-6 d-flex flex-column align-items-center gap-3">
                        {/* Card 2 */}
                        <div className="glass-card p-4 rounded-4 text-dark w-75 shadow mt-2 ms-5 text-center">
                            <img src={infoImage} alt="Global Users" className="mb-2" style={{ width: '40px' }} />
                            <p className="fw-semibold mb-0">Get personalised inputs based on financial information</p>
                        </div>

                        <div className="glass-card p-4 rounded-4 text-dark w-75 shadow text-center">
                            <img src={goalImage} alt="Track Goals" className="mb-3" style={{ width: '40px' }} />
                            <p className="mb-1 fw-medium">Set Goals And Track Your Progress Easily</p>
                            <p className="text-end fw-bold">$3,000.00</p>
                        </div>

                        {/* Card 3 */}
                        <div className="glass-card p-4 rounded-4 text-dark w-75 shadow text-center">
                            <img src={savingsImage} alt="Invest" className="mb-3" style={{ width: '40px' }} />
                            <p className="mb-0 fw-medium">Get motivated to save with Harmoney</p>
                        </div>
                    </div>
                </div>
            </div>
>>>>>>> a48d690 (Updated the welcome and sign up pages)
        </div>
    );
};

export default WelcomePage;
