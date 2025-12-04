import React from 'react';
import { Container, Card, Button } from '../components/StyledComponents';

export const NotFoundPage = ({ setCurrentPage }) => {
  return (
    <Container style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <Card style={{ 
        textAlign: 'center', 
        maxWidth: '600px',
        padding: '60px 40px'
      }}>
        {/* 404 아이콘 */}
        <div style={{ 
          fontSize: '120px', 
          marginBottom: '20px',
          animation: 'bounce 2s infinite'
        }}>
          🥋
        </div>
        
        {/* 에러 코드 */}
        <h1 style={{ 
          fontSize: '72px', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '20px'
        }}>
          404
        </h1>
        
        {/* 메시지 */}
        <h2 style={{ 
          fontSize: '28px', 
          color: '#1f2937',
          marginBottom: '15px',
          fontWeight: '600'
        }}>
          페이지를 찾을 수 없습니다
        </h2>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br />
          URL을 다시 확인해주세요.
        </p>
        
        {/* 버튼들 */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Button 
            onClick={() => setCurrentPage('home')}
            style={{ minWidth: '150px' }}
          >
            🏠 홈으로 가기
          </Button>
          
          <Button 
            onClick={() => setCurrentPage('performances')}
            variant="secondary"
            style={{ minWidth: '150px' }}
          >
            🎭 공연 보러가기
          </Button>
        </div>
        
        {/* 추가 링크 */}
        <div style={{ 
          marginTop: '40px',
          paddingTop: '30px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            marginBottom: '15px'
          }}>
            자주 찾는 페이지
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setCurrentPage('performances')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '5px 10px'
              }}
            >
              공연 정보
            </button>
            <button
              onClick={() => setCurrentPage('reviews')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '5px 10px'
              }}
            >
              공연 후기
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '5px 10px'
              }}
            >
              로그인
            </button>
          </div>
        </div>
        
        {/* 애니메이션 CSS */}
        <style>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </Card>
    </Container>
  );
};