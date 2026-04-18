import React from 'react';
import { CheckSquare, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-300 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <CheckSquare size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                WCU<span className="text-indigo-400">Vote</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm">
              Empowering student voices through secure, transparent, and accessible digital voting solutions for universities worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/vote" className="hover:text-indigo-400 transition-colors">Active Elections</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Past Results</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm flex-1">
            &copy; {new Date().getFullYear()} UniVote System. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
