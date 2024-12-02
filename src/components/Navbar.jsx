import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaBars, FaTimes, FaCreditCard, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const navLinks = [
  { 
    name: 'Rapid Pass', 
    href: '/rapid-pass', 
    icon: FaCreditCard,
    description: 'Recharge your metro card' 
  },
  { 
    name: 'Support', 
    href: '/support', 
    icon: FaPhoneAlt,
    description: 'Get help and support' 
  },
  { 
    name: 'About Metro', 
    href: '/about', 
    icon: FaInfoCircle,
    description: 'Learn about metro services' 
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img 
                src={logo} 
                alt="Metro Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">Dhaka Metro</span>
              <span className="text-xs text-primary">Smart Ticketing</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <link.icon size={16} />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden w-10 h-10 items-center justify-center 
                       bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
          >
            {isOpen ? (
              <FaTimes className="text-primary" size={20} />
            ) : (
              <FaBars className="text-primary" size={20} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className={`md:hidden overflow-hidden bg-white ${isOpen ? '' : 'hidden'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {/* Mobile Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 text-gray-600 hover:bg-primary/10 transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <link.icon className="text-primary" size={18} />
              </div>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}