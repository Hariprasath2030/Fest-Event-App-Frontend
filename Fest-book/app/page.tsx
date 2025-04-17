"use client";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../app/home/home';
import Register from './organiser/(auth)/register/page';
import Login from './organiser/(auth)/login/page';
import Dashboard from './organiser/dashboard/page';
import { useAuth } from './organiser/contexts/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={<Navigate to="/" />} />
      <Route path="/customer/sign-in" element={<Navigate to="/" />} />

      {/* Organiser Auth Routes */}
      <Route
        path="/organiser/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/organiser/dashboard" />}
      />
      <Route
        path="/organiser/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/organiser/dashboard" />}
      />
      <Route path="/organiser/register" element={<Navigate to="/" />} />
      <Route path="/organiser/login" element={<Navigate to="/" />} />
      {/* Organiser Dashboard */}
      <Route
        path="/organiser/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/organiser/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
