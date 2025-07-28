import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import '../styles/addGoal.css';
import Harmoneylogo from "../assets/logo.png"; // adjust path

const AddGoal = () => {
  const navigate = useNavigate();
  const [showSideIncome, setShowSideIncome] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    monthlyIncome: "",
    sideIncome: "",
    monthlyExpenses: "",
    currentSavings: "",
    targetAmount: "",
    months: "",
    riskProfile: "Balanced",
    ageGroup: "26-35",
  });

  const [plan, setPlan] = useState(null);

  // Retrieve user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSideIncomeChoice = (choice) => {
    setShowSideIncome(choice === "yes");
    if (choice === "no") {
      setFormData({ ...formData, sideIncome: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/goals/budget-plan",
        {
          ...formData,
          monthlyIncome: Number(formData.monthlyIncome) + (Number(formData.sideIncome) || 0),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlan(res.data);
    } catch (err) {
      console.error("Error generating plan", err);
    }
  };

  return (
    <div className="container">
      {/* HEADER */}
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
          {user?.name ? (
            <Dropdown align="end">
              <Dropdown.Toggle style={{ background: '#7f56d9ce' }}>
                Hi, {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ background: '#7f56d955' }}>
                <Dropdown.Item onClick={() => navigate('/account')}>Account</Dropdown.Item>
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
              onClick={() => navigate("/login")}
              style={{ background: "#7f56d955" }}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* CONTENT */}
      <main className="goal-container container" style={{ backgroundColor: 'rgb(243, 240, 255)' }}>
        <div className="glass-panel p-4">
          <h2 className="mb-4 text-center">Create Your Goal Plan</h2>
          <form onSubmit={handleSubmit} className="goal-form">
            <div className="mb-3">
              <label className="form-label">Goal Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Eg: Buy a car, Emergency fund..."
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-control"
                rows="2"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Why are you saving for this goal?"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Monthly Net Income (₹)</label>
              <input
                type="number"
                className="form-control"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                required
              />
            </div>

            {/* Side income */}
            <div className="mb-3">
              <label className="form-label">Do you have a side income?</label>
              <div>
                <label className="me-3">
                  <input
                    type="radio"
                    name="sideIncomeOption"
                    onChange={() => handleSideIncomeChoice("yes")}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="sideIncomeOption"
                    onChange={() => handleSideIncomeChoice("no")}
                  />{" "}
                  No
                </label>
              </div>
              {showSideIncome && (
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Enter your side income (₹)"
                  value={formData.sideIncome}
                  name="sideIncome"
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Monthly Expenses (₹)</label>
              <input
                type="number"
                className="form-control"
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Current Savings (₹)</label>
              <input
                type="number"
                className="form-control"
                name="currentSavings"
                value={formData.currentSavings}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Target Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Months to Achieve</label>
              <input
                type="number"
                className="form-control"
                name="months"
                value={formData.months}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Approach (Easy explanation)</label>
              <select
                className="form-select"
                name="riskProfile"
                value={formData.riskProfile}
                onChange={handleChange}
              >
                <option value="Safe & Steady">Safe & Steady (Low risk)</option>
                <option value="Balanced">Balanced (Moderate)</option>
                <option value="Fast Track">Fast Track (High growth)</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4">
                Generate Plan
              </button>
            </div>
          </form>
        </div>

        {plan && plan.savingsPlan && (
          <div className="glass-panel mt-4 p-4">
            <h4 className="mb-3 text-center">Your Simple Savings Plan</h4>
            <p className="text-muted">
              <strong>Amount to Save:</strong> How much you should put aside each month.
              <br />
              <strong>Recommended Allocation:</strong> A suggested way to divide your savings (optional).
            </p>

            <p>
              <strong>Goal:</strong> {plan.title} – {plan.description}
            </p>
            <p>
              <strong>Target:</strong> ₹{plan.targetAmount} in {plan.months} months
            </p>

            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Amount to Save (₹)</th>
                    <th>Recommended Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.savingsPlan.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.month}</td>
                      <td>{item.amount.toLocaleString()}</td>
                      <td>{item.allocation || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save Goal Button */}
            <div className="text-center mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => navigate("/activegoals")}
              >
                Save Goal
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/budgetbuddy")}
              >
                Ask BudgetBuddy
              </button>
            </div>
          </div>
        )}

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

export default AddGoal;
