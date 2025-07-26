import React, { useState } from 'react';
import '../styles/SecurityQuestions.css';
import loginSideImage from '../assets/loginSideImage.png';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyAnswers = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email');
      return;
    }

    // Just move to step 2; actual verification happens during final reset
    setStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-security-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          answers: [answers.q1, answers.q2, answers.q3],
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Password reset successful');
        navigate('/login');
      } else {
        alert(data.message || 'Password reset failed');
        setStep(1); // Go back to step 1 if incorrect
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="glass-container d-flex justify-content-center align-items-center" style={{ marginTop: 100 }}>
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
          {step === 1 ? (
            <>
              <h3 className="fw-bold mb-2">Forgot Password</h3>
              <p className="text-muted mb-4">Enter your email and answer the security questions.</p>

              <form onSubmit={handleVerifyAnswers}>
                <input
                  type="email"
                  placeholder="Registered Email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
                  What is your best friend's last name?
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

                <button type="submit" className="submit-btn">Next</button>
              </form>
            </>
          ) : (
            <>
              <h3 className="fw-bold mb-2">Reset Password</h3>
              <p className="text-muted mb-4">Enter your new password below</p>

              <form onSubmit={handleResetPassword}>
                <input
                  type="password"
                  placeholder="New Password"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button type="submit" className="submit-btn">Reset Password</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
