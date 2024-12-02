import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaSubway, FaClock, FaMapMarkedAlt, FaUsers, FaHistory, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

export default function About() {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 min-h-screen py-16">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FaInfoCircle className="text-primary" />
            <span className="text-primary font-semibold">About Metro Rail</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience Modern <span className="text-primary">Urban Transit</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to the future of transportation in Dhaka. Our metro system represents a significant
            leap forward in public transit.
          </p>
        </motion.div>

        {/* Hero Section with Clock Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dhaka Metro Rail
              </h2>
              <p className="text-gray-600">
                Our metro system offers a fast, reliable, and environmentally friendly way to navigate
                the city. With modern infrastructure and smart technology, we're transforming how
                people travel in Dhaka.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm">
                  <FaSubway />
                  <span>Modern Transit</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-600 text-sm">
                  <FaUsers />
                  <span>Millions Served</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-600 text-sm">
                  <FaShieldAlt />
                  <span>Safe Travel</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">20+</div>
                <div className="text-sm text-gray-600">Stations</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">500K+</div>
                <div className="text-sm text-gray-600">Daily Passengers</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl transform rotate-6" />
            <img 
              src="https://i.pinimg.com/736x/9f/a7/67/9fa767e7af1217cc7459ffdf72ecf038.jpg"
              alt="Metro Clock"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover relative z-10"
            />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: FaClock,
              title: "Operating Hours",
              description: "8:00 AM to 8:00 PM daily",
              color: "bg-blue-100 text-blue-600"
            },
            {
              icon: FaMapMarkedAlt,
              title: "Route Coverage",
              description: "Major points across Dhaka",
              color: "bg-primary/10 text-primary"
            },
            {
              icon: FaTicketAlt,
              title: "Smart Ticketing",
              description: "Digital & contactless payment",
              color: "bg-green-100 text-green-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <FaInfoCircle className="text-primary" />
              <span className="text-primary font-semibold">Our Mission</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Transforming Urban Mobility
            </h2>
            <p className="text-gray-600">
              We are committed to providing a world-class transit system that enhances the quality
              of life for Dhaka's residents by offering safe, efficient, and sustainable
              transportation solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 