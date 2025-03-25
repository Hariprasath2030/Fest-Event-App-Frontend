'use client';

import { useState } from "react";
import { FaUser, FaCalendarAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  return (
    <div>
      {/* Navbar with Background Image */}
      <nav className="fixed w-full z-50 bg-cover bg-center bg-no-repeat " 
      style={{ 
    backgroundImage: "url('/home.jpg')", 
    backgroundSize: "cover", 
    backgroundPosition: "center",
    backgroundAttachment: "fixed" 
  }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Mobile Menu Button */}
        <button 
        
          className="md:hidden text-white focus:outline-none text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex justify-center items-center w-full">
          <ul className="flex space-x-6">
            <li>
              <Link href="#about" className="flex items-center gap-2 text-white hover:text-white-300">
                <FaUser /> About
              </Link>
            </li>
            <li>
              <Link href="#events" className="flex items-center gap-2 text-white hover:text-white-300">
                <FaCalendarAlt /> Events
              </Link>
            </li>
            <li>
              <Link href="#contact" className="flex items-center gap-2 text-white hover:text-white-300">
                <FaEnvelope /> Contact
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Login/User Button */}
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <UserButton />  
          ) : (
            <Link href="/sign-in">
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu - Centered */}
      {menuOpen && (
        <div className="md:hidden bg-opacity-80 p-4 text-center w-full">
          <Link href="#about" className="text-white hover:text-white-300 py-2 flex items-center justify-center gap-2">
            <FaUser /> About
          </Link>
          <Link href="#events" className=" text-white hover:text-white-300 py-2 flex items-center justify-center gap-2">
            <FaCalendarAlt /> Events
          </Link>
          <Link href="#contact" className=" text-white hover:text-white-300 py-2 flex items-center justify-center gap-2">
            <FaEnvelope /> Contact
          </Link>
        </div>
      )}
    </nav>
      {/* Hero Section with Full-Page Background */}
      <section 
        className="flex flex-col justify-center items-center text-center min-h-screen text-white px-4"
        style={{ 
          backgroundImage: "url('/home.jpg')", // Use WebP for better quality
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundAttachment: "fixed" // Ensures smooth scrolling effect
        }}
      >
        <div className="text-center bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-lg shadow-xl">
  <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
    Plan & Manage Your Events Seamlessly
  </h1>

  <p className="mt-4 text-lg text-gray-300">
    From corporate gatherings to weddings, we make every event unforgettable.
  </p>

  <Link 
    href="/" 
    className="mt-6 inline-block px-6 py-3 bg-white text-blue-500 font-bold rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  >
    Explore Events
  </Link> 

  {/* Dynamic Event Types Section */}
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { title: "Corporate Events", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
      { title: "Weddings", bg: "bg-pink-500", hover: "hover:bg-pink-600" },
      { title: "Concerts", bg: "bg-purple-500", hover: "hover:bg-purple-600" },
    ].map((event, index) => (
      <div 
        key={index}
        className={`p-6 rounded-lg text-white font-medium text-lg text-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl ${event.bg} ${event.hover}`}
      >
        {event.title}
      </div>
    ))}
  </div>
</div>


      </section>
      
      <section
  className="relative py-30 bg-cover bg-center"
  style={{ backgroundImage: "url('/login.jpg')" }}
