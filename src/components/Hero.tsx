import React from 'react';
import heroVideo from '../assets/0323.mp4';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* 🎥 Cinematic Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🖤 Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* ↓ Scroll Prompt */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-yellow-500 text-sm animate-bounce font-bebas tracking-wide">
          ↓ Scroll
        </p>
      </div>
    </section>
  );
};

export default Hero;
