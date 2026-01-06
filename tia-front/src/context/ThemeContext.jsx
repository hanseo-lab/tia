// context/ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const themeStyles = {
    light: {
      background: 'linear-gradient(to bottom, #f3f4f6, #ffffff)',
      color: '#1f2937',
      cardBackground: '#ffffff'
    },
    dark: {
      background: 'linear-gradient(to bottom, #1f2937, #111827)',
      color: '#f9fafb',
      cardBackground: '#374151'
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles: themeStyles[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};