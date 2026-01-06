import React from 'react';
import { Container, Card, Button } from '../components/common';
import * as S from '../styles/NotFoundStyles';

export const NotFoundPage = ({ setCurrentPage }) => {
  return (
    <Container>
      <S.CenterContainer>
        <Card style={{ textAlign: 'center', maxWidth: '600px', padding: '60px 40px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <S.ErrorIcon>🥋</S.ErrorIcon>
          
          <S.ErrorCode>404</S.ErrorCode>
          
          <S.ErrorTitle>페이지를 찾을 수 없습니다</S.ErrorTitle>
          
          <S.ErrorMessage>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
            TIA 태권도 선교단 홈으로 돌아가시겠습니까?
          </S.ErrorMessage>
          
          <S.ButtonGroup>
            <Button onClick={() => setCurrentPage('home')} style={{ minWidth: '140px' }}>🏠 홈으로</Button>
            <Button onClick={() => setCurrentPage('performances')} variant="secondary" style={{ minWidth: '140px' }}>🎭 공연 정보</Button>
          </S.ButtonGroup>
        </Card>
      </S.CenterContainer>
    </Container>
  );
};