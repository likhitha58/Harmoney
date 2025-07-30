import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from "../components/Footer";
import Harmoneylogo from '../assets/logo.png';
import '../styles/GoalsPage.css';

const GoalsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('yourGoals');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    amount: '',
  });

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    console.log('New Goal Added:', newGoal);
    setNewGoal({ title: '', description: '', targetDate: '', amount: '' });
  };

  return (
    <>
      {/* NAVBAR */}
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
                style={{ color: '#7f56d9ff', fontSize: '17px' }}
                onClick={() => navigate('/home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9ff', fontSize: '17px' }}
                onClick={() => navigate('/activegoals')}
              >
                Active goals
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9ff', fontSize: '17px' }}
                onClick={() => navigate('/pastgoals')}
              >
                Achieved goals
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

      {/* HERO SECTION */}
      <div className="background-abstract position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
        <div className="col-md-6 p-lg-5 mx-auto my-3">
          <h1 className="display-3 fw-bold" style={{ fontSize: 50 }}>
            Harmoney inspires you to grow towards your aspirations through our image generator.
          </h1>
          <h2 className="fw-normal text-muted mb-3">
            DreamFrame - See yourself achieve your goal
          </h2>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <button
              onClick={() => navigate('/dreamframe')}
              style={{
                backgroundColor: '#7F56D9',
                color: '#ffffff',
                fontSize: '18px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              DreamFrame
            </button>

            <button
              onClick={() => navigate('/add-goal')}
              style={{
                backgroundColor: '#ffffffff',
                color: '#000000',
                fontSize: '18px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Add Goal
            </button>
          </div>
        </div>

        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default GoalsPage;
