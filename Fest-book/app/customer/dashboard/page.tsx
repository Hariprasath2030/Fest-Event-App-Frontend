'use client';

import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import {
  FiBook,
  FiCalendar,
  FiHome,
  FiSettings,
  FiUser,
  FiX,
} from 'react-icons/fi';

type EventType = {
  _id: string;
  eventName: string;
  eventDate: string;
  eventImage: string;
  name: string;
  email: string;
};

function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://fest-event-app-backend.onrender.com/api/events'
        );
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data.events || []);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Unable to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white w-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
        {/* Menu Button */}
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={32} className="text-white hover:text-blue-400 transition" />
        </button>

        <h1 className="ml-4 text-4xl font-extrabold tracking-wide hover:text-blue-400 transition duration-300 cursor-pointer">
          Event Management
        </h1>

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
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h1 className="text-3xl font-bold">FestBook</h1>
            <button onClick={() => setIsOpen(false)}>
              <FiX size={28} className="text-white hover:text-red-500 transition" />
            </button>
          </div>

          <ul className="mt-6 px-8 space-y-6 text-lg">
            {[
              { name: 'Dashboard', icon: <FiHome size={24} />, href: '/customer/dashboard' },
              { name: 'Events', icon: <FiCalendar size={24} />, href: '/customer/events' },
              { name: 'Bookings', icon: <FiBook size={24} />, href: '/customer/dashboard/bookings' },
              { name: 'Profile', icon: <FiUser size={24} />, href: '/profile' },
              { name: 'Settings', icon: <FiSettings size={24} />, href: '/customer/settings' },
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

      {/* Event Section */}
      <h2 className="text-4xl font-semibold text-center my-10">Registered Events</h2>

      {loading ? (
        <p className="text-center text-lg">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400">No events registered yet.</p>
      ) : (
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
                <p className="text-white text-sm">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p className="text-white text-sm mt-2">
                  {event.name} - {event.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;
  