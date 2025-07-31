import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Footer from "../components/Footer";
import Harmoneylogo from "../assets/logo.png";
import "../styles/activeGoals.css";
import confetti from "canvas-confetti";
import { toast } from "react-toastify";


const ActiveGoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/goals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const selected = res.data.find((g) => g._id === id);
        setGoal(selected);
      } catch (err) {
        console.error("Error fetching goal details", err);
        toast.error("Failed to fetch goal details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/goals/${id}`,
        {
          title: goal.title,
          description: goal.description,
          currentSavings: goal.currentSavings,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedGoal = res.data;

      if (updatedGoal.completed) {
        setShowEditModal(false);
        setCelebrationMessage(
          `🎉 Congratulations! You have successfully achieved your goal of "${updatedGoal.title}" 🎉`
        );

        // Confetti animation
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        });

        // Show toast
        toast.success(`Goal "${updatedGoal.title}" completed!`, "success");

        // Redirect after 2 seconds
        setTimeout(() => {
          setCelebrationMessage("");
          navigate("/pastgoals");
        }, 2000);
      } else {
        setShowEditModal(false);
        toast.success("Goal updated successfully", "success");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error updating goal", err);
      toast.error("Failed to update goal. Please try again.", "error");
    }
  };

  const handleDeleteGoal = async () => {
    if (!window.confirm("Are you sure you want to delete this goal? This action cannot be undone.")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowEditModal(false);
      toast.info("Goal deleted successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting goal", err);
      toast.error("Failed to delete goal. Please try again.", "error");
    }
  };

  return (
    <div className="container">
      {/* NAVBAR */}
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-white">
        <div className="col-md-3 mb-2 mb-md-0">
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/")}
            style={{ textDecoration: "none" }}
          >
            <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
          </button>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "16px" }}
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "16px" }}
              onClick={() => navigate("/activegoals")}
            >
              Active goals
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "16px" }}
              onClick={() => navigate("/pastgoals")}
            >
              Achieved goals
            </button>
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
                <Dropdown.Item
                  onClick={() => {
                    localStorage.clear();
                    navigate('/budgetbuddy');
                  }}
                >
                  BudgetBuddy
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    localStorage.clear();
                    navigate('/dreamframe');
                  }}
                >
                  DreamFrame
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

      {/* CONTENT */}
      <main className="goal-container container" style={{ backgroundColor: "rgb(243, 240, 255)" }}>
        <div className="glass-panel p-4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : !goal ? (
            <p className="text-center">Goal not found.</p>
          ) : (
            <>
              {goal.dreamImage && (
                <div className="text-center mb-4">
                  <img
                    src={goal.dreamImage}
                    alt="Dream visualization"
                    style={{
                      maxHeight: "300px",
                      maxWidth: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              )}

              <h2 className="mb-4 text-center">{goal.title}</h2>
              <p className="text-center">{goal.description}</p>
              <p className="text-center">
                <strong>Target:</strong> ₹{goal.targetAmount} in {goal.months} months
              </p>
              <p className="text-center">
                <strong>Current Savings:</strong> ₹{goal.currentSavings || 0}
              </p>

              <div className="text-center mb-4">
                <Button
                  style={{ backgroundColor: "#7F56D9", borderColor: "#7F56D9" }}
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Goal
                </Button>
              </div>

              {goal.savingsPlan && (
                <div className="table-responsive mt-4">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Amount to Save (₹)</th>
                        <th>Recommended Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {goal.savingsPlan.map((item, idx) => {
                        const amount = item.amount ?? item.amountToSave ?? 0;
                        return (
                          <tr key={idx}>
                            <td>{item.month || `Month ${idx + 1}`}</td>
                            <td>{amount.toLocaleString()}</td>
                            <td>{item.allocation || "N/A"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>

        {celebrationMessage && (
          <div className="text-center p-4 my-4" style={{ background: "#e6e1fc", borderRadius: "12px" }}>
            <h3 style={{ color: "#7F56D9" }}>{celebrationMessage}</h3>
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#7f56d9ce' }}>
          <Modal.Title>Edit Goal</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateGoal} style={{ background: '#7f56d955' }}>
          <Modal.Body>
            {goal && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={goal.title}
                    onChange={(e) => setGoal({ ...goal, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={goal.description}
                    onChange={(e) => setGoal({ ...goal, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Current Savings (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    value={goal.currentSavings || 0}
                    onChange={(e) => setGoal({ ...goal, currentSavings: Number(e.target.value) })}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ background: "#7f56d955" }} onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" style={{ background: "#7f56d9ce" }}>
              Save Changes
            </Button>
            <Button onClick={handleDeleteGoal} style={{ background: "black", border: "none" }}>
              Delete Goal
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ActiveGoalDetails;
