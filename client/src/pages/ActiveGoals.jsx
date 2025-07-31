import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Footer from "../components/Footer";
import Harmoneylogo from "../assets/logo.png";
import { toast } from "react-toastify";
import "../styles/activeGoals.css";

const ActiveGoals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/goals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGoals(res.data);
      } catch (err) {
        toast.error("Error fetching active goals", err);
        if (err.response?.status === 401) {
          // Token invalid or expired
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

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
      <main
        className="goal-container container"
        style={{ backgroundColor: "rgb(243, 240, 255)" }}
      >
        <div className="glass-panel p-4">
          <h2 className="mb-4 text-center">Your Active Goals</h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : goals.length === 0 ? (
            <p className="text-center">
              You don’t have any active goals yet. Create one to get started!
            </p>
          ) : (
            <div className="row">
              {goals.map((goal) => (
                <div className="col-md-6 mb-4" key={goal._id}>
                  <div className="card h-100 shadow-sm border-0">
                    {/* DreamFrame Image */}
                    {goal.dreamImage && (
                      <img
                        src={goal.dreamImage}
                        alt="Dream visualization"
                        className="card-img-top"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "0.25rem",
                          borderTopRightRadius: "0.25rem",
                        }}
                      />
                    )}

                    <div className="card-body">
                      <h5 className="card-title" style={{ color: "#7f56d9" }}>
                        {goal.title}
                      </h5>
                      <p className="card-text">{goal.description}</p>
                      <p>
                        <strong>Target:</strong> ₹{goal.targetAmount}
                      </p>
                      <p>
                        <strong>Duration:</strong> {goal.months} months
                      </p>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#7F56D9", color: "white" }}
                        onClick={() =>
                          navigate(`/activegoals/${goal._id}`)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ActiveGoals;
