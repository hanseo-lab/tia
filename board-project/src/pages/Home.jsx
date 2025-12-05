import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';
import * as S from '../styles/Home.styled';

export const Home = ({ setCurrentPage }) => {
  const { performances, reviews } = usePerformanceStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % performances.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [performances.length]);
  
  return (
    <Container>
      {/* 슬라이드 배너 */}
      <S.SlideBanner>
        {performances.map((perf, idx) => (
          <S.SlideItem key={perf.id} $active={idx === currentSlide} $bgImage={perf.image}>
            <S.SlideCategory>{perf.category}</S.SlideCategory>
            <S.SlideTitle>{perf.title}</S.SlideTitle>
            <S.SlideInfo>📅 {perf.date} &nbsp;|&nbsp; 📍 {perf.location}</S.SlideInfo>
            <Button onClick={() => setCurrentPage(`performance-${perf.id}`)} style={{ padding: '15px 40px', fontSize: '18px' }}>
              예매하기
            </Button>
          </S.SlideItem>
        ))}
        {/* 슬라이드 인디케이터 */}
        <S.IndicatorContainer>
          {performances.map((_, idx) => (
            <S.Indicator
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              $active={idx === currentSlide}
            />
          ))}
        </S.IndicatorContainer>
      </S.SlideBanner>
      
      {/* 추천 공연 */}
      <S.SectionTitleContainer>
        <S.SectionTitle>추천 공연</S.SectionTitle>
        <S.Divider />
      </S.SectionTitleContainer>

      <S.GridContainer>
        {performances.map((perf) => (
          <Card key={perf.id} onClick={() => setCurrentPage(`performance-${perf.id}`)}>
            <S.PerformanceImageContainer>
              <S.PerformanceImage src={perf.image} alt={perf.title} />
              <S.CategoryBadge>{perf.category}</S.CategoryBadge>
            </S.PerformanceImageContainer>
            <S.PerformanceTitle>{perf.title}</S.PerformanceTitle>
            <S.PerformanceText>📅 {perf.date}</S.PerformanceText>
            <S.PerformanceText>📍 {perf.location}</S.PerformanceText>
            <S.PriceContainer>
              <S.Price>{perf.price.toLocaleString()}원</S.Price>
              <S.DetailLink>자세히 보기 &gt;</S.DetailLink>
            </S.PriceContainer>
          </Card>
        ))}
      </S.GridContainer>
      
      {/* 최신 후기 */}
      <S.ReviewSection>
        <Container>
          <S.ReviewHeader>
            <S.SectionTitle>생생한 관람 후기</S.SectionTitle>
            <Button onClick={() => setCurrentPage('reviews')} variant="secondary">
              전체 후기 보기
            </Button>
          </S.ReviewHeader>
          
          <S.ReviewGrid>
            {reviews.slice(0, 3).map((review) => {
              const perf = performances.find(p => p.id === review.performanceId);
              return (
                <Card key={review.id} style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <S.UserInfo>
                    <S.UserProfile>
                      <S.UserIcon>👤</S.UserIcon>
                      <S.UserName>{review.userName}</S.UserName>
                    </S.UserProfile>
                    <S.StarRating>{'⭐'.repeat(review.rating)}</S.StarRating>
                  </S.UserInfo>
                  <S.ReviewContent>
                    <S.ReviewText>{review.content}</S.ReviewText>
                  </S.ReviewContent>
                  <S.ReviewFooter>@{perf?.title}</S.ReviewFooter>
                </Card>
              );
            })}
          </S.ReviewGrid>
        </Container>
      </S.ReviewSection>
    </Container>
  );
};