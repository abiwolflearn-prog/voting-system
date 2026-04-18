import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Users, Lock, BarChart, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
    title: 'Bank-Grade Security',
    description: 'We utilize advanced cryptographic techniques to ensure every vote is completely anonymous and tamper-proof.',
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    title: 'Lightning Fast',
    description: 'Cast your vote in seconds. Our optimized infrastructure ensures a smooth experience even during peak hours.',
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: 'Verified Students',
    description: 'Strict authentication via university SSO guarantees that only currently enrolled students can participate.',
  },
  {
    icon: <BarChart className="w-6 h-6 text-indigo-500" />,
    title: 'Real-time Analytics',
    description: 'Watch the results unfold instantly via live dashboards once the voting period concludes.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-purple-500" />,
    title: 'Mobile Optimized',
    description: 'Designed natively for mobile devices so you can securely vote anywhere, anytime.',
  },
  {
    icon: <Lock className="w-6 h-6 text-blue-500" />,
    title: 'Transparent Process',
    description: 'End-to-end verifiability allows voters to independently check that their vote was correctly recorded.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Next-Generation Voting Technology
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our platform delivers a seamless, highly secure election experience designed specifically for university environments.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-8 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-gray-800 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
