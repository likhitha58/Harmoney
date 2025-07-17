// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import SecurityQuestions from './pages/SecurityQuestions'; 
import ResetPassword from './pages/ResetPassword';
import WelcomePage from './pages/welcomePage'; 
import HomePage from './pages/HomePage'; 
import GoalsPage from './pages/GoalsPage'; 
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
      </Routes>
    </Router>
  );
};

export default App;
