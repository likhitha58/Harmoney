import React from 'react';
import '../styles/SecurityQuestions.css';
import loginSideImage from '../assets/loginSideImage.png';
import { useNavigate } from 'react-router-dom';

const SecurityQuestions = () => {
    const navigate = useNavigate();

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

                    <h3 className="fw-bold mb-2">Security Questions</h3>
                    <p className="text-muted mb-4">Set an answer to the questions to ensure account recoverability</p>

                    <form>
                        <div className="security-question-box">
                            What was the name of your first school?
                        </div>
                        <input
                            type="text"
                            placeholder="Your Answer"
                            className="form-input"
                            required
                        />
                        <hr></hr>
                        <div className="security-question-box">
                            What is your bestfriend's last name?
                        </div>
                        <input
                            type="text"
                            placeholder="Your Answer"
                            className="form-input"
                            required
                        />
                        <hr></hr>
                        <div className="security-question-box">
                            What is your first paycheck amount?
                        </div>
                        <input
                            type="text"
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
