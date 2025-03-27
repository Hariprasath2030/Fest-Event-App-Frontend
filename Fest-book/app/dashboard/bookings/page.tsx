"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiHome, FiCalendar, FiBook, FiUser, FiX, FiSettings, FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default function Bookings() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    email: "",
    eventName: "",
    eventDate: "",
    eventImage: "",
  });

  const [events, setEvents] = useState<
    { _id: string; name: string; email: string; eventName: string; eventDate: string; eventImage: string }[]
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, { ...eventDetails, _id: Date.now().toString() }]);
    setEventDetails({ name: "", email: "", eventName: "", eventDate: "", eventImage: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={36} className="text-white hover:text-blue-400 transition" />
        </button>
        <h1 className="text-2xl font-bold">Bookings</h1>
      </header>

      {/* Massive Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-[240px] bg-gray-900 text-white z-50 $vw] bg-gray-900 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold">FestBook</h1>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={28} className="text-white hover:text-red-500 transition" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold mt-3">John Doe</h2>
          <p className="text-gray-400 text-sm">Event Organizer & Enthusiast</p>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6 px-8 space-y-6 text-lg">
          {[
            { name: "Home", icon: <FiHome size={24} />, href: "/" },
            { name: "Events", icon: <FiCalendar size={24} />, href: "/events" },
            { name: "Bookings", icon: <FiBook size={24} />, href: "/bookings" },
            { name: "Profile", icon: <FiUser size={24} />, href: "/profile" },
            { name: "Settings", icon: <FiSettings size={24} />, href: "/settings" },
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="flex items-center space-x-4 hover:text-blue-400 transition">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="absolute bottom-10 left-10">
          <button className="flex items-center space-x-3 text-red-400 hover:text-red-600 transition">
            <FiLogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="flex justify-center items-center mt-12 px-4">
        <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6">Register for an Event</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: "name", type: "text", label: "Full Name", placeholder: "Enter your full name" },
              { id: "email", type: "email", label: "Email Address", placeholder: "Enter your email" },
              { id: "eventName", type: "text", label: "Event Name", placeholder: "Enter the event name" },
              { id: "eventDate", type: "date", label: "Event Date", placeholder: "" },
              { id: "eventImage", type: "url", label: "Event Image URL", placeholder: "Enter event image URL" },
            ].map((input) => (
              <div key={input.id}>
                <label htmlFor={input.id} className="block text-sm font-medium">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  value={eventDetails[input.id as keyof typeof eventDetails]}
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder={input.placeholder}
                  required
                />
              </div>
            ))}
            <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Register Event
            </button>
          </form>
        </div>
      </div>

      {/* Registered Events */}
      <div>
        <h2 className="text-4xl font-semibold text-center my-10">Registered Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="relative overflow-hidden rounded-xl shadow-lg min-h-[250px] flex flex-col justify-end p-4 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.eventImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
              <div className="relative">
                <h3 className="text-white text-xl font-bold">{event.eventName}</h3>
                <p className="text-white text-sm">{new Date(event.eventDate).toLocaleDateString()}</p>
                <p className="text-white text-sm mt-2">
                  {event.name} - {event.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
