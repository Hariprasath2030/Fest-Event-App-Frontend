"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../organiser/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { FiX, FiHome, FiCalendar, FiBook, FiUser, FiSettings } from "react-icons/fi";

export default function DashboardPage() {
    const { isAuthenticated, loading, userData, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false); // Sidebar visibility state

    useEffect(() => {
        if (loading || isAuthenticated) {
            router.push("/organiser/dashboard");
        }
    }, [loading, isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        confirm("Are you sure want to logout");
        router.push("/organiser/login");
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
                <button onClick={() => setIsOpen(true)}>
                    <FaBars size={36} className="text-white hover:text-blue-400 transition" />
                </button>
                <h2 className="text-2xl sm:text-2xl font-bold hover:text-yellow-400 transition text-center flex-1">Organiser Dashboard</h2>
            </header>

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 h-full w-[240px] bg-black text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out shadow-2xl`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <Image src="/icon.png" alt="Logo" width={40} height={40} className="rounded-full" />
                        <h1 className="text-2xl font-bold">Organiser</h1>
                    </div>
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={28} className="text-white hover:text-red-500 transition" />
                    </button>
                </div>

                <ul className="mt-6 px-8 space-y-6 text-md">
                    {[{ name: "Dashboard", icon: <FiHome size={24} />, href: "/organiser/dashboard" },
                    { name: "Organiser Details", icon: <FiUser size={24} />, href: "/organiser/profile" },
                    { name: "Add Events", icon: <FiCalendar size={24} />, href: "/organiser/events" },
                    { name: "Bookings", icon: <FiBook size={24} />, href: "/organiser/dashboard/bookings" },
                    { name: "Settings", icon: <FiSettings size={24} />, href: "/organiser/settings" }].map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="flex items-center space-x-4 hover:text-blue-400 transition">
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <br></br>
                <div className="px-6 pb-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-blue-900 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            {/* Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Hello, {userData?.name || "User"} 👋
                </h2>

                <section className="mt-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Your Events</h3>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Event 1</li>
                        <li>Event 2</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
