import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { Card, Button, Row, Col } from "react-bootstrap";
import Harmoneylogo from "../assets/logo.png";

const PastGoals = () => {
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
        const completed = res.data.filter((g) => g.completed);
        setGoals(completed);
      } catch (err) {
        console.error("Error fetching achieved goals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

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

  if (loading) return <p className="text-center">Loading...</p>;

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
              style={{ color: "#7F56D9", fontSize: "17px" }}
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7F56D9", fontSize: "17px" }}
              onClick={() => navigate("/activegoals")}
            >
              Active goals
            </button>
          </li>
          <li>
            <button
              className="nav-link px-4 btn btn-link"
              style={{ color: "#7F56D9", fontSize: "17px" }}
              onClick={() => navigate("/pastgoals")}
            >
              Achieved goals
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
            Achieved Goals
          </h2>

          {goals.length === 0 ? (
            <p className="text-center">
              You have not completed any goals yet.
            </p>
          ) : (
            <Row>
              {goals.map((goal) => (
                <Col md={4} key={goal._id} className="mb-4">
                  <Card
                    style={cardBaseStyle}
                    onMouseEnter={(e) => handleCardHover(e, true)}
                    onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    {goal.dreamImage && (
                      <Card.Img
                        variant="top"
                        src={goal.dreamImage}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{goal.title}</Card.Title>
                      <Card.Text>{goal.description}</Card.Text>
                      <div className="mb-2">
                        <strong>Saved:</strong> ₹
                        {goal.currentSavings.toLocaleString()}
                      </div>
                      <div className="mb-2">
                        <strong>Target:</strong> ₹
                        {goal.targetAmount.toLocaleString()}
                      </div>
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#7F56D9",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                        }}
                      >
                        🎉 Completed!
                      </span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-4">
            <Button
              style={{
                backgroundColor: "#7F56D9",
                borderColor: "#7F56D9",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PastGoals;
