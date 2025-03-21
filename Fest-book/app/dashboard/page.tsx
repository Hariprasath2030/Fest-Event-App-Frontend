'use client';  // Add this line at the very top

import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs'; // Import UserButton

function DashboardHeader() {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    email: '',
    eventName: '',
    eventDate: '',
    eventImage: '',
  });
  const [events, setEvents] = useState([]);

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

    // Send data to backend to create event
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Event registered:', data.event);
        // After submitting, refresh the event list
        setEvents((prevEvents) => [...prevEvents, data.event]);
      } else {
        console.error('Error registering event:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-5 shadow-sm border-b flex flex-col space-y-4">
      
      {/* Header Navigation */}
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-2xl font-bold">Event Management</div>
      
      {/* UserButton component to manage user authentication */}
      <div className="mt-4 flex justify-center">
        <UserButton />
      </div>

      </header>

      <h2 className="text-2xl font-semibold text-center">Event Registration</h2>

      {/* Event Grid with responsive design */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Event Cards */}
        <div
          className="relative flex flex-col items-center justify-center h-48 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundImage: "url('/wedding.jpg')" }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">Wedding Music Artists</h3>
            <p className="mt-3 text-lg text-white">We arrange mela vaaithiyam, chenda melam for wedding.</p>
          </div>
        </div>
        <div
          className="relative flex flex-col items-center justify-center h-48 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundImage: "url('/Photo & Video Shoot.jpg')" }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">Photo & Video Shoot</h3>
            <p className="mt-3 text-lg text-white">Make your event as wonderful memories by photo or videos</p>
          </div>
        </div>
        <div
          className="relative flex flex-col items-center justify-center h-48 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundImage: "url('/Food Supply.jpg')" }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">Food Supply</h3>
            <p className="mt-3 text-lg text-white">We provide a multi-cuisine catering service.</p>
          </div>
        </div>
        <div
          className="relative flex flex-col items-center justify-center h-48 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundImage: "url('/Invitation Cards.jpg')" }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">Invitation Cards</h3>
            <p className="mt-3 text-lg text-white">We design your invitation cards with new designs.</p>
          </div>
        </div>
        <div
          className="relative flex flex-col items-center justify-center h-48 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundImage: "url('/Stage Decorations.jpg')" }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">Stage Decorations</h3>
            <p className="mt-3 text-lg text-white">We decorate your stage with themes or simple flowers.</p>
          </div>
        </div>
        <div
          className="relative flex flex-col items-center justify-center h-48 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
          style={{ backgroundImage: "url('/vehicle.jpg')" }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">Vehicle Arrangement</h3>
            <p className="mt-3 text-lg text-white">We decorate your wedding car and also transport facility.</p>
          </div>
        </div>
      </div>

      {/* Event Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventDetails.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={eventDetails.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the event name"
            required
          />
        </div>

        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700">Event Image URL</label>
          <input
            type="url"
            id="eventImage"
            name="eventImage"
            value={eventDetails.eventImage}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter event image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Register for Event
        </button>
      </form>
      {/* Event Grid to Display All Events */}
      <h2 className="text-2xl font-semibold text-center my-6">Events were registered</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="relative overflow-hidden rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${event.eventImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative p-4">
              <h3 className="text-white text-xl font-semibold">{event.eventName}</h3>
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
