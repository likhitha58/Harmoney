import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Harmoneylogo from '../assets/logo.png';
import homeImg from '../assets/home.jpg';
import gradImg from '../assets/grad.png';
import vacationImg from '../assets/travel.png';
import retireImg from '../assets/retire.png';
import budgetImg from '../assets/budget.png';
import businessImg from '../assets/business.png';
import dreamframe from '../assets/FRAME.png';
import '../styles/dreamFrame.css';

const DreamFrame = () => {
  const navigate = useNavigate();

  const sampleImages = [
    homeImg,
    gradImg,
    vacationImg,
    retireImg,
    budgetImg,
    businessImg,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to generate an image based on the input
    console.log("Generate image button clicked");
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
              <button className="nav-link px-4 btn btn-link" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/home')}>Home</button>
            </li>
            <li>
              <button className="nav-link px-4 btn btn-link" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/activegoals')}>Active goals</button>
            </li>
            <li>
              <button className="nav-link px-4 btn btn-link" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/pastgoals')}>Achieved goals</button>
            </li>
            <li>
              <button className="nav-link px-4 btn btn-link" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/budgetbuddy')}>Chat</button>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Logout</button>
          </div>
        </header>
      </div>

      {/* FORM SECTION */}
      <div className="container my-5 jumbotron-custom">
        <div className="p-5 text-center rounded-3">
          <img src={dreamframe} alt="Dream Frame" width="60" height="60" style={{ background: 'transparent', mixBlendMode: 'multiply' }} />
          <h1 className="jumbotron-title">Welcome to DreamFrame!</h1>
          <p className="lead jumbotron-text">
            Sometimes making the first move takes courage.
            <br /> Harmoney allows you to visualize your dreams and goals in a way that is both engaging and inspiring.
            <br /> Enter a dream prompt below to generate a meaningful image.
          </p>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group controlId="dreamText">
              <Form.Label className="form-label-purple">Enter your dream prompt</Form.Label>
              <Form.Control type="text" placeholder="e.g., Describe yourself when you achieve your goal" />
            </Form.Group>
            <Button type="submit" className="mt-3" style={{ backgroundColor: '#7f56d9ce' }}>Generate Image</Button>
          </Form>
        </div>
      </div>

      {/* SCROLLING IMAGE STRIP */}
      <h2 className="text-center section-heading">See What Achieved Goals Look Like</h2>
      <div className="overflow-hidden py-5 image-strip-wrapper">
        <div className="scrolling-track">
          {[...sampleImages, ...sampleImages].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`generated ${i}`}
              className="scroll-img"
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center border-top py-4 mt-4">
        <img src={Harmoneylogo} alt="Harmoney" width="40" height="40" className="mb-2" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.</p>
        <small className="text-muted">Built with 💜 to help you achieve your dreams.</small>
      </footer>
    </>
  );
};

export default DreamFrame;
