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
      background-color: #ffffff; /* 순백색 배경 권장 */
    }
    
    button {
      font-family: inherit;
    }
    
    /* 포커스 색상을 오렌지로 변경 */
    input:focus, 
    textarea:focus {
      outline: none;
      border-color: #EA580C !important;
      box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.2);
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* 스크롤바 스타일 (오렌지) */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f3f4f6;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #fdba74; /* 연한 오렌지 */
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #EA580C; /* 진한 오렌지 */
    }
  `}</style>
);