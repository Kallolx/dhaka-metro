import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCamera, FaExclamationTriangle } from 'react-icons/fa';

export default function QRScanner({ isOpen, onClose, onSuccess }) {
  const [hasCamera, setHasCamera] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (isOpen) {
      checkCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const checkCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasCamera(videoDevices.length > 0);
      
      if (videoDevices.length > 0) {
        const permission = await navigator.permissions.query({ name: 'camera' });
        setPermissionStatus(permission.state);
        
        if (permission.state === 'granted') {
          startCamera();
        }
      }
    } catch (error) {
      console.error('Error checking camera:', error);
      setHasCamera(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setPermissionStatus('granted');
      
      // Here you would typically initialize a QR code scanner library
      // For example: using zxing-js/library or jsQR
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      setPermissionStatus('denied');
    }
  };

  const handleScan = (data) => {
    if (data) {
      onSuccess?.();
      onClose();
    }
  };

  const renderContent = () => {
    if (hasCamera === false) {
      return (
        <div className="text-center p-6">
          <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Camera Found</h3>
          <p className="text-gray-600">
            Please make sure your device has a camera connected and try again.
          </p>
        </div>
      );
    }

    if (permissionStatus === 'denied') {
      return (
        <div className="text-center p-6">
          <FaCamera className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Camera Access Denied</h3>
          <p className="text-gray-600">
            Please allow camera access in your browser settings to scan QR codes.
          </p>
        </div>
      );
    }

    return (
      <div className="relative aspect-square bg-black">
        <video
          id="qr-video"
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        />
        <div className="absolute inset-0 border-2 border-white/50 rounded-lg m-8">
          <div className="absolute inset-0 border-2 border-primary animate-pulse rounded-lg" />
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white w-full max-w-md rounded-2xl overflow-hidden"
        >
          <div className="p-4 flex items-center justify-between border-b">
            <h3 className="text-lg font-semibold">Scan QR Code</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {renderContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 