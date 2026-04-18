import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    title: 'Your Voice Matters',
    desc: 'Participate in shaping the future of your university.'
  },
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
    title: 'Transparent Elections',
    desc: 'Powered by secure, real-time database architecture.'
  },
  {
    url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop',
    title: 'Campus Community',
    desc: 'Vote remotely from anywhere, at any time.'
  }
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-12 bg-transparent dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-gray-800">
          <AnimatePresence initial={false}>
            <motion.img
              key={index}
              src={images[index].url}
              alt={images[index].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
            <motion.div
               key={`text-${index}`}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">{images[index].title}</h3>
              <p className="text-lg md:text-2xl font-medium text-slate-200 drop-shadow-md">{images[index].desc}</p>
            </motion.div>
            
            <div className="hidden md:flex gap-4">
              <button 
                onClick={handlePrev} 
                className="p-3 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors border border-white/20 hover:scale-105"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext} 
                className="p-3 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors border border-white/20 hover:scale-105"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 flex gap-2">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-indigo-500 scale-125 w-6 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-white/60 hover:bg-white/80'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
