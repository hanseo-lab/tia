// src/components/Header.jsx
import React from 'react';
import { useAuthStore } from '../store/authStore';
import logoImg from '../assets/tia-logo.png'; // 로고 이미지 import

export const Header = ({ currentPage, setCurrentPage }) => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'performances', label: '공연 정보' },
    { id: 'reviews', label: '공연 후기' },
  ];

  return (
    <header style={{ 
      background: 'white', 
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* 로고 영역 */}
        <div 
          onClick={() => setCurrentPage('home')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            gap: '12px'
          }}
        >
          {/* TIA 로고 이미지 */}
          <img 
            src={logoImg} 
            alt="TIA Logo" 
            style={{ height: '60px', objectFit: 'contain' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: '900', color: '#1f2937', lineHeight: '1' }}>TIA</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#EA580C', letterSpacing: '1px' }}>TAEKWONDO MISSION</span>
          </div>
        </div>

        {/* 네비게이션 */}
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: currentPage === item.id ? '700' : '500',
                color: currentPage === item.id ? '#EA580C' : '#4b5563', // 활성화 시 오렌지색
                cursor: 'pointer',
                padding: '5px 0',
                position: 'relative'
              }}
            >
              {item.label}
              {currentPage === item.id && (
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#EA580C'
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* 로그인/마이페이지 버튼 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>
                <strong style={{ color: '#EA580C' }}>{user.name}</strong>님
              </span>
              <button
                onClick={() => setCurrentPage('mypage')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #e5e7eb',
                  background: 'white',
                  color: '#4b5563',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                마이페이지
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('login')}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: 'none',
                background: '#1f2937', // 로고의 검은색 부분 활용
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};