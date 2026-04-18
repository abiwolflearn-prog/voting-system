import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';

export default function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setNews(res.data);
      } catch (err) {
        console.error('Failed to fetch news', err);
      }
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">Campus News & Updates</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Stay informed with the latest announcements regarding the student elections and campus events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-slate-200 dark:border-gray-800"
            >
              {item.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-indigo-600 dark:text-indigo-400 mb-3 font-semibold">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {item.author || 'Admin'}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
