"use client"

import React, { useEffect, useState } from "react";
import { useAuth } from "../../organiser/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { FiX, FiHome, FiCalendar, FiBook, FiUser, FiSettings } from "react-icons/fi";

export default function page() {
    const { isAuthenticated, loading, userData, logout } = useAuth();
    const router = useRouter();// Sidebar toggle state

    const handleLogout = () => {
        logout();
        router.push("/organiser/login");
    };

    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white  w-full">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-20 w-full bg-black/90 shadow-lg rounded-1xl relative z-30">
                {/* Menu Button */}
                <button onClick={() => setIsOpen(true)}>
                    <FaBars size={32} className="text-white hover:text-blue-400 transition" />
                </button>

                <h1 className="ml-4 text-4xl font-extrabold tracking-wide hover:text-yellow-400 transition duration-300 cursor-pointer">
                    Event Management for Organiser
                </h1>

                <div className="flex justify-between items-center mb-1">
                    <button
                        onClick={handleLogout}
                        className="bg-gray-700 hover:bg-yellow-800 transition text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-50">
                    <h1 className="text-3xl font-bold">Organiser</h1>
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={28} className="text-white hover:text-red-500 transition" />
                    </button>
                </div>

                <ul className="mt-6 px-8 space-y-6 text-lg">
                    {[
                        { name: "Dashboard", icon: <FiHome size={24} />, href: "/organiser/dashboard" },
                        { name: "Organiser Details", icon: <FiUser size={24} />, href: "/organiser/profile" },
                        { name: "Add Events", icon: <FiCalendar size={24} />, href: "/organiser/events" },
                        { name: "Bookings", icon: <FiBook size={24} />, href: "/organiser/dashboard/bookings" },
                        { name: "Settings", icon: <FiSettings size={24} />, href: "/customer/settings" },
                    ].map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="flex items-center space-x-4 hover:text-blue-400 transition">
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


            <h1>Orgainser detsils</h1>
        </div>
    )
}

