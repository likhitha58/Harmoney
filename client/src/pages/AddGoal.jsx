import React, { useState } from "react";
import axios from "axios";

const AddGoal = () => {
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentSavings: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    months: "",
  });
  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/goals",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Response from backend:", res.data); // <--- ADD THIS
    setPlan(res.data.savingsPlan);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="p-4">
      <h2>Add Goal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <input type="number" name="targetAmount" placeholder="Target Amount" onChange={handleChange} />
        <input type="number" name="currentSavings" placeholder="Current Savings" onChange={handleChange} />
        <input type="number" name="monthlyIncome" placeholder="Monthly Income" onChange={handleChange} />
        <input type="number" name="monthlyExpenses" placeholder="Monthly Expenses" onChange={handleChange} />
        <input type="number" name="months" placeholder="Months" onChange={handleChange} />
        <button type="submit">Save Goal</button>
      </form>

      {plan && (
        <div className="mt-4">
          <h3>Savings Plan</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount to Save</th>
              </tr>
            </thead>
            <tbody>
              {plan.map((p, i) => (
                <tr key={i}>
                  <td>{p.month}</td>
                  <td>{p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddGoal;
