import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";

const AddGoal = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    monthlyExpenses: "",
    currentSavings: "",
    targetAmount: "",
    months: "",
    riskProfile: "Balanced",
    ageGroup: "26-35",
  });

  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
      const res = await axios.post("/api/budget-plan", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlan(res.data);
    } catch (err) {
      console.error("Error generating plan", err);
      alert("Failed to generate plan. Check console for details.");
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: "700px" }}>
      <Card className="p-4 shadow-lg">
        <h3 className="mb-3 text-center">Personalized Savings Plan</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Monthly Net Income (₹)</Form.Label>
            <Form.Control
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Monthly Expenses (₹)</Form.Label>
            <Form.Control
              type="number"
              name="monthlyExpenses"
              value={formData.monthlyExpenses}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Current Savings (₹)</Form.Label>
            <Form.Control
              type="number"
              name="currentSavings"
              value={formData.currentSavings}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time Horizon (Months)</Form.Label>
            <Form.Control
              type="number"
              name="months"
              value={formData.months}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Risk Profile</Form.Label>
            <Form.Select
              name="riskProfile"
              value={formData.riskProfile}
              onChange={handleChange}
            >
              <option value="Conservative">Conservative</option>
              <option value="Balanced">Balanced</option>
              <option value="Aggressive">Aggressive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age Group</Form.Label>
            <Form.Select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
            >
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-60">46-60</option>
              <option value="60+">60+</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="primary">
              Generate Plan
            </Button>
          </div>
        </Form>
      </Card>

      {plan && plan.savingsPlan && (
        <Card className="p-4 mt-4 shadow-sm">
          <h4 className="mb-3">Recommended Savings Plan</h4>
          <p>
            <strong>Target:</strong> ₹{plan.targetAmount} in {plan.months} months
          </p>
          <p>
            <strong>Risk Profile:</strong> {plan.riskProfile} |{" "}
            <strong>Age Group:</strong> {plan.ageGroup}
          </p>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
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
        </Card>
      )}
    </Container>
  );
};

export default AddGoal;
