"use client";
import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { FiHome, FiCalendar, FiBook, FiUser, FiX } from "react-icons/fi";
import Link from "next/link";

export default function Events() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<{ id: string; title: string; date: string; location: string; image: string; }[]>([]);
  const [eventDetails, setEventDetails] = useState({ title: "", date: "", location: "", image: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, { ...eventDetails, id: Date.now().toString() }]);
    setEventDetails({ title: "", date: "", location: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-gray-900 p-5 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={32} className="text-white hover:text-purple-400 transition" />
        </button>
        <h2 className="text-4xl font-bold text-center mx-auto my-10">Event Registration</h2>
      </header>

      {/* Massive Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-[50vw] bg-gray-900 text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-2xl`}>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">FestBook</h1>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <ul className="space-y-4 px-4">
          {[{ name: "Home", icon: <FiHome size={24} />, href: "/" },
            { name: "Events", icon: <FiCalendar size={24} />, href: "/events" },
            { name: "Bookings", icon: <FiBook size={24} />, href: "/bookings" },
            { name: "Customers", icon: <FiUser size={24} />, href: "/customers" }
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="flex items-center space-x-4 hover:text-purple-400 transition">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

{/* Event Registration Section */}
      <h2 className="text-4xl font-bold text-center my-10">All Types of Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {/* Event Cards with Gradients */}
        {[
          { title: "Marriage & Wedding", img: "/wedding.jpg", desc: "Mela vaaithiyam, chenda melam for weddings." },
          { title: "Bride & Groom Photos", img: "/Photo & Video Shoot.jpg", desc: "Capture your event's best moments." },
          { title: "House Warming", img: "/house warming.jpg", desc: "Multi-cuisine catering services available." },
          { title: "Birthday Party", img: "/birthday party.jpg", desc: "Multi-cuisine catering services available." },
          { title: "Puberty Function", img: "/Puberty Function.png", desc: "Wedding car decoration & transport services." },
          { title: "Invitation Cards", img: "/Invitation Cards.jpg", desc: "Design custom invitation cards." },
          { title: "Food Supply", img: "/Food Supply.jpg", desc: "Multi-cuisine catering services available." },
          { title: "Stage Decorations", img: "/Stage Decorations.jpg", desc: "Stage decoration with floral & themes." },
          { title: "Vehicle Arrangement", img: "/vehicle.jpg", desc: "Wedding car decoration & transport services." }
          
        ].map((event, index) => (
          <div key={index} className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
            <img src={event.img} alt={event.title} className="w-full h-48 object-cover rounded-xl" />
            <div className="absolute bottom-0 p-4">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="text-white text-sm">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>

     

      {/* Registered Events */}
      <div>
        <h2 className="text-4xl font-semibold text-center my-10">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {events.map((event) => (
            <div key={event.id} className="relative overflow-hidden rounded-xl shadow-lg min-h-[250px] flex flex-col justify-end p-4 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
              <div className="relative">
                <h3 className="text-white text-xl font-bold">{event.title}</h3>
                <p className="text-white text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-white text-sm">📍 {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
