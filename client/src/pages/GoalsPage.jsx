import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a href="/" className="d-inline-flex align-items-center text-decoration-none">
              <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-4" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/home')}>Home</a>
            </li>
            <li>
              <a href="#" className="nav-link px-4" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/activegoals')}>Active goals</a>
            </li>
            <li>
              <a href="#" className="nav-link px-4" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/pastgoals')}>Achieved goals</a>
            </li>
            <li>
              <a href="#" className="nav-link px-4" style={{ color: '#7f56d9ff', fontSize: '17px' }}>Chat</a>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Logout</button>
          </div>
        </header>
      </div>

      <div className="background-abstract position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold" style={{ fontSize: 60 }}>Harmoney inspires you to grow towards your asprirations through our image generator.</h1>
          <h2 className="fw-normal text-muted mb-3">DreamFrame - See yourself achieve your goal</h2>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <button
              onClick={() => window.location.href = '/dreamframe'}
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
              onClick={() => window.location.href = '/add-goal'}
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


      <footer className="text-center border-top py-4 mt-4">
        <img src={Harmoneylogo} alt="Harmoney" width="40" height="40" className="mb-2" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.</p>
        <small className="text-muted">Built with 💜 to help you achieve your dreams.</small>
      </footer>
    </>
  );
};

export default GoalsPage;
