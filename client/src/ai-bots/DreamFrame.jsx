import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import axios from 'axios';
import Harmoneylogo from '../assets/logo.png';
import homeImg from '../assets/home.jpg';
import gradImg from '../assets/grad.png';
import vacationImg from '../assets/travel.png';
import retireImg from '../assets/retire.png';
import budgetImg from '../assets/budget.png';
import businessImg from '../assets/business.png';
import dreamframe from '../assets/FRAME.png';
import { toast } from "react-toastify";
import '../styles/dreamFrame.css';

const DreamFrame = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeGoals, setActiveGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("");

  const sampleImages = [
    homeImg,
    gradImg,
    vacationImg,
    retireImg,
    budgetImg,
    businessImg,
  ];

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/goals", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Active goals fetched:", res.data);
        setActiveGoals(res.data || []);
      } catch (err) {
        toast.error("Failed to load goals", err);
      }
    };
    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.warning("Please enter a dream prompt", "warning");
      return;
    }

    if (!selectedGoal) {
      toast.warning("Please select a goal", "warning");
      return;
    }

    try {
      setLoading(true);
      setGeneratedImage(null);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/api/dreamframe/generate",
        { prompt, goalId: selectedGoal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGeneratedImage(res.data.imageUrl);
      toast.success("Dream image generated successfully!", "success");
    } catch (error) {
      console.error("Error generating image", error);
      toast.error("Failed to generate dream image. Please try again.", "error");
    } finally {
      setLoading(false);
    }
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
            <Form.Group controlId="goalSelect" className="mb-3">
              <Form.Label className="form-label-purple">Select a goal</Form.Label>
              <Form.Select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
              >
                <option value="">-- Choose a goal --</option>
                {activeGoals.length === 0 ? (
                  <option disabled>No active goals found</option>
                ) : (
                  activeGoals.map((goal) => (
                    <option key={goal._id} value={goal._id}>
                      {goal.title || `Goal (${goal._id})`}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="dreamText">
              <Form.Label className="form-label-purple">Enter your dream prompt</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Describe yourself when you achieve your goal"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="mt-3" style={{ backgroundColor: '#7f56d9ce' }}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </Form>

          {generatedImage && (
            <div className="mt-4">
              <h5>Your Dream Visualization</h5>
              <img
                src={generatedImage}
                alt="Dream"
                style={{ maxWidth: '50%', borderRadius: '12px', marginTop: '15px' }}
              />
            </div>
          )}
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

      <Footer />
    </>
  );
};

export default DreamFrame;
