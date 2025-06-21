// src/App.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';    // ← import Toaster

import HomePage       from './pages/HomePage';
import DashboardPage  from './pages/DashboardPage';
import PlanPage       from './pages/PlanPage';
import LoginPage      from './pages/Auth/LoginPage';
import RegisterPage   from './pages/Auth/RegisterPage';
import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="App overflow-x-hidden">
      {/** Global Toaster: hiển thị mọi toast ở top-center */}
      <Toaster position="top-center" reverseOrder={false} />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public pages */}
          <Route path="/"         element={<HomePage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected pages */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/plan"      element={<PlanPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
