import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) setLang(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'am' : 'en';
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (section, key) => {
    try {
      return translations[lang][section][key] || translations['en'][section][key] || key;
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
