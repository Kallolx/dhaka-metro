import React from 'react';
import { motion } from 'framer-motion';
import { FaQrcode } from 'react-icons/fa';

const BKASH_LOGO = "https://freepnglogo.com/images/all_img/1701541855%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6-%E0%A6%B2%E0%A6%97%E0%A7%8B.png";
const NAGAD_LOGO = 'https://nagad.com.bd/_nuxt/img/new-logo.14fe8a5.png';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Smart Metro Ticketing{' '}
              <span className="text-primary">Made Simple</span>
            </h1>
            
            <p className="text-lg text-gray-600">
              Skip the queues and get your metro tickets instantly. Fast, secure, and contactless payment options available.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <PaymentCard
                icon={<FaQrcode className="text-[32px]" />}
                title="Quick Buy"
                description="Scan & Pay Instantly"
                bgColor="bg-[#00A884]"
              />
              <PaymentCard
                icon={
                  <div className="bg-white p-2 rounded-lg">
                    <img src={BKASH_LOGO} alt="bKash" className="h-8" />
                  </div>
                }
                title="bKash"
                description="Mobile Payment Service"
                bgColor="bg-[#E3106E]"
              />
              <PaymentCard
                icon={
                  <div className="bg-white p-2 rounded-lg">
                    <img src={NAGAD_LOGO} alt="Nagad" className="h-8" />
                  </div>
                }
                title="Nagad"
                description="Digital Financial Service"
                bgColor="bg-[#FF6B2B]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PaymentCard({ icon, title, description, bgColor }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`
        ${bgColor} rounded-2xl overflow-hidden shadow-lg
        cursor-default transition-all duration-300
      `}
    >
      <div className="p-6 text-white">
        <div className="flex flex-col items-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
          <p className="text-white/90 text-center text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}