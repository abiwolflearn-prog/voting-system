import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Computer Science Major",
    quote: "UniVote made the election process incredibly smooth. The UI is gorgeous and it's so easy to see candidate platforms.",
    initials: "AJ"
  },
  {
    name: "Sarah Chen",
    role: "Student Body President",
    quote: "As an organizer, the admin panel and live results feature saved us hours of manual counting. Highly recommended!",
    initials: "SC"
  },
  {
    name: "Michael Torres",
    role: "Business Major",
    quote: "I love the dark mode and how responsive it is on mobile. Voted between classes in under a minute.",
    initials: "MT"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">What Students Say</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what your peers think about the new voting system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel p-8 relative"
            >
              <Quote className="absolute top-6 right-6 text-indigo-200 dark:text-indigo-900/50" size={40} />
              <p className="text-slate-600 dark:text-slate-300 mb-6 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
