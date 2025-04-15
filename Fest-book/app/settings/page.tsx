"use client";
import { useState, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import { FiSettings, FiUser, FiLock, FiBell, FiSun, FiMoon, FiX, FiGlobe, FiCreditCard, FiActivity } from "react-icons/fi";
import Link from "next/link";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    password: "",
    notifications: true,
    language: "English",
    accountStatus: "Active"
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  }, [isDarkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings Updated!');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-5`}>
      {/* Header */}
      <header className={`flex justify-between items-center px-8 py-6 h-24 w-full rounded-xl relative shadow-lg ${isDarkMode ? "bg-black/70 text-white" : "bg-gray-100 text-black"}`}>
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={32} className={`${isDarkMode ? "text-white" : "text-black"} hover:text-blue-400 transition`} />
        </button>
        <div className="flex items-center space-x-4">
          <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </header>

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-[35vw] bg-gray-900 text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-2xl`}>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Settings</h1>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <ul className="space-y-4 px-4">
          {[{ name: "My Status", icon: <FiActivity size={24} /> },
            { name: "Language", icon: <FiGlobe size={24} /> },
            { name: "Account Details", icon: <FiUser size={24} /> },
            { name: "Security & Login", icon: <FiLock size={24} /> },
            { name: "Ads & Payment", icon: <FiCreditCard size={24} /> }
          ].map((item) => (
            <li key={item.name} className="flex items-center space-x-4 hover:text-blue-400 transition">
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Form */}
      <div className="flex justify-center items-center mt-12 px-4">
        <div className="p-8 rounded-xl shadow-xl w-full max-w-3xl bg-opacity-10 bg-black/20">
          <h2 className="text-3xl font-bold text-center mb-6">Update Your Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input name="username" type="text" value={settings.username} onChange={handleInputChange} placeholder="Enter username" className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" type="email" value={settings.email} onChange={handleInputChange} placeholder="Enter email" className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input name="password" type="password" value={settings.password} onChange={handleInputChange} placeholder="Enter password" className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Language</label>
              <select name="language" value={settings.language} onChange={handleInputChange} className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500">
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Notifications</label>
              <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleCheckboxChange} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Theme</label>
              <button type="button" onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
            <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
