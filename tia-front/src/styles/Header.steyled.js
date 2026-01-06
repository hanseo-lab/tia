import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
`;

export const LogoImage = styled.img`
  height: 60px;
  object-fit: contain;
`;

export const LogoTextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoTitle = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: #1f2937;
  line-height: 1;
`;

export const LogoSubtitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #EA580C;
  letter-spacing: 1px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${props => props.$active ? '700' : '500'};
  color: ${props => props.$active ? '#EA580C' : '#4b5563'};
  cursor: pointer;
  padding: 5px 0;
  position: relative;
`;

export const NavIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #EA580C;
`;

export const AuthSection = styled.div`
  display: flex;
  gap: 10px;
`;

export const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const UserName = styled.span`
  font-size: 14px;
  color: #374151;
  
  strong {
    color: #EA580C;
  }
`;

export const MyPageButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #4b5563;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

export const LoginButton = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: #1f2937;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;