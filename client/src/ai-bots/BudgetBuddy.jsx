import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";  // <-- ADD
import Harmoneylogo from "../assets/logo.png";
import budgetbuddy from "../assets/bb.png";
import "../styles/budgetBuddy.css";
import Footer from "../components/Footer";

const BudgetBuddy = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m BudgetBuddy. Ask me anything about your savings plan or personal finance." }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) {
      toast.warning("Please enter a question before sending.", {
        className: "custom-toast warning",
      });
      return;
    }

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/chat",
        { question: userInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.answer }
      ]);

      toast.success("Response received!", {
        className: "custom-toast success",
      });
    } catch (err) {
      console.error("Error with chatbot", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, I couldn’t respond. Please try again later." }
      ]);

      toast.error("Failed to fetch response. Please try again.", {
        className: "custom-toast error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* NAVBAR */}
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
                    <button className="nav-link px-4 btn btn-link" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={() => navigate('/dreamframe')}>DreamFrame</button>
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
      {/* (Navbar code remains unchanged) */}

      {/* CHAT CONTENT */}
      <main
        className="goal-container container"
        style={{ backgroundColor: "rgb(243, 240, 255)" }}
      >
        <div className="budget-buddy-bg py-5" style={{ backgroundColor: 'var(--light-purple)', minHeight: '80vh' }}>
          <Container>
            <h1 className="text-center text-purple mb-4 fw-bold">
              BudgetBuddy
              <img
                src={budgetbuddy}
                alt="Budget Buddy"
                width="60"
                height="60"
                style={{ background: 'transparent', mixBlendMode: 'multiply', marginLeft: '10px' }}
              />
            </h1>
            <p className="text-center text-muted mb-5">
              Your smart personal finance assistant
            </p>

            <Card className="shadow-lg p-4 chatbot-card" style={{ maxWidth: '700px', margin: '0 auto', borderRadius: '20px' }}>
              <div
                className="chat-window mb-3 p-3"
                style={{
                  background: '#fdfdfd',
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  height: '400px',
                  overflowY: 'auto'
                }}
              >
                {messages.length === 0 && (
                  <div className="text-center text-muted">
                    Start a conversation with BudgetBuddy!
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message mb-3 ${msg.sender}`}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '10px 15px',
                        borderRadius: '15px',
                        backgroundColor: msg.sender === 'user' ? 'var(--purple)' : '#eae6ff',
                        color: msg.sender === 'user' ? 'white' : '#333',
                        whiteSpace: 'pre-wrap',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                    >
                      <strong style={{ fontSize: '0.9rem' }}>
                        {msg.sender === 'user' ? 'You' : 'BudgetBuddy'}
                      </strong>
                      <div style={{ fontSize: '0.95rem', marginTop: '5px' }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <InputGroup>
                <FormControl
                  placeholder="Ask something about your finances..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  style={{ borderRadius: '12px 0 0 12px' }}
                />
                <Button
                  variant="primary"
                  className="btn-purple"
                  onClick={handleSend}
                  disabled={loading}
                  style={{ borderRadius: '0 12px 12px 0', backgroundColor: 'var(--purple)', borderColor: 'var(--purple)' }}
                >
                  {loading ? "..." : "Send"}
                </Button>
              </InputGroup>
            </Card>
          </Container>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetBuddy;
