import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Container = styled.div`
    width: 100%;
    overflow-x: hidden;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5%;
    background-color: var(--color-white);
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 1000;

    @media (max-width: 768px) {
        padding: 10px 5%;
    }
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
`;

const LogoImg = styled.img`
    height: 60px;
    width: auto;

    @media (max-width: 768px) {
        height: 45px;
    }
`;

const Nav = styled.nav`
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
        display: none; /* Mobile menu implementation usually goes here */
    }
`;

const NavItem = styled(Link)`
    font-weight: 600;
    color: var(--color-primary);
    transition: color 0.2s;
    font-size: 1rem;

    &:hover {
        color: var(--color-accent);
    }
`;

const HeroSection = styled.section`
    height: 80vh;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f9f9f9;
    padding: 0 20px;
    background-image: radial-gradient(#eee 1px, transparent 1px);
    background-size: 20px 20px;
`;

const HeroTitle = styled.h1`
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 20px;
    color: var(--color-primary);
    line-height: 1.1;

    span {
        color: var(--color-accent);
    }

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const HeroSubtitle = styled.p`
    font-size: 1.25rem;
    color: #555;
    max-width: 600px;
    margin-bottom: 40px;
    word-break: keep-all;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const CTAButton = styled(Link)`
    padding: 15px 40px;
    background-color: var(--color-accent);
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    border-radius: 50px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(255, 128, 0, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 128, 0, 0.4);
    }
`;

const InfoSection = styled.section`
    padding: 80px 5%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
`;

const InfoCard = styled.div`
    text-align: center;
    padding: 40px 30px;
    background: white;
    border: 1px solid #eaeaea;
    border-radius: 16px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.05);
        border-color: var(--color-accent);
    }
`;

const IconWrapper = styled.div`
    font-size: 3rem;
    margin-bottom: 20px;
`;

const CardTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: var(--color-primary);
    font-weight: 800;
`;

const CardText = styled.p`
    color: #666;
    line-height: 1.6;
    word-break: keep-all;
`;

const Footer = styled.footer`
    background-color: var(--color-primary);
    color: white;
    padding: 40px 5%;
    text-align: center;
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <LogoLink to="/">
          <LogoImg src={logo} alt="TIA Logo" />
        </LogoLink>
        <Nav>
          <NavItem to="/">홈</NavItem>
          <NavItem to="/ministry-request">사역신청</NavItem>
          <NavItem to="/gallery">갤러리</NavItem>
          <NavItem to="/prayer">기도나눔</NavItem>
        </Nav>
      </Header>

      <HeroSection>
        <HeroTitle>
          TAEKWONDO<br />
          IN <span>ACTION</span>
        </HeroTitle>
        <HeroSubtitle>
          태권도를 통해 복음을 전하고 사랑을 실천하는<br />
          우리는 TIA 태권도 선교단입니다.
        </HeroSubtitle>
        <CTAButton to="/ministry-request">사역 신청하기</CTAButton>
      </HeroSection>

      <InfoSection>
        <InfoCard>
          <IconWrapper>🥋</IconWrapper>
          <CardTitle>IDENTITY</CardTitle>
          <CardText>
            태권도 정신과 기독교 신앙을 바탕으로<br />
            세상에 선한 영향력을 끼칩니다.
          </CardText>
        </InfoCard>
        <InfoCard>
          <IconWrapper>🌏</IconWrapper>
          <CardTitle>HISTORY</CardTitle>
          <CardText>
            1994년부터 시작된 우리의 발걸음은<br />
            멈추지 않고 전 세계로 뻗어 나갑니다.
          </CardText>
        </InfoCard>
        <InfoCard>
          <IconWrapper>🔥</IconWrapper>
          <CardTitle>VISION</CardTitle>
          <CardText>
            땅 끝까지 이르러 내 증인이 되리라<br />
            하신 말씀을 삶으로 실천합니다.
          </CardText>
        </InfoCard>
      </InfoSection>

      <Footer>
        <p>&copy; 2024 TIA Taekwondo Mission Team. All Rights Reserved.</p>
      </Footer>
    </Container>
  );
};

export default Home;