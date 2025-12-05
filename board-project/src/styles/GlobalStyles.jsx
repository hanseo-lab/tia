// styles/GlobalStyles.jsx
import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                   'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #1f2937;
    }
    
    button {
      font-family: inherit;
    }
    
    button:hover {
      opacity: 0.9;
    }
    
    input:focus, 
    textarea:focus {
      outline: none;
      border-color: #667eea;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* 스크롤바 스타일 */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #667eea;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #764ba2;
    }
  `}</style>
);