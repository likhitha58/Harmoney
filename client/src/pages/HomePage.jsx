// src/pages/HomePage.jsx
import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import Harmoneylogo from '../assets/logo.png';

const HomePage = () => {
 const navigate = useNavigate();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const handleClose = () => setShowAboutModal(false);
  const handleShow = () => setShowAboutModal(true);
  return (
    <main className="home-page">
      {/* Navbar */}
      <div className="container">
              <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                  <a href="/" className="d-inline-flex align-items-center text-decoration-none">
                    <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
                  </a>
                </div>
      
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="#" className="nav-link px-4 " style={{ color: 'black', fontSize: '17px' }}>Home</a></li>
                  <li><a href="#" className="nav-link px-4 " style={{ color: '#7f56d9ff', fontSize: '17px' }}>Goals</a></li>
                  <li><a href="#" className="nav-link px-4 " style={{ color: '#7f56d9ff', fontSize: '17px' }}>Chat</a></li>
                </ul>
      
                <div className="col-md-3 text-end">
                  <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Logout</button>
                </div>
              </header>
            </div>

      {/* Welcome Hero Section */}
      <section className="hero-section text-center py-5 px-3">
        <h1 className="display-5 fw-bold">Welcome back to Harmoney!</h1>
        <p className="lead mt-3 mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
          We know saving money isn’t always easy. But setting financial goals gives your money purpose.  
          You’ve come to the right place to take charge of your future.
        </p>
        <p className="mb-5 text-muted" style={{ fontSize: '18px' }}>
          Whether it’s a dream trip, a new gadget, or peace of mind — it starts with a plan.
        </p>
        <button className="btn btn-lg btn-success rounded-pill px-5 py-2" onClick={() => navigate('/create-goal')}>
          🎯 Shoot Your First Goal
        </button>
      </section>

      {/* Encouraging Section */}
      <section className="text-center py-4 px-3 bg-light">
        <h4 className="mb-4">💡 Why Set Financial Goals?</h4>
        <div className="row justify-content-center gap-3">
          <div className="col-md-3 col-10">
            <blockquote className="quote-box">
              “You don’t need to be rich to save. You need a plan.”
            </blockquote>
          </div>
          <div className="col-md-3 col-10">
            <blockquote className="quote-box">
              “Only 20% of people set goals — but 80% of them achieve more.”
            </blockquote>
          </div>
          <div className="col-md-3 col-10">
            <blockquote className="quote-box">
              “Let Harmoney simplify your financial vision.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center border-top py-4 mt-4">
        <img src={Harmoneylogo} alt="Harmoney" width="40" height="40" className="mb-2" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.</p>
        <small className="text-muted">Built with 💜 to help you achieve your dreams.</small>
      </footer>
    </main>
  );
};

export default HomePage;
