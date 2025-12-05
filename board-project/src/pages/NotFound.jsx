import React from 'react';
import { Container, Card, Button } from '../components/StyledComponents';

export const NotFoundPage = ({ setCurrentPage }) => {
  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Card style={{ textAlign: 'center', maxWidth: '600px', padding: '60px 40px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'bounce 2s infinite' }}>🥋</div>
        
        <h1 style={{ 
          fontSize: '80px', 
          fontWeight: '900',
          // 오렌지 그라데이션 적용
          background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          lineHeight: '1'
        }}>
          404
        </h1>
        
        <h2 style={{ fontSize: '24px', color: '#1f2937', marginBottom: '15px', fontWeight: '800' }}>
          페이지를 찾을 수 없습니다
        </h2>
        
        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '40px', lineHeight: '1.6' }}>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
          TIA 태권도 선교단 홈으로 돌아가시겠습니까?
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Button onClick={() => setCurrentPage('home')} style={{ minWidth: '140px' }}>🏠 홈으로</Button>
          <Button onClick={() => setCurrentPage('performances')} variant="secondary" style={{ minWidth: '140px' }}>🎭 공연 정보</Button>
        </div>
        
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `}</style>
      </Card>
    </Container>
  );
};