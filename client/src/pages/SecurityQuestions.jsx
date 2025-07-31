import React, { useState } from 'react';
import '../styles/SecurityQuestions.css';
import loginSideImage from '../assets/loginSideImage.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const SecurityQuestions = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email; // email passed from signup page

  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning('Email not found. Please sign up again.');
      navigate('/signup');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/security-question', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          securityQuestions: [
            {
              question: "What was the name of your first school?",
              answer: answers.q1,
            },
            {
              question: "What is your bestfriend's last name?",
              answer: answers.q2,
            },
            {
              question: "What is your first paycheck amount?",
              answer: answers.q3,
            },
          ],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Security questions saved successfully!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Failed to save security questions');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div
      className="glass-container d-flex justify-content-center align-items-center"
      style={{ marginTop: 100 }}
    >
      <div className="glass-card d-flex shadow-lg">
        {/* Left Image */}
        <div className="glass-image">
          <img
            src={loginSideImage}
            alt="Side"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Right Form */}
        <div className="glass-form p-4">
          <h3 className="fw-bold mb-2">Security Questions</h3>
          <p className="text-muted mb-4">
            Set an answer to these questions to ensure account recoverability
          </p>

          <form onSubmit={handleSubmit}>
            <div className="security-question-box">
              What was the name of your first school?
            </div>
            <input
              type="text"
              name="q1"
              value={answers.q1}
              onChange={handleChange}
              placeholder="Your Answer"
              className="form-input"
              required
            />
            <hr />
            <div className="security-question-box">
              What is your bestfriend's last name?
            </div>
            <input
              type="text"
              name="q2"
              value={answers.q2}
              onChange={handleChange}
              placeholder="Your Answer"
              className="form-input"
              required
            />
            <hr />
            <div className="security-question-box">
              What is your first paycheck amount?
            </div>
            <input
              type="text"
              name="q3"
              value={answers.q3}
              onChange={handleChange}
              placeholder="Your Answer"
              className="form-input"
              required
            />
            <button type="submit" className="submit-btn">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuestions;
