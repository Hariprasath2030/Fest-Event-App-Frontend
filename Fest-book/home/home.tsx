'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Eventify</Link>
          <ul className="hidden md:flex space-x-6">
            <li><Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link></li>
            <li><Link href="#events" className="text-gray-600 hover:text-blue-600">Events</Link></li>
            <li><Link href="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
          </ul>
          <button className="md:hidden text-gray-600">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-500 text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Plan & Manage Your Events Seamlessly</h1>
        <p className="mt-4 text-lg">From corporate gatherings to weddings, we make every event unforgettable.</p>
        <Link href="#events" className="mt-6 inline-block px-6 py-3 bg-white text-blue-500 font-bold rounded-full">Explore Events</Link>
      </section>

      {/* Event Highlights */}
      <section id="events" className="container mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Tech Conference 2025</h3>
            <p className="text-gray-600 mt-2">Join industry leaders to explore the future of technology.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Wedding Gala</h3>
            <p className="text-gray-600 mt-2">Make your special day a dream come true with our expert planning.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Music Festival</h3>
            <p className="text-gray-600 mt-2">Experience live performances from top artists worldwide.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-800 text-white text-center py-20">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-4">Need help organizing your next event? Contact us now!</p>
        <Link href="mailto:info@eventify.com" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-bold rounded-full">Email Us</Link>
      </section>

     
    </div>
  );
}

/* */