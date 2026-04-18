import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, LogIn, CheckCircle, PieChart } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Register',
    description: 'Create an account using your official university email to verify your identity.',
    icon: <UserPlus className="w-6 h-6 text-white" />,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: '02',
    title: 'Login securely',
    description: 'Authenticate with our 2FA system to access your personalized election dashboard.',
    icon: <LogIn className="w-6 h-6 text-white" />,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: '03',
    title: 'Cast your vote',
    description: 'Review candidate manifestos and securely submit your preferential or standard vote.',
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: '04',
    title: 'View Results',
    description: 'Once elections close, watch live analytics safely and transparently.',
    icon: <PieChart className="w-6 h-6 text-white" />,
    color: 'from-pink-500 to-rose-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-gray-900 transition-colors overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-purple-600 dark:text-purple-400 font-semibold tracking-wide uppercase text-sm mb-2">Process</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A streamlined 4-step process ensuring that only eligible voters participate seamlessly.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-rose-200 dark:from-blue-900 dark:via-purple-900 dark:to-rose-900 rounded-full z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl flex items-center justify-center mb-6 text-white relative`}
                >
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {step.id}
                  </div>
                  {step.icon}
                </motion.div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
