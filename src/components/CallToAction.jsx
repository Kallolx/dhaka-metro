import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTicketAlt, FaCreditCard, FaArrowRight } from 'react-icons/fa';

export default function CallToAction() {
  const navigate = useNavigate();

  const handleBuyTicketsClick = (e) => {
    e.preventDefault();
    const quickBuySection = document.getElementById('quick-buy-section');
    if (quickBuySection) {
      quickBuySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleRapidPassClick = (e) => {
    e.preventDefault();
    navigate('/rapid-pass');
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 py-16 md:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaTicketAlt className="text-primary" />
                <span className="text-primary font-semibold">Get Started</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to <span className="text-primary">Skip the Queue?</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Experience the convenience of digital metro ticketing. Fast, secure, and hassle-free travel awaits you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                whileHover={{ y: -4 }}
                className="group"
              >
                <button
                  onClick={handleBuyTicketsClick}
                  className="w-full block bg-primary hover:bg-primary/90 text-white p-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <FaTicketAlt className="text-2xl" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold mb-1">Buy Tickets</h3>
                      <p className="text-white/80 text-sm">
                        Purchase single journey tickets instantly
                      </p>
                    </div>
                    <FaArrowRight className="text-xl opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-200" />
                  </div>
                </button>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="group"
              >
                <button
                  onClick={handleRapidPassClick}
                  className="w-full block bg-white hover:bg-gray-50 border-2 border-primary text-gray-900 p-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaCreditCard className="text-2xl text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold mb-1">Rapid Pass</h3>
                      <p className="text-gray-600 text-sm">
                        Recharge your metro rapid pass and enjoy hassle-free travel
                      </p>
                    </div>
                    <FaArrowRight className="text-xl text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-200" />
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}