>
  {/* Overlay for better readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 text-center max-w-lg mx-auto text-white">
    <h1 className="text-5xl font-semibold">Login</h1>
    <p className="mt-4 text-lg">
      Please choose your role to log in and access the appropriate platform.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-4">
  {[
    { href: "/sign-in", text: "Customer Login", bg: "bg-indigo-500", hover: "hover:bg-indigo-600" },
    { href: "/sign-in-organizer", text: "Organizer Login", bg: "bg-teal-500", hover: "hover:bg-teal-600" },
  ].map((btn, index) => (
    <a
      key={index}
      href={btn.href}
      className={`inline-block rounded-full ${btn.bg} px-8 py-3 text-lg font-medium text-white transition duration-300 transform shadow-lg ${btn.hover} hover:scale-105 hover:shadow-2xl`}
    >
      {btn.text}
    </a>
  ))}
</div>
  </div>
</section>

{/* About Section (Black Background) */}
<section id="about" className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-semibold text-center text-white">About Us</h2>
    <p className="mt-4 text-center text-lg text-gray-300">
      Organizing a festival is no small feat, but with Fest Book, event management becomes smarter, faster, and more efficient.
      Our platform empowers event organizers, venue managers, and vendors with cutting-edge tools to streamline planning, enhance engagement, and deliver unforgettable experiences.
    </p>

    <div className="mt-16 text-center">
      <h3 className="text-2xl font-semibold text-white">Why Choose Us?</h3>
      <p className="mt-4 text-lg text-gray-300">
        We take pride in delivering exceptional results for our clients. Here’s why you should choose us:
      </p>
      <ul className="mt-8 space-y-4 text-lg text-gray-300">
        <li>Our cutting-edge platform integrates event discovery, social networking, and real-time updates to enhance the festival experience.</li>
        <li>Organizers gain valuable analytics to optimize events, improve audience engagement, and enhance future planning.</li>
        <li>Whether it's a local cultural fest or an international music festival, Fest Book adapts to events of any scale.</li>
      </ul>
    </div>
  </div>
</section>

<section id="event-management" className="bg-gradient-to-br from-black via-gray-800 to-black text-white py-20">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-semibold text-center">Event Management</h2>
    <p className="mt-4 text-center text-lg text-gray-300">
      Our event management services offer everything you need to make your next event a success. From
      planning and coordination to execution, we handle every detail with care and professionalism.
    </p>

    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Event Type */}
      {[
        { title: "Wedding Music Artists", image: "/wedding.jpg", desc: "We arrange mela vaaithiyam, chenda melam for weddings." },
        { title: "Photo & Video Shoot", image: "/Photo & Video Shoot.jpg", desc: "Make your event memorable with stunning photos & videos." },
        { title: "Food Supply", image: "/Food Supply.jpg", desc: "We provide multi-cuisine catering services." },
        { title: "Invitation Cards", image: "/Invitation Cards.jpg", desc: "Custom-designed invitation cards with unique styles." },
        { title: "Stage Decorations", image: "/Stage Decorations.jpg", desc: "We decorate stages with themes or floral designs." },
        { title: "Vehicle Arrangement", image: "/vehicle.jpg", desc: "Wedding car decoration & transport facilities available." },
      ].map((event, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-center h-48 md:h-60 lg:h-60 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-black/60 to-gray-800/80"
          style={{ backgroundImage: `url('${event.image}')` }}
        >
          <div className="relative z-10 px-4">
            <h3 className="text-2xl font-semibold">{event.title}</h3>
            <p className="mt-3 text-lg text-gray-200 leading-relaxed">{event.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section
  className="relative py-16 bg-cover bg-center"
  style={{ backgroundImage: "url('/sign.jpg')" }}
>
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="relative z-10 text-center max-w-lg mx-auto text-white">
    <h3 className="text-2xl font-semibold">Contact Us</h3>
    <p className="mt-4 text-lg">
      If you have any questions or would like to inquire about our event management services, don't hesitate to reach out.
    </p>

    <form className="mt-8 max-w-lg mx-auto space-y-4">
      <input
        className="w-full rounded-full border border-gray-400 px-6 py-3 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
        type="text"
        placeholder="Your Name"
        required
      />
      <input
        className="w-full rounded-full border border-gray-400 px-6 py-3 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
        type="email"
        placeholder="Your Email"
        required
      />
      <textarea
        className="w-full rounded-lg border border-gray-400 px-6 py-3 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
        placeholder="Your Message"
        rows={4}
        required
      ></textarea>
      <button
        className="block w-full rounded-full bg-indigo-800 px-8 py-3 font-medium text-white transition hover:bg-indigo-600"
        type="submit"
      >
        Send Message
      </button>
    </form>
  </div>
</section>
    </div>
  );
}
