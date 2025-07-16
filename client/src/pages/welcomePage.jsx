import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/welcomePage.css';
import Harmoneylogo from '../assets/logo.png';
import infoImage from '../assets/FinancialInfo.png';
import savingsImage from '../assets/FinancialSavings.png';
import goalImage from '../assets/FinancialGoals.png';
import modalImage from '../assets/loginSideImage.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const handleClose = () => setShowAboutModal(false);
  const handleShow = () => setShowAboutModal(true);
  return (
    <main role="main" className="welcome-page">
      {/* Navbar */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a href="/" className="d-inline-flex align-items-center text-decoration-none">
              <img src={Harmoneylogo} alt="Harmoney Logo" width="60" height="60" />
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" className="nav-link px-4 " style={{ color: 'black', fontSize: '17px' }}>Home</a></li>
            <li>
              <a
                href="#features-section"
                className="nav-link px-4"
                style={{ color: '#7f56d9ff', fontSize: '17px' }}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('features-section');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
            </li>

            <li>
              <button className="nav-link px-4 btn btn-link" style={{ color: '#7f56d9ff', fontSize: '17px' }} onClick={handleShow}>
                About
              </button>
            </li>

          </ul>

          <div className="col-md-3 text-end">
            <button className="btn me-2" onClick={() => navigate('/login')} style={{ background: '#7f56d955' }}>Login</button>
            <button className="btn " onClick={() => navigate('/signup')} style={{ background: '#7f56d9ce' }}>Sign-up</button>
          </div>
        </header>
      </div>

      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active text-white text-center" style={{ background: '#0f949b51', padding: '5rem 2rem' }}>
            <h1>Welcome to </h1><h1 style={{ color: 'black', fontSize: '50px' }}>Harmoney</h1>
            <h3>Unpack Your Financial Goals</h3>
            <button className="btn rounded-pill px-4 mt-3" onClick={() => navigate('/signup')} style={{ backgroundColor: '#fff0faff' }}>Get Started</button>
          </div>
          <div className="carousel-item text-center text-white" style={{ background: '#cabc2158', padding: '5rem 2rem' }}>
            <br></br>
            <h1>Set Goals and Track your Progress Easily</h1>
            <p>Create personalized goals based on your financial position.<br></br>Get motivated to unleash your saving potential.</p>
            <button className="btn btn-light rounded-pill px-4 mt-3" onClick={() => navigate('/signup')}>Learn More</button>
            <br></br>
            <br></br>
          </div>
          <div className="carousel-item text-center text-white" style={{ background: '#9f49726c', padding: '5rem 2rem' }}>
            <br></br>
            <br></br>
            <h1>Smarter Savings, Every Day</h1>
            <p>Get real-time tips and live your dream life.</p>
            <button className="btn rounded-pill px-4 mt-3" onClick={() => navigate('/signup')} style={{ backgroundColor: '#F3F0FF' }}>Explore</button>
            <br></br>
            <br></br>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Feature Cards */}
      <div className="container marketing">
        <div className="row text-center">
          <div className="col-lg-4">
            <div className="glass-card fade-in delay-1" style={{
              background: '#e4dafab2'
            }}>

              <h5 className="fw-bold" style={{ fontSize: '23px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3C3A5D' }}>Unburden your financial goals to Harmoney</h5>

            </div>
          </div>
          <div className="col-lg-4">
            <div className="glass-card fade-in delay-2" style={{
              background: '#e4dafab2'
            }}>

              <h5 className="fw-bold" style={{ fontSize: '23px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3C3A5D' }}>Harmoney assures you growth through financial advice</h5>

            </div>
          </div>
          <div className="col-lg-4">
            <div className="glass-card fade-in delay-3" style={{
              background: '#e4dafab2'
            }}>

              <h5 className="fw-bold" style={{ fontSize: '23px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3C3A5D' }}>Start saving smarter and live harmoniously</h5>

            </div>
          </div>
        </div>
      </div>

      {/* Featurettes */}
      <div id="features-section" className="container my-5">

        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">Tell Us About Your Finances<span className="text-muted"> <br></br>Track. Plan. Succeed.</span></h2>
            <p className="lead" style={{ fontSize: 25 }}>Enter your income, expenses, and lifestyle preferences — and let Harmoney do the heavy lifting with personalized insights and planning.</p>
          </div>
          <div className="col-md-5">
            <img src={infoImage} alt="Feature" className="img-fluid" style={{ height: 400, width: 400 }} />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading">Visualize Your Goal Progress <span className="text-muted"><br></br>See for yourself.</span></h2>
            <p className="lead" style={{ fontSize: 25 }}>See where you stand with interactive progress charts that keep your financial goals visible, motivating, and on track.</p>
          </div>
          <div className="col-md-5 order-md-1">
            <img src={savingsImage} alt="Feature" className="img-fluid" style={{ height: 400, width: 400 }} />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">Save Smart. Succeed Confidently. <span className="text-muted"><br></br>Checkmate.</span></h2>
            <p className="lead" style={{ fontSize: 25 }}>Harmoney helps you build consistent savings habits with reminders, AI-powered tips, and strategies tailored to your future dreams.</p>
          </div>
          <div className="col-md-5">
            <img src={goalImage} alt="Feature" className="img-fluid" style={{ height: 400, width: 400 }} />
          </div>
        </div>
        {/* <hr className="featurette-divider" /> */}
      </div>


      <footer className="container border-top py-4 mt-5">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-6 d-flex align-items-center">
            <img src={Harmoneylogo} alt="Harmoney" width="60" height="60" className="me-2" />
            <span style={{ fontSize: 20, color: '#000000ff' }}>© {new Date().getFullYear()} Harmoney, Inc</span>
          </div>
        </div>
      </footer>
      <Modal show={showAboutModal} onHide={handleClose} centered className="about-modal">
  <Modal.Header closeButton className="border-0 justify-content-center">
    <Modal.Title className="text-center w-100">
      <h4 className="about-modal-title">About Harmoney</h4>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    <p className="about-modal-text">
      Harmoney is your intelligent financial assistant that helps you track spending, set achievable savings goals, and stay in control of your financial journey.
      <br /><br />
      Our mission is to bring harmony to your finances through smart technology and helpful insights tailored to your lifestyle.
    </p>
  </Modal.Body>
  <Modal.Footer className="justify-content-center border-0">
    <Button variant="outline-dark" onClick={handleClose} className="about-modal-close-btn">
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </main>
  );
};

export default WelcomePage;
