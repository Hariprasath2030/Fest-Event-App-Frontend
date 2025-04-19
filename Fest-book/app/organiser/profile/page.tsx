"use client";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiHome, FiCalendar, FiBook, FiUser, FiX, FiSettings } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../organiser/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function OrganiserForm() {
    const { isAuthenticated, loading, userData, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [organiserDetails, setOrganiserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        eventId: "",
        eventName: "",
        imageUrls: "", // comma-separated input field
    });

    const [organisers, setOrganisers] = useState<
        { _id: string; name: string; phone: string; address: string; eventId: number; eventName: string; imageUrls: string[] }[]
    >([]);

    // Fetching organisers on component mount
    useEffect(() => {
        const fetchOrganisers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/organiserdetails");
                const data = await response.json();
                setOrganisers(Array.isArray(data.organisers) ? data.organisers : []);
            } catch (error) {
                console.error("Error fetching organisers:", error);
                setOrganisers([]); // fallback in case of fetch failure
            }
        };


        fetchOrganisers();
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrganiserDetails({ ...organiserDetails, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convert comma-separated imageUrls string to array
        const formattedDetails = {
            ...organiserDetails,
            imageUrls: organiserDetails.imageUrls.split(",").map((url) => url.trim()),
        };

        try {
            const response = await fetch("http://localhost:5000/api/organiserdetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedDetails),
            });

            if (!response.ok) {
                throw new Error("Failed to register organiser");
            }

            const newOrganiser = await response.json();
            setOrganisers([...organisers, newOrganiser]);
            setOrganiserDetails({ name: "", phone: "", address: "", eventId: "", eventName: "", imageUrls: "" });

            alert("Organizer Registered Successfully!");
        } catch (error) {
            console.error("Error registering organiser:", error);
            alert("Error registering organiser");
        }
    };

    // Logout handler
    const handleLogout = () => {
        logout();
        if (confirm("Are you sure you want to logout")) {
            router.push("/organiser/login");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
                <button onClick={() => setIsOpen(true)}>
                    <FaBars size={36} className="text-white hover:text-blue-400 transition" />
                </button>
                <h2 className="text-3xl sm:text-2xl font-bold hover:text-yellow-400 transition text-center flex-1">Organizer Registration Details</h2>
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
                <br />
                <div className="px-6 pb-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-blue-900 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Organiser Form */}
            <div className="flex justify-center items-center mt-12 px-4">
                <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-6">Register your Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            { id: "name", type: "text", label: "Organizer Name", placeholder: "Enter your name" },
                            { id: "phone", type: "tel", label: "Phone Number", placeholder: "Enter your phone number" },
                            { id: "address", type: "text", label: "Address", placeholder: "Enter your address" },
                            { id: "eventId", type: "text", label: "Event ID", placeholder: "Enter your event ID" },
                            { id: "eventName", type: "text", label: "Event Name", placeholder: "Enter your event name" },
                            { id: "imageUrls", type: "text", label: "Image URLs (comma-separated)", placeholder: "https://img1.com, https://img2.com" }
                        ].map((input) => (
                            <div key={input.id}>
                                <label htmlFor={input.id} className="block text-sm font-medium">
                                    {input.label}
                                </label>
                                <input
                                    type={input.type}
                                    id={input.id}
                                    name={input.id}
                                    value={organiserDetails[input.id as keyof typeof organiserDetails]}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-300"
                                    placeholder={input.placeholder}
                                    required
                                />
                            </div>
                        ))}
                        <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                            Register Organizer
                        </button>
                    </form>
                </div>
            </div>

            {/* Registered Organizers */}
            <div>
                <h2 className="text-4xl font-semibold text-center my-10">Registered Organizers</h2>

                {organisers.length === 0 ? (
                    <p className="text-center text-gray-400">No organisers registered yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {organisers.map((org) => (
                            <div
                                key={org._id}
                                className="rounded-xl shadow-lg bg-gray-800 p-4 space-y-4 transition hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white">{org.eventName}</h3>
                                    <p className="text-sm text-gray-300">Organizer: {org.name}</p>
                                    <p className="text-sm text-gray-300">Phone: {org.phone}</p>
                                    <p className="text-sm text-gray-300">Address: {org.address}</p>
                                    <p className="text-sm text-gray-300">Event ID: {org.eventId}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {org.imageUrls.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Image ${i + 1}`}
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
