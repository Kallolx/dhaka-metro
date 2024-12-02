import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes, FaCreditCard, FaWallet, FaClock } from 'react-icons/fa';

export default function RechargeSuccessDialog({ isOpen, onClose, amount, cardNumber }) {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-md rounded-3xl overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-primary/10 p-8 flex flex-col items-center relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="text-primary text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recharge Successful!</h2>
            <p className="text-gray-600 text-center">
              Your card has been recharged successfully
            </p>
          </div>

          {/* Transaction Details */}
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {[
                {
                  icon: FaCreditCard,
                  label: "Card Number",
                  value: cardNumber,
                  color: "text-blue-600"
                },
                {
                  icon: FaWallet,
                  label: "Amount",
                  value: `৳${amount}`,
                  color: "text-green-600"
                },
                {
                  icon: FaClock,
                  label: "Date & Time",
                  value: currentDate,
                  color: "text-orange-600"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl"
                >
                  <div className={`w-10 h-10 ${item.color}/10 rounded-lg flex items-center justify-center`}>
                    <item.icon className={item.color} size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Transaction ID */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
              <p className="font-mono text-gray-900">TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full bg-primary text-white py-3 rounded-xl font-medium 
                       shadow-lg shadow-primary/20 hover:shadow-xl 
                       hover:shadow-primary/30 transition-all duration-200"
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 