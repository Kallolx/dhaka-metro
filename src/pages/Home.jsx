import React from 'react';
import Hero from '../components/Hero';
import QuickBuySection from '../components/QuickBuySection';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <QuickBuySection />
      <HowItWorks />
      <CallToAction />
    </div>
  );
} 