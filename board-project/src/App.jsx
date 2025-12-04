// App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { PageRouter } from './routes/PageRouter';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #f3f4f6, #ffffff)' 
      }}>
        <GlobalStyles />
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <PageRouter currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </ThemeProvider>
  );
};

export default App;