// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/signup';
import Login from './pages/login';
import SecurityQuestions from './pages/SecurityQuestions'; 
import ResetPassword from './pages/ResetPassword';
import WelcomePage from './pages/welcomePage'; 
import HomePage from './pages/HomePage'; 
import GoalsPage from './pages/GoalsPage'; 
import AddGoal from './pages/AddGoal';
import DreamFrame from './ai-bots/DreamFrame'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SecurityQuestions" element={<SecurityQuestions />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/add-goal" element={<AddGoal />} />
        <Route path="/dreamframe" element={<DreamFrame />} />
      </Routes>
    </Router>
  );
};

export default App;
