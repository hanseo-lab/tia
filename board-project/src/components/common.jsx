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

// Card 컴포넌트
export const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  }}
  onMouseEnter={(e) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
    }
  }}
  onMouseLeave={(e) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
  }}>
    {children}
  </div>
);

// Button 컴포넌트
export const Button = ({ children, onClick, variant = 'primary', style = {} }) => {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none'
    },
    secondary: {
      background: 'white',
      color: '#667eea',
      border: '2px solid #667eea'
    },
    danger: {
      background: '#ef4444',
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
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      ...style
    }}>
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
    />
  </div>
);