import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const APP_STORE_ICON = "https://img.icons8.com/?size=256&id=fKXXelWgP1B6&format=png";
const PLAY_STORE_ICON = "https://img.icons8.com/?size=256&id=L1ws9zn2uD01&format=png";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-primary font-semibold">Contact Info</span>
              </div>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                  <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <span>123 Metro Station Road, Dhaka, Bangladesh</span>
                </a>
                <a href="mailto:info@metroticket.com" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                  <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <span>info@metroticket.com</span>
                </a>
                <a href="tel:+8801234567890" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                  <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-primary" />
                  </div>
                  <span>+880 1234-567890</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaGlobe className="text-primary" />
                <span className="text-primary font-semibold">Follow Us</span>
              </div>
              <div className="flex gap-2">
                {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -2 }}
                    className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center hover:bg-primary group transition-colors"
                  >
                    <Icon className="text-primary group-hover:text-white transition-colors" size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Download App */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaTicketAlt className="text-primary" />
                <span className="text-primary font-semibold">Get Our App</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  <img src={APP_STORE_ICON} alt="App Store" className="w-8 h-8" />
                  <div>
                    <p className="text-xs text-gray-500">Download on the</p>
                    <p className="text-sm font-bold text-gray-900">App Store</p>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  <img src={PLAY_STORE_ICON} alt="Play Store" className="w-8 h-8" />
                  <div>
                    <p className="text-xs text-gray-500">Get it on</p>
                    <p className="text-sm font-bold text-gray-900">Play Store</p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Developer Info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaGlobe className="text-primary" />
                <span className="text-primary font-semibold">Developer</span>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src="https://portfolio-five-coral-31.vercel.app/assets/bot-B8hQVRPN.png"
                    alt="Developer"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Kamrul Hasan</h4>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[
                    { Icon: FaGlobe, url: 'https://portfolio-five-coral-31.vercel.app/' },
                    { Icon: FaGithub, url: 'https://github.com/Kallolx' },
                    { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/kamrul-hasan-dev/' }
                  ].map(({ Icon, url }) => (
                    <motion.a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="flex-1 py-2 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-gray-100">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Metro Ticketing. All rights reserved. | Developed by{' '}
            <a 
              href="https://portfolio-five-coral-31.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Kamrul Hasan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}