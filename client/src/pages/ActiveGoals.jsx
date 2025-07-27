import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Harmoneylogo from "../assets/logo.png";
import "../styles/activeGoals.css";

const ActiveGoals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (err) {
        console.error("Error fetching active goals", err);
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
                        style={{ backgroundColor: '#7F56D9',color:'white'}}
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

export default ActiveGoals;
