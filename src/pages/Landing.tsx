import React from 'react';
import Navbar from '../components/Navbar.tsx';
import Hero from '../components/Hero.tsx';

const Landing = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      {/* More sections */}
    </div>
  );
};

export default Landing;
