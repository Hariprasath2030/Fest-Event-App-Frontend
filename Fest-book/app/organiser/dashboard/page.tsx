"use client";

import { useAuth } from "../../organiser/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

export default function DashboardPage() {
    const { isAuthenticated, loading, userData } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/organiser/login");
        }
    }, [loading, isAuthenticated]);

    if (loading || !isAuthenticated) return null;

    return (
        <div style={{ padding: "2rem",background:"white" }}>
            <h1>Welcome to the Organiser Dashboard</h1>
            <p>Hello, {userData?.name || "User"} 👋</p>

            {/* You can add more dashboard sections here */}
            <div style={{ marginTop: "2rem" }}>
                <h3>Your Events</h3>
                {/* Replace with dynamic content */}
                <ul>
                    <li>Event 1</li>
                    <li>Event 2</li>
                </ul>
            </div>
        </div>
    );
}
