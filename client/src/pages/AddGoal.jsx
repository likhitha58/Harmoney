import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Harmoneylogo from '../assets/logo.png';
import FinGoal from '../assets/goal.png';
import Findetails from '../assets/Findetails.png';
import { useNavigate } from 'react-router-dom';

const AddGoal = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        goalName: '',
        targetAmount: '',
        targetDate: '',
        income: '',
        expenses: '',
        savings: '',
        frequency: 'Monthly',
        startDate: '',
        goalType: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add API POST logic here
    };

    return (
        <>
            {/* Navbar */}
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <a href="/" className="d-inline-flex align-items-center text-decoration-none">
                            <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
                        </a>
                    </div>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <a href="#" className="nav-link px-4" style={{ color: '#7f56d9', fontSize: '17px' }} onClick={() => navigate('/home')}>Home</a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-4" style={{ color: '#7f56d9', fontSize: '17px' }} onClick={() => navigate('/activegoals')}>Active Goals</a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-4" style={{ color: '#7f56d9', fontSize: '17px' }} onClick={() => navigate('/pastgoals')}>Achieved Goals</a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-4" style={{ color: '#7f56d9', fontSize: '17px' }}>Chat</a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-4" style={{ color: '#7f56d9', fontSize: '17px' }} onClick={() => navigate('/dreamframe')}>DreamFrame</a>
                        </li>
                    </ul>

                    <div className="col-md-3 text-end">
                        <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Logout</button>
                    </div>
                </header>
            </div>

            {/* Form Layout */}
            <Container className="my-4">
                <Form onSubmit={handleSubmit}>
                    <Row className="g-4">

                        {/* Financial Details */}
                        <Col md={6}>
                            <Container className="p-4 rounded" style={{ background: '#F3F0FF' }}>
                                <div className="d-flex justify-content-center">
                                    <img src={Findetails} alt="Financial Icon" className="mb-3" style={{ width: '120px', height: '120px', background: 'transparent', mixBlendMode: 'multiply' }} />
                                </div>
                                <h4 className="mb-4 text-center">Financial Details</h4>

                                <Form.Group className="mb-3">
                                    <Form.Label>Monthly Income (₹)</Form.Label>
                                    <Form.Control type="number" name="income" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Monthly Expenses (₹)</Form.Label>
                                    <Form.Control type="number" name="expenses" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Current Savings (₹)</Form.Label>
                                    <Form.Control type="number" name="savings" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Start Saving From</Form.Label>
                                    <Form.Control type="date" name="startDate" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Saving Frequency</Form.Label>
                                    <Form.Select name="frequency" onChange={handleChange}>
                                        <option>Monthly</option>
                                        <option>Weekly</option>
                                    </Form.Select>
                                </Form.Group>
                            </Container>
                        </Col>
                        {/* Goal Details */}
                        <Col md={6}>
                            <Container className="p-4 rounded" style={{ background: '#F3F0FF' }}>
                                <div className="d-flex justify-content-center">
                                    <img src={FinGoal} alt="Goal Icon" className="mb-3" style={{ width: '120px', height: '120px', background: 'transparent', mixBlendMode: 'multiply' }} />
                                </div>
                                <h4 className="mb-4 text-center">Goal Details</h4>

                                <Form.Group className="mb-3">
                                    <Form.Label>Goal Name</Form.Label>
                                    <Form.Control type="text" name="goalName" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Goal Type</Form.Label>
                                    <Form.Select name="goalType" onChange={handleChange} required>
                                        <option value="">Select Type</option>
                                        <option>Travel</option>
                                        <option>Education</option>
                                        <option>Emergency</option>
                                        <option>Luxury</option>
                                        <option>Other</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Target Amount (₹)</Form.Label>
                                    <Form.Control type="number" name="targetAmount" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Target Date</Form.Label>
                                    <Form.Control type="date" name="targetDate" onChange={handleChange} required />
                                </Form.Group>
                            </Container>
                            <div className="text-center mt-4">
                                <Button type="submit" size="lg" style={{ padding: '20px 60px', background: '#7F56D9', border:'#7F56D9'}}>
                                    Save Goal
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <footer className="text-center border-top py-4 mt-4">
                    <img src={Harmoneylogo} alt="Harmoney" width="40" height="40" className="mb-2" />
                    <p className="mb-0">&copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.</p>
                    <small className="text-muted">Built with 💜 to help you achieve your dreams.</small>
                  </footer>
        </>
    );
};

export default AddGoal;
