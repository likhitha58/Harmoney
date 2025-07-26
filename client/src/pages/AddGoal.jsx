import React, { useState } from 'react';

const AddGoal = () => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [plan, setPlan] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/openai/generate-savings-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goalName,
        targetAmount,
        targetDate,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to generate plan");
      return;
    }

    alert("Savings plan generated:\n\n" + data.plan);
    // You can also display this on the page instead of alert
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Goal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Current Savings"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(e.target.value)}
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          required
        />
        <button type="submit">Save Goal</button>
      </form>

      {plan && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          <h3>Your AI Savings Plan:</h3>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
};

export default AddGoal;
