// src/components/common.jsx
import React from 'react';

// Container 컴포넌트
export const Container = ({ children, style = {} }) => (
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    ...style
  }}>
    {children}
  </div>
);

// Card 컴포넌트 (그림자 및 테두리 조정)
export const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #f3f4f6', // 연한 테두리 추가
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  }}
  onMouseEnter={(e) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 15px rgba(234, 88, 12, 0.1)'; // 오렌지빛 그림자
      e.currentTarget.style.borderColor = '#fdba74'; // 호버 시 연한 오렌지 테두리
    }
  }}
  onMouseLeave={(e) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      e.currentTarget.style.borderColor = '#f3f4f6';
    }
  }}>
    {children}
  </div>
);

// Button 컴포넌트 (TIA 오렌지 테마 적용)
export const Button = ({ children, onClick, variant = 'primary', style = {} }) => {
  const variants = {
    primary: {
      // TIA 로고의 오렌지 그라데이션
      background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 6px rgba(234, 88, 12, 0.2)'
    },
    secondary: {
      background: 'white',
      color: '#EA580C', // 텍스트를 오렌지색으로
      border: '2px solid #EA580C'
    },
    danger: {
      background: '#DC2626',
      color: 'white',
      border: 'none'
    },
    grey: {
      background: '#374151', // 로고의 짙은 회색
      color: 'white',
      border: 'none'
    }
  };
  
  return (
    <button onClick={onClick} style={{
      ...variants[variant],
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '700', // 폰트 두께 강화
      cursor: 'pointer',
      transition: 'all 0.3s',
      ...style
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.9';
        e.currentTarget.style.transform = 'scale(1.02)';
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1)';
    }}
    >
      {children}
    </button>
  );
};

// Input 컴포넌트
export const Input = ({ label, type = 'text', value, onChange, placeholder, style = {} }) => (
  <div style={{ marginBottom: '20px', ...style }}>
    {label && <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
      {label}
    </label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '12px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s',
        boxSizing: 'border-box'
      }}
      onFocus={(e) => e.target.style.borderColor = '#F97316'} // 포커스 시 오렌지색
      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
    />
  </div>
);

// Textarea 컴포넌트
export const Textarea = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div style={{ marginBottom: '20px' }}>
    {label && <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
      {label}
    </label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '12px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        resize: 'vertical',
        boxSizing: 'border-box'
      }}
      onFocus={(e) => e.target.style.borderColor = '#F97316'}
      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
    />
  </div>
);