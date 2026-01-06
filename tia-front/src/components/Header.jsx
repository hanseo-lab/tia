import React from 'react';
import { useAuthStore } from '../store/authStore';
import logoImg from '../assets/tia-logo.png';
import * as S from '../styles/Header.steyled';

export const Header = ({ currentPage, setCurrentPage }) => {
  const { user, isAuthenticated } = useAuthStore();

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'performances', label: '공연 정보' },
    { id: 'reviews', label: '공연 후기' },
  ];

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        {/* 로고 영역 */}
        <S.LogoSection onClick={() => setCurrentPage('home')}>
          <S.LogoImage src={logoImg} alt="TIA Logo" />
          <S.LogoTextGroup>
            <S.LogoTitle>TIA</S.LogoTitle>
            <S.LogoSubtitle>TAEKWONDO MISSION</S.LogoSubtitle>
          </S.LogoTextGroup>
        </S.LogoSection>

        {/* 네비게이션 */}
        <S.Nav>
          {navItems.map(item => (
            <S.NavButton
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              $active={currentPage === item.id}
            >
              {item.label}
              {currentPage === item.id && <S.NavIndicator />}
            </S.NavButton>
          ))}
        </S.Nav>

        {/* 로그인/마이페이지 버튼 */}
        <S.AuthSection>
          {isAuthenticated ? (
            <S.UserGreeting>
              <S.UserName>
                <strong>{user.name}</strong>님
              </S.UserName>
              <S.MyPageButton onClick={() => setCurrentPage('mypage')}>
                마이페이지
              </S.MyPageButton>
            </S.UserGreeting>
          ) : (
            <S.LoginButton onClick={() => setCurrentPage('login')}>
              로그인
            </S.LoginButton>
          )}
        </S.AuthSection>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};