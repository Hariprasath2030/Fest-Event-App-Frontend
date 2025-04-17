"use client"
import { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const LoginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/customer/customerLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) { // Check for 200 OK status
        message.success(data.message || 'Login successful');
        login(data.token, data.user);  // Adjusted for backend response

        // After successful login, navigate to the dashboard or home page
        navigate('/organiser/dashboard'); // Replace '/dashboard' with your desired page
      } else {
        setError(data.message || 'Login failed');
        message.error(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error: Unable to log in');
      message.error('Network error: Unable to log in');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, LoginUser }; // Return the LoginUser function
};

export default useLogin;
