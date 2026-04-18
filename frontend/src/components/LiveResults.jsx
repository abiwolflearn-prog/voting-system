import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function LiveResults() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/vote/results');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch real-time results', err);
      }
    };
    
    fetchResults(); // Initial fetch
    const intervalId = setInterval(fetchResults, 10000); // Update every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">Live Election Results</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Track real-time data from ongoing campus elections with our interactive dashboard.
          </p>
        </motion.div>

        <div className="glass-panel p-6 rounded-2xl md:p-10">
          <div className="h-80 md:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                />
                <Bar dataKey="votes" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={2000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
