import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaQrcode, FaClock, FaMapMarkedAlt, FaTicketAlt, FaIdCard } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import RapidPassDialog from './RapidPassDialog';

export default function TicketSuccessDialog({ isOpen, onClose, ticketData }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [showRapidPassDialog, setShowRapidPassDialog] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = document.getElementById('ticket-qr');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `metro-ticket-${ticketData.ticketId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

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
          className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden my-4 sm:my-8"
        >
          {/* Header */}
          <div className="bg-primary p-4 sm:p-6 text-white text-center relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
            <FaTicketAlt className="text-3xl sm:text-4xl mx-auto mb-2" />
            <h2 className="text-xl sm:text-2xl font-bold">Ticket Generated!</h2>
            <p className="text-white/80 text-sm sm:text-base">Valid for single journey</p>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* QR Code Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="p-2 sm:p-4 bg-white rounded-2xl shadow-lg">
                    <QRCode
                      id="ticket-qr"
                      value={JSON.stringify(ticketData)}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
                
                {/* Timer */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-1">QR Code expires in</p>
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    {formatTime(timeLeft)}
                  </div>
                </div>

                {/* Download Button */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary 
                           py-2.5 sm:py-3 rounded-xl font-medium hover:bg-primary/20 transition-colors"
                >
                  <FaDownload />
                  <span>Download QR Code</span>
                </motion.button>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  Please show this QR code at the station gate for entry
                </p>
              </div>
            </div>

            {/* Ticket Details Section */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Ticket Details
              </h3>
              
              {[
                {
                  icon: FaMapMarkedAlt,
                  label: "Journey",
                  value: `${ticketData.from} → ${ticketData.to}`
                },
                {
                  icon: FaTicketAlt,
                  label: "Fare",
                  value: `৳${ticketData.fare}`
                },
                {
                  icon: FaClock,
                  label: "Purchase Time",
                  value: new Date().toLocaleTimeString()
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-xl"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary text-lg sm:text-xl" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900 text-base sm:text-lg">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="bg-primary/5 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
                <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  Important Notes:
                </h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2">
                  <li>• This ticket is valid for a single journey only</li>
                  <li>• Please keep the QR code ready for scanning at gates</li>
                  <li>• Ticket is non-transferable and non-refundable</li>
                </ul>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowRapidPassDialog(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary 
                            py-3 rounded-xl font-medium hover:bg-primary/20 transition-colors"
                >
                  <FaIdCard />
                  <span>Apply for Rapid Pass</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Get a Rapid Pass for unlimited travel benefits
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <RapidPassDialog
        isOpen={showRapidPassDialog}
        onClose={() => setShowRapidPassDialog(false)}
        onSuccess={() => {
          setShowRapidPassDialog(false);
          // You can add additional success handling here
        }}
      />
    </AnimatePresence>
  );
} 