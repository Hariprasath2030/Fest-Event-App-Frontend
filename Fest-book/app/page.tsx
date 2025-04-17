"use client"
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
      <Route path="/" element={isAuthenticated ? <Navigate to="/" /> : <Home />} />
      <Route path="/customer/sign-in" element={<Navigate to='/' />} />

      <Route path="/organiser/register" element={isAuthenticated ? <Navigate to="/organiser/dashboard" /> : <Register />} />
      <Route path="/organiser/login" element={isAuthenticated ? <Navigate to="/organiser/dashboard" /> : <Login />} />
      <Route path="/organiser/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/organiser/login" />} />
    </Routes>
  );
};

export default AppRoutes;
