import React, { useState } from 'react';
import { Header } from './components/Header';
import { PageRouter } from './routes/PageRouter';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff',
      color: '#1f2937'
    }}>
      <GlobalStyles />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <PageRouter currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;