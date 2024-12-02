import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrain, FaClock, FaTicketAlt, FaMapMarkedAlt, FaQrcode, FaWallet, FaChevronDown } from 'react-icons/fa';
import { calculateFare, calculateTime, stations } from '../utils/fareData';
import BkashDialog from '../components/payments/BkashDialog';
import NagadDialog from '../components/payments/NagadDialog';
import QRScanner from '../components/payments/QRScanner';
import TicketSuccessDialog from '../components/payments/TicketSuccessDialog';

const BKASH_LOGO = "https://freepnglogo.com/images/all_img/1701541855%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6-%E0%A6%B2%E0%A6%97%E0%A7%8B.png";
const NAGAD_LOGO = 'https://nagad.com.bd/_nuxt/img/new-logo.14fe8a5.png';

export default function QuickBuy() {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showBkash, setShowBkash] = useState(false);
  const [showNagad, setShowNagad] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
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
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 min-h-screen py-16">
      <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      
      <div className="relative max-w-xl mx-auto px-4">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5">
          <div className="space-y-6">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Quick Buy Ticket</h2>
              <p className="text-gray-500 mt-2">Purchase your metro ticket instantly</p>
            </div>

            {/* Station Selection */}
            <div className="space-y-4">
              <StationSelector
                label="From Station"
                value={start}
                onChange={setStart}
                icon={<FaTrain className="text-primary" />}
              />
              <StationSelector
                label="To Station"
                value={destination}
                onChange={setDestination}
                icon={<FaMapMarkedAlt className="text-primary" />}
              />
            </div>

            {/* Fare & Time Info */}
            {fare && time && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur rounded-xl p-4 border-2 border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaTicketAlt className="text-primary" />
                    <span>Fare</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">৳ {fare}</div>
                </div>
                <div className="bg-white/70 backdrop-blur rounded-xl p-4 border-2 border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="text-primary" />
                    <span>Time</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{time} min</div>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaWallet className="text-primary" />
                Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <PaymentOption
                  id="bkash"
                  selected={selectedPayment === 'bkash'}
                  onClick={() => setSelectedPayment('bkash')}
                  icon={
                    <div className="w-16 h-8 relative">
                      <img 
                        src={BKASH_LOGO} 
                        alt="bKash" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  }
                  name="bKash"
                />
                <PaymentOption
                  id="nagad"
                  selected={selectedPayment === 'nagad'}
                  onClick={() => setSelectedPayment('nagad')}
                  icon={
                    <div className="w-16 h-8 relative">
                      <img 
                        src={NAGAD_LOGO} 
                        alt="Nagad" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  }
                  name="Nagad"
                />
                <PaymentOption
                  id="qr"
                  selected={selectedPayment === 'qr'}
                  onClick={() => setSelectedPayment('qr')}
                  icon={<FaQrcode className="text-3xl text-primary" />}
                  name="Scan QR"
                />
              </div>
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePayment}
              disabled={!start || !destination || !selectedPayment}
              className={`
                w-full bg-primary text-white py-3 rounded-xl font-medium
                ${(!start || !destination || !selectedPayment)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'}
                transition-all duration-200
              `}
            >
              Purchase Ticket
            </button>
          </div>
        </div>
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

function StationSelector({ label, value, onChange, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        <span>{label}</span>
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full bg-white/70 backdrop-blur text-left
            px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200
            border-2 border-gray-200 hover:border-primary/50
            flex items-center justify-between
            ${value ? 'text-gray-900' : 'text-gray-500'}
          `}
        >
          {value || 'Select station'}
          <FaChevronDown className={`
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto"
            >
              {stations.map((station) => (
                <button
                  key={station}
                  onClick={() => {
                    onChange(station);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-3 py-2 text-left transition-colors
                    ${value === station 
                      ? 'bg-primary/5 text-primary font-medium' 
                      : 'hover:bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  {station}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PaymentOption({ id, selected, onClick, icon, name }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-200
        ${selected 
          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
          : 'border-gray-200 hover:border-primary/50'
        }
      `}
    >
      <div className="flex flex-col items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>
    </motion.button>
  );
}