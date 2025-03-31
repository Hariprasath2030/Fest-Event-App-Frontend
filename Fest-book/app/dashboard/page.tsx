'use client';  

import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'; // Import X icon from react-icons
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { FiBook, FiCalendar, FiHome, FiSettings, FiUser, FiX } from 'react-icons/fi';

function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false); // State for sidebar visibility
  const [eventDetails, setEventDetails] = useState({
    name: '',
    email: '',
    eventName: '',
    eventDate: '',
    eventImage: '',
  });

  const [events, setEvents] = useState<{ _id: string; eventName: string; eventDate: string; eventImage: string; name: string; email: string; }[]>([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Event registered:', data.event);
        setEvents((prevEvents) => [...prevEvents, data.event]);
      } else {
        console.error('Error registering event:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white">

<header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
      {/* Sidebar Button */}
      <div className="flex items-center">
        <button onClick={() => setIsOpen(true)} >
          <FaBars size={32} className="text-white hover:text-blue-400 transition" />
        </button>
      </div>

      {/* Title */}
      <h1 className="ml-4 text-4xl font-extrabold tracking-wide hover:text-blue-400 transition duration-300 cursor-pointer">
        Event Management
      </h1>

      {/* User Button */}
      <div className="ml-auto flex items-center gap-4">
        <div className="hover:bg-gray-800 transition rounded-lg px-4 py-2">
          <UserButton />
        </div>
      </div>


      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h1 className="text-3xl font-bold">FestBook</h1>
                <button onClick={() => setIsOpen(false)}>
                  <FiX size={28} className="text-white hover:text-red-500 transition" />
                </button>
              </div>

         {/* Sidebar Links */}
                <ul className="mt-6 px-8 space-y-6 text-lg">
                  {[
                    { name: "Dashboard", icon: <FiHome size={24} />, href: "/dashboard" },
                    { name: "Events", icon: <FiCalendar size={24} />, href: "/events" },
                    { name: "Bookings", icon: <FiBook size={24} />, href: "/dashboard/bookings" },
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
      </nav>
    </header>

      {/* Event Registration Section */}
      <h2 className="text-4xl font-bold text-center my-10">Event Registration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {/* Event Cards with Gradients */}
        {[
          { title: "Wedding Music Artists", img: "/wedding.jpg", desc: "Mela vaaithiyam, chenda melam for weddings." },
          { title: "Photo & Video Shoot", img: "/Photo & Video Shoot.jpg", desc: "Capture your event's best moments." },
          { title: "Food Supply", img: "/Food Supply.jpg", desc: "Multi-cuisine catering services available." },
          { title: "Invitation Cards", img: "/Invitation Cards.jpg", desc: "Design custom invitation cards." },
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
      <h2 className="text-4xl font-semibold text-center my-10">Registered Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {events.map((event) => (
          <div key={event._id} className="relative overflow-hidden rounded-xl shadow-lg min-h-[250px] flex flex-col justify-end p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.eventImage})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
            <div className="relative">
              <h3 className="text-white text-xl font-bold">{event.eventName}</h3>
              <p className="text-white text-sm">{new Date(event.eventDate).toLocaleDateString()}</p>
              <p className="text-white text-sm mt-2">{event.name} - {event.email}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default DashboardHeader;
