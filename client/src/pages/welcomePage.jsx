import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/WelcomePage.css';
import sideImage from '../assets/loginSideImage.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page d-flex">
      {/* Left Side Image */}
      <div className="welcome-left">
        <img src={sideImage} alt="welcome" className="img-fluid full-height-img" />
      </div>

      {/* Right Side Form */}
      <div className="welcome-right p-5">
        <h3 className="mb-4 text-uppercase">Sign Up for <span className="text-info">Harmoney</span></h3>
        <p className="text-muted mb-4">Create your account and start your savings journey today!</p>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="you@example.com" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create a password" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Re-enter your password" />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="light" className="me-2">Reset</Button>
            <Button variant="success">Create Account</Button>
          </div>
        </Form>

        <div className="mt-4 text-center">
          <small>Already have an account?</small><br />
          <Button variant="link" onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
