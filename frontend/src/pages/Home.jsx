import React from 'react';
import Hero from '../components/Hero';
import ImageSlider from '../components/ImageSlider';
import NewsSection from '../components/NewsSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import LiveResults from '../components/LiveResults';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="w-full selection:bg-indigo-500/30">
      <Hero />
      <ImageSlider />
      <NewsSection />
      <Features />
      <HowItWorks />
      <LiveResults />
      <Testimonials />
    </div>
  );
}
