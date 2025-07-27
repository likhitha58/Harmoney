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
import DreamFrame from './ai-bots/DreamFrame';
import BudgetBuddy from './ai-bots/BudgetBuddy';
import ActiveGoals from './pages/ActiveGoals';
import ActiveGoalDetails from "./pages/ActiveGoalDetails";
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SecurityQuestions" element={<SecurityQuestions />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <GoalsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-goal"
          element={
            <ProtectedRoute>
              <AddGoal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dreamframe"
          element={
            <ProtectedRoute>
              <DreamFrame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budgetbuddy"
          element={
            <ProtectedRoute>
              <BudgetBuddy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activegoals"
          element={
            <ProtectedRoute>
              <ActiveGoals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activegoals/:id"
          element={
            <ProtectedRoute>
              <ActiveGoalDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
