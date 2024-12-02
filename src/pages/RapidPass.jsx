import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCreditCard, 
  FaWallet, 
  FaQrcode,
  FaInfoCircle,
  FaClock,
  FaShieldAlt,
  FaBolt,
  FaTicketAlt,
  FaHeadset,
  FaUser,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard
} from 'react-icons/fa';
import BkashDialog from '../components/payments/BkashDialog';
import NagadDialog from '../components/payments/NagadDialog';
import QRScanner from '../components/payments/QRScanner';
import RechargeSuccessDialog from '../components/payments/RechargeSuccessDialog';
import RapidPassDialog from '../components/payments/RapidPassDialog';

const BKASH_LOGO = "https://freepnglogo.com/images/all_img/1701541855%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6-%E0%A6%B2%E0%A6%97%E0%A7%8B.png";
const NAGAD_LOGO = "https://nagad.com.bd/_nuxt/img/new-logo.14fe8a5.png";

// Add this constant for pricing info
const PASS_TYPES = [
  {
    name: "Daily Pass",
    price: 200,
    description: "Unlimited rides for 24 hours",
    features: ["Valid for 24 hours", "Unlimited rides", "Best for tourists"]
  },
  {
    name: "Weekly Pass",
    price: 1000,
    description: "7 days of unlimited travel",
    features: ["Valid for 7 days", "Unlimited rides", "15% savings"]
  },
  {
    name: "Monthly Pass",
    price: 3500,
    description: "30 days of unlimited travel",
    features: ["Valid for 30 days", "Unlimited rides", "25% savings"]
  }
];

const CARD_BENEFITS = [
  {
    title: "Instant Recharge",
    description: "Your card is topped up immediately after payment",
    icon: FaBolt
  },
  {
    title: "Secure Transactions",
    description: "End-to-end encrypted payment processing",
    icon: FaShieldAlt
  },
  {
    title: "24/7 Support",
    description: "Get help anytime through our support channels",
    icon: FaHeadset
  }
];

const QUICK_AMOUNTS = [
  { value: 200, label: '৳200' },
  { value: 500, label: '৳500' },
  { value: 1000, label: '৳1000' }
];

// Add these constants at the top
const VALID_CARD = "12345678";
const MOCK_USER_INFO = {
  name: "Kamrul Hasan",
  type: "STANDARD",
  balance: "1,250",
  lastRecharge: "2024-03-15",
  status: "Active"
};

