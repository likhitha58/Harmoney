import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Harmoneylogo from "../assets/logo.png";
import "../styles/activeGoals.css";

const ActiveGoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/goals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Find this goal by ID
        const selected = res.data.find((g) => g._id === id);
        setGoal(selected);
      } catch (err) {
        console.error("Error fetching goal details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

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
              style={{ color: "#7f56d9ff", fontSize: "17px" }}
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "17px" }}
              onClick={() => navigate("/activegoals")}
            >
              Active goals
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "17px" }}
              onClick={() => navigate("/pastgoals")}
            >
              Achieved goals
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "17px" }}
              onClick={() => navigate("/budgetbuddy")}
            >
              Chat
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7f56d9ff", fontSize: "17px" }}
              onClick={() => navigate("/dreamframe")}
            >
              Dream Frame
            </button>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <button
            className="btn me-2"
            onClick={() => navigate("/login")}
            style={{ background: "#7f56d955" }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main
        className="goal-container container"
        style={{ backgroundColor: "rgb(243, 240, 255)" }}
      >
        <div className="glass-panel p-4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : !goal ? (
            <p className="text-center">Goal not found.</p>
          ) : (
            <>
              {/* Dream Image */}
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
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}
                  />
                </div>
              )}

              <h2 className="mb-4 text-center">{goal.title}</h2>
              <p className="text-center">{goal.description}</p>
              <p className="text-center">
                <strong>Target:</strong> ₹{goal.targetAmount} in {goal.months} months
              </p>

              {goal.savingsPlan && (
                <>
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
                        {goal.savingsPlan.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.month}</td>
                            <td>{item.amount.toLocaleString()}</td>
                            <td>{item.allocation || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-center mt-4">
                    <p>
                      Need help understanding or sticking to this plan? <br />
                      Chat with <strong>BudgetBuddy</strong> for advice and tips.
                    </p>
                    <button
                      className="btn"
                      style={{ backgroundColor: '#7F56D9', color: 'white' }}
                      onClick={() => navigate("/budgetbuddy")}
                    >
                      Ask BudgetBuddy
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center border-top py-4 mt-4">
        <img
          src={Harmoneylogo}
          alt="Harmoney"
          width="40"
          height="40"
          className="mb-2"
        />
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.
        </p>
        <small className="text-muted">
          Built with 💜 to help you achieve your dreams.
        </small>
      </footer>
    </div>
  );
};

export default ActiveGoalDetails;
