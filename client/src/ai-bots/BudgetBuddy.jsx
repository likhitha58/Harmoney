import React, { useState } from 'react';
import '../styles/budgetBuddy.css';
import { Container, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import Harmoneylogo from '../assets/logo.png';
import budgetbuddy from '../assets/bb.png';
import { useNavigate } from 'react-router-dom';

const BudgetBuddy = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleSend = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    const botReply = getBotReply(userInput);
    newMessages.push({ sender: 'bot', text: botReply });

    setMessages(newMessages);
    setUserInput('');
  };

  const getBotReply = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('budget'))
      return "Sure! What's your monthly income and expenses?";
    else if (lower.includes('save'))
      return 'Start by tracking your small expenses and set a savings goal.';
    else if (lower.includes('goal'))
      return 'Try creating SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound.';
    else
      return "I'm BudgetBuddy! Ask me anything about finances, saving, budgeting, or expense tracking.";
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a href="/" className="d-inline-flex align-items-center text-decoration-none">
              <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
            </a>
          </div>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9', fontSize: '17px' }}
                onClick={() => navigate('/home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9', fontSize: '17px' }}
                onClick={() => navigate('/activegoals')}
              >
                Active goals
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9', fontSize: '17px' }}
                onClick={() => navigate('/pastgoals')}
              >
                Achieved goals
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9', fontSize: '17px' }}
                onClick={() => navigate('/budgetbuddy')}
              >
                Chat
              </button>
            </li>
            <li>
              <button
                className="nav-link px-4 btn btn-link"
                style={{ color: '#7f56d9', fontSize: '17px' }}
                onClick={() => navigate('/dreamframe')}
              >
                DreamFrame
              </button>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Logout</button>
          </div>
        </header>
      </div>

      {/* BUDGET BUDDY CHAT */}
      <div className="budget-buddy-bg py-5" style={{ backgroundColor: 'var(--light-purple)', minHeight: '80vh' }}>
        <Container>
          <h1 className="text-center text-purple mb-4 fw-bold">BudgetBuddy<img src={budgetbuddy} alt="Budget Buddy" width="60" height="60" style={{background:'transparent',mixBlendMode:'multiply'}}></img></h1>
          <p className="text-center text-muted mb-5">Your smart personal finance assistant</p>

          <Card className="shadow-lg p-4 chatbot-card">
            <div className="chat-window mb-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender}`}>
                  <strong>{msg.sender === 'user' ? 'You' : 'BudgetBuddy'}:</strong> {msg.text}
                </div>
              ))}
            </div>

            <InputGroup>
              <FormControl
                placeholder="Ask something about your finances..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="primary" className="btn-purple" onClick={handleSend}>
                Send
              </Button>
            </InputGroup>
          </Card>
        </Container>
      </div>

      {/* FOOTER */}
      <footer className="text-center border-top py-4 mt-4 bg-white">
        <img src={Harmoneylogo} alt="Harmoney" width="40" height="40" className="mb-2" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.</p>
        <small className="text-muted">Built with 💜 to help you achieve your dreams.</small>
      </footer>
    </>
  );
};

export default BudgetBuddy;
