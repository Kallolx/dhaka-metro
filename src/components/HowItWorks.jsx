import React from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaMapMarkerAlt, FaCreditCard, FaTicketAlt } from 'react-icons/fa';

const steps = [
  {
    icon: FaQrcode,
    title: 'Scan QR Code',
    description: 'Scan the QR code at any metro station or use our website',
    color: 'bg-primary',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Select Route',
    description: 'Choose your starting point and destination',
    color: 'bg-primary',
  },
  {
    icon: FaCreditCard,
    title: 'Quick Payment',
    description: 'Pay securely using your preferred payment method',
    color: 'bg-primary',
  },
  {
    icon: FaTicketAlt,
    title: 'Get Ticket',
    description: 'Receive your digital ticket instantly and securely',
    color: 'bg-primary',
  },
];

export default function HowItWorks() {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 py-16 md:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FaTicketAlt className="text-primary" />
            <span className="text-primary font-semibold">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Your Ticket in <span className="text-primary">4 Easy Steps</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience hassle-free metro travel with our simple digital ticketing process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Card */}
              <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="text-3xl text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}