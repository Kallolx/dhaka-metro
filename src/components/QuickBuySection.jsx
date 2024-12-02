import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrain, FaClock, FaTicketAlt, FaWallet, FaQrcode, FaChevronDown } from 'react-icons/fa';
import { calculateFare, calculateTime, stations } from '../utils/fareData';
import BkashDialog from './payments/BkashDialog';
import NagadDialog from './payments/NagadDialog';
import QRScanner from './payments/QRScanner';
import TicketSuccessDialog from './payments/TicketSuccessDialog';

const BKASH_LOGO = "https://freepnglogo.com/images/all_img/1701541855%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6-%E0%A6%B2%E0%A6%97%E0%A7%8B.png";
const NAGAD_LOGO = 'https://nagad.com.bd/_nuxt/img/new-logo.14fe8a5.png';

function StationOption({ station, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-3 text-left transition-all duration-200
        flex items-center gap-3 hover:bg-gray-50
        ${isSelected ? 'bg-primary/5' : ''}
      `}
    >
      <div className={`
        w-3 h-3 rounded-full flex-shrink-0
        ${isSelected 
          ? 'bg-primary ring-4 ring-primary/20' 
          : 'bg-gray-300 ring-4 ring-gray-100'
        }
      `} />
      <span className={`
        ${isSelected ? 'text-primary font-medium' : 'text-gray-600'}
      `}>
        {station}
      </span>
    </button>
  );
}

export default function QuickBuySection() {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showBkash, setShowBkash] = useState(false);
  const [showNagad, setShowNagad] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [showTicketSuccess, setShowTicketSuccess] = useState(false);

  useEffect(() => {
    setFare(calculateFare(start, destination));
    setTime(calculateTime(start, destination));
  }, [start, destination]);

  const handlePayment = () => {
    if (!start || !destination || !selectedPayment) return;

    switch (selectedPayment) {
      case 'bkash':
        setShowBkash(true);
        break;
      case 'nagad':
        setShowNagad(true);
        break;
      case 'qr':
        setShowQRScanner(true);
        break;
      default:
        break;
    }
  };

  const handlePaymentSuccess = () => {
    setShowBkash(false);
    setShowNagad(false);
    setShowQRScanner(false);
    setShowTicketSuccess(true);
  };

  return (
    <div id="quick-buy-section" className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 py-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FaTicketAlt className="text-primary" />
            <span className="text-primary font-semibold">Quick Buy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Your <span className="text-primary">Ticket Now</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience hassle-free metro travel with our simple digital ticketing process
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-black/5 border border-white"
        >
          {/* Station Selection */}
          <div className="space-y-6">
            {/* From Station */}
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-3">
                <FaTrain className="text-primary" />
                <span className="text-sm font-medium text-gray-700">From Station</span>
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsFromOpen(!isFromOpen)}
                  className={`
                    w-full bg-white text-left px-4 py-3.5 rounded-xl
                    border-2 transition-all duration-200
                    flex items-center gap-3
                    ${start 
                      ? 'border-primary text-gray-900' 
                      : 'border-gray-200 text-gray-500'
                    }
                    hover:border-primary/50 hover:shadow-lg
                  `}
                >
                  {start ? (
                    <>
                      <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                      <span>{start}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-gray-100" />
                      <span>Select station</span>
                    </>
                  )}
                  <FaChevronDown className={`
                    ml-auto text-primary transition-transform duration-200
                    ${isFromOpen ? 'rotate-180' : ''}
                  `} />
                </button>
                <AnimatePresence>
                  {isFromOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-20 w-full mt-2"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-60 overflow-auto">
                        {stations.map((station) => (
                          <StationOption
                            key={station}
                            station={station}
                            isSelected={start === station}
                            onClick={() => {
                              setStart(station);
                              setIsFromOpen(false);
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* To Station - Similar update */}
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-3">
                <FaTrain className="text-primary" />
                <span className="text-sm font-medium text-gray-700">To Station</span>
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsToOpen(!isToOpen)}
                  className={`
                    w-full bg-white text-left px-4 py-3.5 rounded-xl
                    border-2 transition-all duration-200
                    flex items-center gap-3
                    ${destination 
                      ? 'border-primary text-gray-900' 
                      : 'border-gray-200 text-gray-500'
                    }
                    hover:border-primary/50 hover:shadow-lg
                  `}
                >
                  {destination ? (
                    <>
                      <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                      <span>{destination}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 rounded-full bg-gray-300 ring-4 ring-gray-100" />
                      <span>Select station</span>
                    </>
                  )}
                  <FaChevronDown className={`
                    ml-auto text-primary transition-transform duration-200
                    ${isToOpen ? 'rotate-180' : ''}
                  `} />
                </button>
                <AnimatePresence>
                  {isToOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-20 w-full mt-2"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-60 overflow-auto">
                        {stations.map((station) => (
                          <StationOption
                            key={station}
                            station={station}
                            isSelected={destination === station}
                            onClick={() => {
                              setDestination(station);
                              setIsToOpen(false);
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Fare & Time Info */}
            {fare && time && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-4 mt-6"
              >
                <div className="bg-primary/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTicketAlt className="text-primary" />
                    <span className="text-sm font-medium text-gray-600">Fare</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">৳ {fare}</div>
                </div>
                <div className="bg-primary/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaClock className="text-primary" />
                    <span className="text-sm font-medium text-gray-600">Duration</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{time} mins</div>
                </div>
              </motion.div>
            )}

            {/* Payment Methods */}
            <div className="space-y-4 mt-6">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                <FaWallet className="text-primary" />
                <span className="text-sm font-medium text-gray-700">Payment Method</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'bkash', logo: BKASH_LOGO, name: 'bKash' },
                  { id: 'nagad', logo: NAGAD_LOGO, name: 'Nagad' },
                  { id: 'qr', icon: FaQrcode, name: 'Scan QR' }
                ].map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-200
                      ${selectedPayment === method.id 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                        : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {method.logo ? (
                        <img src={method.logo} alt={method.name} className="h-8 object-contain" />
                      ) : (
                        <method.icon className="text-3xl text-primary" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{method.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Purchase Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={!start || !destination || !selectedPayment}
              className={`
                w-full mt-8 bg-primary text-white py-4 rounded-xl font-medium
                flex items-center justify-center gap-2
                ${(!start || !destination || !selectedPayment)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'}
                transition-all duration-200
              `}
            >
              <FaTicketAlt />
              <span>Purchase Ticket</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Payment Dialogs */}
      <BkashDialog 
        isOpen={showBkash}
        onClose={() => setShowBkash(false)}
        amount={fare}
        onSuccess={handlePaymentSuccess}
      />
      <NagadDialog 
        isOpen={showNagad}
        onClose={() => setShowNagad(false)}
        amount={fare}
        onSuccess={handlePaymentSuccess}
      />
      <QRScanner 
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onSuccess={handlePaymentSuccess}
      />
      <TicketSuccessDialog
        isOpen={showTicketSuccess}
        onClose={() => {
          setShowTicketSuccess(false);
          setStart('');
          setDestination('');
          setSelectedPayment('');
        }}
        ticketData={{
          ticketId: Math.random().toString(36).substr(2, 9).toUpperCase(),
          from: start,
          to: destination,
          fare: fare,
          purchaseTime: new Date().toISOString()
        }}
      />
    </div>
  );
} 