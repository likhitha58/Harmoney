import React from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import '../styles/Login.css';

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="login-glass shadow-lg rounded-4 overflow-hidden w-100 mx-2" style={{ maxWidth: '1000px' }}>
          {/* Left Side */}
          <Col md={6} className="login-left d-flex align-items-center justify-content-center p-4">
            <div className="shield-overlay">
              {/* You can replace this with animated SVG or CSS graphic later */}
              <div className="shield-outline"></div>
            </div>
          </Col>

          {/* Right Side - Form */}
          <Col md={6} className="bg-white p-5">
            <h2 className="mb-3 text-center text-dark">Welcome Back</h2>
            <p className="text-center text-muted mb-4">Securely manage and grow your savings with Harmoney.</p>

            <Button variant="primary" className="w-100 mb-3">
              <i className="bi bi-google me-2"></i> Sign in with Google
            </Button>

            <div className="text-center mb-3 text-muted">— OR —</div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="you@example.com" />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="#" className="text-primary small">Forgot Password?</a>
              </div>

              <Button variant="success" className="w-100">Log In</Button>

              <div className="text-center mt-3">
                <small>Don't have an account?</small><br />
                <Button variant="link">Register</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
