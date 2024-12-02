import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RapidPass from './pages/RapidPass';
import Support from './pages/Support';
import About from './pages/About';
import QuickBuy from './pages/QuickBuy';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rapid-pass" element={<RapidPass />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/quick-buy" element={<QuickBuy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}