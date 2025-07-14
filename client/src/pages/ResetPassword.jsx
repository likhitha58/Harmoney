import React, { useState } from 'react';
import '../styles/SecurityQuestions.css';
import loginSideImage from '../assets/loginSideImage.png';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Questions | Step 2: Reset Password

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
              <p className="text-muted mb-4">Answer the security questions to reset your password</p>

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="security-question-box">
                  What was the name of your first school?
                </div>
                <input type="text" placeholder="Your Answer" className="form-input" required />

                <hr />

                <div className="security-question-box">
                  What is your best friend's last name?
                </div>
                <input type="text" placeholder="Your Answer" className="form-input" required />

                <hr />

                <div className="security-question-box">
                  What is your first paycheck amount?
                </div>
                <input type="text" placeholder="Your Answer" className="form-input" required />

                <button type="submit" className="submit-btn">Verify</button>
              </form>
            </>
          ) : (
            <>
              <h3 className="fw-bold mb-2">Reset Password</h3>
              <p className="text-muted mb-4">Enter your new password below</p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Password reset successful'); navigate('/login'); }}>
                <input type="password" placeholder="New Password" className="form-input" required />
                <input type="password" placeholder="Confirm New Password" className="form-input" required />

                <button type="submit" className="submit-btn" onClick={() => navigate('/login')}>Reset Password </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
