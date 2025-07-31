import React, { useEffect, useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import Harmoneylogo from "../assets/logo.png";
import { Row, Col, Card, Button, ProgressBar, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  // User info for dropdown
  const [user, setUser] = useState(null);

  // Goals state
  const [activeGoals, setActiveGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Totals
  const totalSaved = allGoals.reduce(
    (acc, g) => acc + (g.currentSavings || 0),
    0
  );
  const totalTarget = allGoals.reduce(
    (acc, g) => acc + (g.targetAmount || 0),
    0
  );
  const savingsPercent =
    totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const getSaved = (goal) => goal.currentSavings || 0;

  const data = useMemo(
    () => ({
      labels: ["Saved", "Remaining"],
      datasets: [
        {
          data: [totalSaved, Math.max(totalTarget - totalSaved, 0)],
          backgroundColor: ["#7F56D9", "#E0E0E0"],
          hoverOffset: 6,
          borderWidth: 0,
        },
      ],
    }),
    [totalSaved, totalTarget]
  );

  const options = useMemo(
    () => ({
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: "easeOutCubic",
      },
    }),
    []
  );

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const activeRes = await axios.get("/api/goals", { headers });
        const completedRes = await axios.get("/api/goals/achieved", { headers });

        setActiveGoals(activeRes.data);
        setCompletedGoals(completedRes.data);
        setAllGoals([...activeRes.data, ...completedRes.data]);

        console.log("Goals updated successfully!", "success");
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        console.log("Failed to fetch goals", "error");
      } finally {
        setLoading(false);
      }
    };

    // Fetch user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchGoals();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  // Card style
  const cardBaseStyle = {
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    border: "none",
    borderRadius: "12px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const handleCardHover = (e, isEnter) => {
    e.currentTarget.style.transform = isEnter ? "translateY(-5px)" : "none";
    e.currentTarget.style.boxShadow = isEnter
      ? "0 8px 15px rgba(0,0,0,0.2)"
      : "0 2px 5px rgba(0,0,0,0.1)";
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container" style={{ position: "relative" }}>
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

      {/* DASHBOARD */}
      <main
        className="container mb-5"
        style={{
          backgroundColor: "rgb(243, 240, 255)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div className="p-4">
          <h2
            style={{
              textAlign: "center",
              color: "#7F56D9",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Goal Progress Dashboard
          </h2>

          {/* Overview Cards */}
          <Row className="mb-4 text-center">
            {[
              { title: "Total Goals", value: allGoals.length },
              { title: "Active Goals", value: activeGoals.length },
              { title: "Completed Goals", value: completedGoals.length },
              {
                title: "Total Saved",
                value: `₹${totalSaved.toLocaleString()}`,
                sub: `of ₹${totalTarget.toLocaleString()}`,
              },
            ].map((card, index) => (
              <Col md={3} key={index} className="mb-3">
                <Card
                  style={cardBaseStyle}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <h3>{card.value}</h3>
                    {card.sub && <small>{card.sub}</small>}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Donut Chart */}
          <div
            style={{
              width: "280px",
              margin: "20px auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Doughnut data={data} options={options} />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#7F56D9",
              }}
            >
              {savingsPercent.toFixed(0)}%
            </div>
          </div>

          {/* Active Goals Progress */}
          <h4 style={{ color: "#7F56D9", marginTop: "40px" }}>
            Active Goals Progress
          </h4>
          {activeGoals.length === 0 ? (
            <p>No active goals. Start by creating a new goal.</p>
          ) : (
            activeGoals.map((goal) => {
              const saved = getSaved(goal);
              const percentage = Math.min(
                (saved / goal.targetAmount) * 100,
                100
              );

              return (
                <Card
                  key={goal._id}
                  className="mb-3"
                  style={{
                    ...cardBaseStyle,
                    padding: "10px",
                  }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <Card.Body>
                    <Card.Title>{goal.title}</Card.Title>
                    <Card.Text>{goal.description}</Card.Text>
                    <ProgressBar
                      now={percentage}
                      label={`${percentage.toFixed(0)}%`}
                      style={{
                        backgroundColor: "#e0d7ff", // unfilled track color
                        height: "20px",
                        borderRadius: "8px",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: "#7F56D9", // dark purple filled section
                          height: "100%",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "8px 0 0 8px",
                          transition: "width 0.6s ease"
                        }}
                      >
                        {`${percentage.toFixed(0)}%`}
                      </div>
                    </ProgressBar>


                    <div className="mt-2">
                      ₹{saved.toLocaleString()} / ₹
                      {goal.targetAmount.toLocaleString()}
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          )}

          {/* Navigation Buttons */}
          <div className="text-center mt-4">
            <Button
              className="me-2"
              style={{ background: "#7f56d955" }}
              onClick={() => navigate("/activegoals")}
            >
              View Active Goals
            </Button>
            <Button
              style={{ background: "#7f56d9ce" }}
              onClick={() => navigate("/pastgoals")}
              className="me-2"
            >
              View Achieved Goals
            </Button>
            <Button
              style={{ background: "white", color: "black" }}
              onClick={() => navigate("/add-goal")}
            >
              + Create Goal
            </Button>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default Dashboard;
