
// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Harmoneylogo from '../assets/logo.png';
// import '../styles/HomePage.css';

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
            <li><a href="#" className="nav-link px-4" style={{ color: 'black', fontSize: '17px' }}>Home</a></li>
            <li><a href="#" className="nav-link px-4" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/goals')}>Goals</a></li>
            <li><a href="#" className="nav-link px-4" style={{ color: '#7f56d9ff', fontSize: '17px' }}>Chat</a></li>
          </ul>

          <div className="col-md-3 text-end">
            <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Logout</button>
          </div>
        </header>
      </div>

      {/* Welcome Hero Section */}
      <div className="px-4 pt-5 my-5 text-center border-bottom" style={{ background: ' #F3F0FF'}}>
        <h1 className="display-4 fw-bold text-body-emphasis">Start saving now!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Get ready to unpack your financial goals and bring clarity to your future with Harmoney.
            Whether you're dreaming of a relaxing vacation, buying your first home, or planning a secure retirement — we’re here to guide every step of your journey.
            With smart tracking, tailored insights, and goal-oriented planning, Harmoney helps you turn your dreams into achievable milestones.
            Let us lead you to financial harmony — one goal at a time.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button type="button" className="btn btn-lg px-4 me-sm-3" style={{backgroundColor:'#7f56d9ce'}}onClick={() => navigate('/goals')} >Shoot your first goal today!</button>
            {/* <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button> */}
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
          {/* <div className="container px-5">
            <img src="bootstrap-docs.png" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example" width="700" height="500" loading="lazy" />
          </div> */}
        </div>
      </div>

      {/* Quote Section */}
      <section className="text-center py-4 px-3" style={{ background: '#F3F0FF' }}>
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

