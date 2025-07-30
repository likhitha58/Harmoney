// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from "../components/Footer";
import Harmoneylogo from '../assets/logo.png';
// import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main className="home-page">
      {/* Navbar */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <button
              className="btn btn-link p-0"
              onClick={() => navigate('/')}
              style={{ textDecoration: 'none' }}
            >
              <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
            </button>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: 'black', fontSize: '17px' }}
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9ff', fontSize: '17px' }}
                onClick={() => navigate('/goals')}
              >
                Goals
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9ff', fontSize: '17px' }}
                onClick={() => navigate('/budgetbuddy')}
              >
                Chat
              </button>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            {user?.name ? (
              <Dropdown align="end">
                <Dropdown.Toggle style={{ background: '#7f56d9ce' }}>
                  Hi, {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ background: '#7f56d955' }}>
                  <Dropdown.Item
                    onClick={() => {
                      navigate('/add-goal');
                    }}
                  >
                    Add Goal
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate('/dashboard')}>Dashboard</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.clear();
                      navigate('/login');
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button
                className="btn me-2"
                onClick={() => navigate('/login')}
                style={{ background: '#7f56d955' }}
              >
                Logout
              </button>
            )}
          </div>
        </header>
      </div>

      {/* Welcome Hero Section */}
      <div
        className="px-4 pt-5 my-5 text-center border-bottom"
        style={{ background: '#F3F0FF' }}
      >
        <h1 className="display-4 fw-bold text-body-emphasis">
          Start saving now!
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Get ready to unpack your financial goals and bring clarity to your
            future with Harmoney. Whether you're dreaming of a relaxing vacation,
            buying your first home, or planning a secure retirement — we’re here
            to guide every step of your journey. With smart tracking, tailored
            insights, and goal-oriented planning, Harmoney helps you turn your
            dreams into achievable milestones. Let us lead you to financial
            harmony — one goal at a time.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              className="btn btn-lg px-4 me-sm-3"
              style={{ backgroundColor: '#7f56d9ce' }}
              onClick={() => navigate('/goals')}
            >
              Shoot your first goal today!
            </button>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
          {/* Reserved for hero image */}
        </div>
      </div>

      {/* Quote Section */}
      <section className="text-center py-4 px-3" style={{ background: '#F3F0FF' }}>
        <h4 className="mb-4">💡 Why Set Financial Goals?</h4>
        <div className="row justify-content-center gap-3">
          {[
            '“You don’t need to be rich to save. You need a plan.”',
            '“Only 20% of people set goals — but 80% of them achieve more.”',
            '“Let Harmoney simplify your financial vision.”',
          ].map((quote, i) => (
            <div key={i} className="col-md-3 col-10">
              <blockquote className="quote-box">{quote}</blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default HomePage;
