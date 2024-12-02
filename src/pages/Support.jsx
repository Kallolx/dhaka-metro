import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaEnvelope, FaPhone, FaComments, FaQuestionCircle } from 'react-icons/fa';

export default function Support() {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-primary/5 min-h-screen py-16">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-tl from-primary/10 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FaHeadset className="text-primary" />
            <span className="text-primary font-semibold">Support</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Can We <span className="text-primary">Help You?</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our support team. We're here to help you with any questions or concerns.
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {[
            {
              icon: FaPhone,
              title: 'Call Us',
              description: 'Speak directly with our support team',
              action: 'Call Now',
              link: 'tel:+8801234567890'
            },
            {
              icon: FaEnvelope,
              title: 'Email Support',
              description: 'Send us your queries anytime',
              action: 'Send Email',
              link: 'mailto:support@metroticket.com'
            },
            {
              icon: FaComments,
              title: 'Live Chat',
              description: 'Chat with our support team',
              action: 'Start Chat',
              link: '#'
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <option.icon className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <a
                  href={option.link}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {option.action}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <FaQuestionCircle className="text-primary" />
              <span className="text-primary font-semibold">FAQ</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {/* Add FAQ items here */}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 