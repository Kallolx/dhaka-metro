import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const BKASH_LOGO = "https://freepnglogo.com/images/all_img/1701541855%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6-%E0%A6%B2%E0%A6%97%E0%A7%8B.png";

export default function BkashDialog({ isOpen, onClose, amount, onSuccess }) {
  console.log('BkashDialog render:', { isOpen, amount });
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    console.log('BkashDialog isOpen changed:', isOpen);
  }, [isOpen]);

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
        <div className="bg-[#E2136E] p-4 flex items-center justify-between">
          <div className="w-24 h-8 bg-white rounded-lg p-1">
            <img 
              src={BKASH_LOGO}
              alt="bKash" 
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
            <div className="text-2xl font-bold text-[#E2136E]">৳ {amount}</div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter bKash account number"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E2136E] focus:ring-[#E2136E]/20"
            />

            <div className="text-xs text-gray-500 text-center">
              By clicking Confirm, you agree to the terms & conditions
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleConfirm}
                disabled={!phoneNumber}
                className={`px-6 py-3 bg-[#E2136E] text-white rounded-lg font-medium 
                  ${phoneNumber ? 'hover:bg-[#E2136E]/90' : 'opacity-50 cursor-not-allowed'} 
                  transition-colors`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 