// Add this new component for the card design
const MetroCard = ({ cardNumber, amount }) => {
  return (
    <div className="relative h-64 w-full perspective-1000">
      <motion.div 
        className="absolute inset-0 rounded-3xl shadow-2xl transform-gpu overflow-hidden"
        animate={{ 
          rotateX: [0, 2, 0],
          rotateY: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
      >
        {/* Card Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#1B5E20]">
          {/* Top Header */}
          <div className="h-14 bg-black/20 backdrop-blur-sm flex items-center px-6 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-white rounded-full" />
              <div className="w-7 h-7 bg-white rounded-full opacity-60" />
              <div className="w-7 h-7 bg-white rounded-full opacity-30" />
            </div>
            <span className="text-white font-bold text-xl">Rapid Pass</span>
          </div>

          {/* Metro Illustration */}
          <div className="h-24 relative overflow-hidden">
            {/* Train Illustration */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-16 flex items-center">
                <motion.div
                  className="flex items-center"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-36 h-10 bg-white/90 rounded-lg relative flex items-center">
                    <div className="absolute inset-y-1 left-1 w-8 bg-[#1B5E20] rounded" />
                    <div className="absolute inset-y-1 right-1 w-8 bg-[#1B5E20] rounded" />
                    <div className="absolute inset-x-10 inset-y-1 flex space-x-1">
                      <div className="flex-1 bg-[#1B5E20] rounded" />
                      <div className="flex-1 bg-[#1B5E20] rounded" />
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Track */}
              <div className="h-3 bg-white/10" />
            </div>
          </div>

          {/* Card Information */}
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Card Number</p>
                <p className="font-mono text-xl tracking-wider text-white">
                  {cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-sm mb-1">Balance</p>
                  <p className="text-2xl font-bold text-white">
                    ৳ {amount || '0.00'}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Card Price</p>
                  <p className="font-mono text-xl text-white">৳ 500</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Chip */}
          <div className="absolute bottom-8 left-8">
            <div className="w-12 h-10 bg-[#FFD700] rounded-lg rotate-90 opacity-80" />
          </div>

          {/* Card Type */}
          <div className="absolute bottom-4 right-8">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Type:</span>
              <span className="text-white font-bold">STANDARD</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Add this component for the user info sidebar
const UserInfoSidebar = ({ userInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute top-0 -right-80 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <FaUser className="text-2xl text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{userInfo.name}</h3>
            <p className="text-sm text-primary font-medium">{userInfo.type} Card</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Current Balance", value: `৳${userInfo.balance}`, icon: FaWallet },
            { label: "Last Recharge", value: userInfo.lastRecharge, icon: FaHistory },
            { label: "Card Status", value: userInfo.status, icon: FaCheckCircle }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
                <item.icon className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Card verified successfully. Please proceed with recharge.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// First, add this component for the user info popup
const UserInfoPopup = ({ userInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-64 z-50"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <FaUser className="text-primary" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{userInfo.name}</div>
            <div className="text-sm text-primary">{userInfo.type}</div>
          </div>
        </div>
        
        {[
          { label: "Balance", value: `৳${userInfo.balance}`, icon: FaWallet },
          { label: "Last Recharge", value: userInfo.lastRecharge, icon: FaHistory },
          { label: "Status", value: userInfo.status, icon: FaCheckCircle }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
              <item.icon className="text-primary text-sm" />
            </div>
            <div>
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="text-sm font-medium text-gray-900">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function RapidPass() {
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isValidCard, setIsValidCard] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber && amount && selectedPayment) {
      setShowPaymentDialog(true);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setCardNumber(value);
    
    if (value.length === 8) {
      if (value === VALID_CARD) {
        setIsValidCard(true);
        setUserInfo(MOCK_USER_INFO);
        setShowUserInfo(true);
      } else {
        setIsValidCard(false);
        setUserInfo(null);
        setShowUserInfo(false);
      }
    } else {
      setIsValidCard(false);
      setUserInfo(null);
      setShowUserInfo(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowSuccessDialog(true);
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 min-h-screen py-16">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FaCreditCard className="text-primary" />
            <span className="text-primary font-semibold">Rapid Pass</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recharge Your <span className="text-primary">Rapid Pass</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Top up your metro card instantly and enjoy hassle-free travel with our secure payment options
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Metro Card Visual */}
          <MetroCard cardNumber={cardNumber} amount={amount} />

          {/* Recharge Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCreditCard className={`${isValidCard ? 'text-primary' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className={`
                      block w-full pl-10 pr-12 py-3 border-2 rounded-xl 
                      transition-colors bg-white/70
                      ${isValidCard 
                        ? 'border-primary focus:ring-2 focus:ring-primary/20' 
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }
                    `}
                    placeholder="Enter 8-digit card number"
                    required
                  />
                  {cardNumber.length === 8 && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {isValidCard ? (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowUserInfo(!showUserInfo)}
                            className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <FaUser className="text-primary" />
                          </button>
                          <AnimatePresence>
                            {showUserInfo && (
                              <UserInfoPopup userInfo={userInfo} />
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Recharge Amounts */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quick Recharge
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {QUICK_AMOUNTS.map((quickAmount) => (
                    <button
                      key={quickAmount.value}
                      type="button"
                      onClick={() => setAmount(quickAmount.value)}
                      className={`
                        py-3 rounded-xl border-2 transition-all duration-200
                        ${amount === quickAmount.value.toString() 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-gray-200 hover:border-primary/50 text-gray-700'
                        }
                      `}
                    >
                      {quickAmount.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaWallet className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl 
                           focus:ring-2 focus:ring-primary/20 focus:border-primary 
                           transition-colors bg-white/70"
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'bkash', logo: BKASH_LOGO, name: 'bKash' },
                    { id: 'nagad', logo: NAGAD_LOGO, name: 'Nagad' },
                    { id: 'qr', icon: FaQrcode, name: 'Scan QR' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-200
                        ${selectedPayment === method.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {method.logo ? (
                          <img src={method.logo} alt={method.name} className="h-8 object-contain" />
                        ) : (
                          <method.icon className="text-2xl text-primary" />
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {method.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white 
                         py-3 rounded-xl font-medium shadow-lg shadow-primary/20 
                         hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              >
                Recharge Now
              </motion.button>
            </form>
          </div>

          {/* Apply for New Card Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaCreditCard className="text-primary" />
                <span className="text-primary font-semibold">Apply for New Card</span>
              </div>
            </div>

            {/* Pass Types Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {PASS_TYPES.map((pass) => (
                <motion.div
                  key={pass.name}
                  whileHover={{ y: -4 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 
                            shadow-lg shadow-black/5 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center 
                                mx-auto mb-4">
                    <FaTicketAlt className="text-primary text-xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pass.name}</h4>
                  <div className="text-2xl font-bold text-primary mb-3">
                    ৳{pass.price}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{pass.description}</p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    {pass.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Apply Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowApplyDialog(true)}
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 
                          rounded-xl font-medium shadow-lg shadow-primary/20 
                          hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              >
                <FaIdCard className="text-xl" />
                <span>Apply Now</span>
              </motion.button>
              <p className="mt-4 text-sm text-gray-500">
                Get your Rapid Pass today and start saving on your daily commute
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Dialogs */}
      <BkashDialog 
        isOpen={showPaymentDialog && selectedPayment === 'bkash'} 
        onClose={() => setShowPaymentDialog(false)}
        amount={amount}
        onSuccess={handlePaymentSuccess}
      />
      <NagadDialog 
        isOpen={showPaymentDialog && selectedPayment === 'nagad'} 
        onClose={() => setShowPaymentDialog(false)}
        amount={amount}
        onSuccess={handlePaymentSuccess}
      />
      <QRScanner 
        isOpen={showPaymentDialog && selectedPayment === 'qr'} 
        onClose={() => setShowPaymentDialog(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Success Dialog */}
      <RechargeSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => {
          setShowSuccessDialog(false);
          // Reset form
          setCardNumber('');
          setAmount('');
          setSelectedPayment('');
          setUserInfo(null);
          setShowUserInfo(false);
        }}
        amount={amount}
        cardNumber={cardNumber}
      />

      {/* Add RapidPass Dialog */}
      <RapidPassDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onSuccess={() => {
          setShowApplyDialog(false);
          // You can add a success message or redirect here
        }}
      />

      {/* Add the user info sidebar with AnimatePresence */}
      <AnimatePresence>
        {showUserInfo && userInfo && (
          <UserInfoSidebar userInfo={userInfo} />
        )}
      </AnimatePresence>
    </div>
  );
} 