"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedData = JSON.parse(localStorage.getItem("user_data"));
            if (storedData?.userToken && storedData?.user) {
                setToken(storedData.userToken);
                setUserData(storedData.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Failed to parse user data", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (newToken, newUser) => {
        localStorage.setItem(
            "user_data",
            JSON.stringify({ userToken: newToken, user: newUser })
        );
        setToken(newToken);
        setUserData(newUser);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("user_data");
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ token, userData, isAuthenticated, loading, login, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
