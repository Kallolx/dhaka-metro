import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const NAGAD_LOGO = 'https://nagad.com.bd/_nuxt/img/new-logo.14fe8a5.png';

export default function NagadDialog({ isOpen, onClose, amount, onSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = () => {
    if (phoneNumber) {
      onSuccess?.(); // Call onSuccess if provided
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#FF6B2B] p-4 flex items-center justify-between">
          <div className="w-24 h-8 bg-white rounded-lg p-1">
            <img 
              src={NAGAD_LOGO}
              alt="Nagad" 
              className="w-full h-full object-contain"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-gray-600 mb-1">Metro Rail Ticket Purchase</div>
            <div className="text-2xl font-bold text-[#FF6B2B]">৳ {amount}</div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Nagad account number"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B2B] focus:ring-[#FF6B2B]/20"
            />

            <div className="text-xs text-gray-500 text-center">
              By clicking Proceed, you agree to the terms & conditions
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!phoneNumber}
                className={`px-6 py-3 bg-[#FF6B2B] text-white rounded-lg font-medium 
                  ${phoneNumber ? 'hover:bg-[#FF6B2B]/90' : 'opacity-50 cursor-not-allowed'} 
                  transition-colors`}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 