import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaIdCard, FaPhone, FaEnvelope, FaCamera } from 'react-icons/fa';

export default function RapidPassDialog({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    nid: '',
    phone: '',
    email: '',
    photo: null,
    address: '',
    emergencyContact: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    onSuccess();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden my-4 sm:my-8"
        >
          {/* Header */}
          <div className="bg-primary p-4 sm:p-6 text-white text-center relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
            <FaIdCard className="text-3xl sm:text-4xl mx-auto mb-2" />
            <h2 className="text-xl sm:text-2xl font-bold">Apply for Rapid Pass</h2>
            <p className="text-white/80 text-sm sm:text-base">Fill in your details to get started</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* NID Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
                    <input
                      type="text"
                      required
                      value={formData.nid}
                      onChange={(e) => setFormData(prev => ({ ...prev, nid: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <div className="flex items-center gap-4">
                    {formData.photo ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                        <img 
                          src={URL.createObjectURL(formData.photo)} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center">
                        <FaCamera className="text-2xl text-gray-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <input
                    type="tel"
                    required
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-medium 
                         shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 
                         transition-all duration-200"
              >
                Submit Application
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this application, you agree to our terms and conditions.
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 