// src/App.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PlanPage from './pages/PlanPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Auth/ProfilePage';
import PaymentSuccess from './components/PaymentSuccess';
import AppToaster from './components/ui/toast';
import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="App overflow-x-hidden">
      <AppToaster /> {/* ✅ Tách riêng Toaster */}

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
