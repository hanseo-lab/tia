import React, { useState } from 'react';
import { Container, Card, Button } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';
import * as S from '../styles/ReviewsPage.styled';

export const ReviewsPage = ({ setCurrentPage }) => {
  const { performances, reviews } = usePerformanceStore();
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(filterRating));
  
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
  
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };
  
  return (
    <Container>
      <S.PageHeader>
        <h1>📝 전체 공연 후기</h1>
        <p>관람하신 공연에 대한 생생한 후기를 만나보세요</p>
      </S.PageHeader>
      
      <S.StatGrid>
        <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>총 후기 수</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{reviews.length}</p>
        </Card>
        
        <Card style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>평균 평점</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>⭐ {averageRating}</p>
        </Card>
        
        <Card style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>5점 만점 후기</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{ratingCounts[5]}</p>
        </Card>
      </S.StatGrid>
      
      <Card style={{ marginBottom: '30px' }}>
        <S.FilterContainer>
          <div>
            <S.FilterLabel>⭐ 평점 필터</S.FilterLabel>
            <S.ButtonGroup>
              <Button
                onClick={() => setFilterRating('all')}
                variant={filterRating === 'all' ? 'primary' : 'secondary'}
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                전체 ({reviews.length})
              </Button>
              {[5, 4, 3, 2, 1].map(rating => (
                <Button
                  key={rating}
                  onClick={() => setFilterRating(rating.toString())}
                  variant={filterRating === rating.toString() ? 'primary' : 'secondary'}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  {rating}⭐ ({ratingCounts[rating]})
                </Button>
              ))}
            </S.ButtonGroup>
          </div>
          
          <div>
            <S.FilterLabel>🔽 정렬</S.FilterLabel>
            <S.ButtonGroup>
              <Button
                onClick={() => setSortBy('recent')}
                variant={sortBy === 'recent' ? 'primary' : 'secondary'}
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                최신순
              </Button>
              <Button
                onClick={() => setSortBy('rating')}
                variant={sortBy === 'rating' ? 'primary' : 'secondary'}
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                평점 높은순
              </Button>
            </S.ButtonGroup>
          </div>
        </S.FilterContainer>
      </Card>
      
      <S.ReviewCount>
        총 <strong>{sortedReviews.length}개</strong>의 후기
      </S.ReviewCount>
      
      <S.ReviewList>
        {sortedReviews.length === 0 ? (
          <Card>
            <S.EmptyState>해당 조건의 후기가 없습니다.</S.EmptyState>
          </Card>
        ) : (
          sortedReviews.map((review) => {
            const perf = performances.find(p => p.id === review.performanceId);
            return (
              <Card 
                key={review.id} 
                onClick={() => setCurrentPage && setCurrentPage(`performance-${review.performanceId}`)}
                style={{ cursor: 'pointer' }}
              >
                <S.ReviewItemContent>
                  {perf && <S.ThumbImage src={perf.image} alt={perf.title} />}
                  
                  <S.ReviewTextSection>
                    <S.ReviewHeader>
                      <div style={{ flex: 1 }}>
                        <S.UserInfo>
                          <S.UserName>{review.userName}</S.UserName>
                          <S.Rating>{'⭐'.repeat(review.rating)}</S.Rating>
                        </S.UserInfo>
                        
                        {perf && (
                          <S.PerfLink>
                            <span>🎭</span><span>{perf.title}</span>
                          </S.PerfLink>
                        )}
                      </div>
                      <S.DateText>{review.date}</S.DateText>
                    </S.ReviewHeader>
                    
                    <S.Content>{review.content}</S.Content>
                    
                    {perf && (
                      <S.MetaTags>
                        <span>📅 {perf.date}</span>
                        <span>📍 {perf.location}</span>
                        <S.CategoryTag>{perf.category}</S.CategoryTag>
                      </S.MetaTags>
                    )}
                  </S.ReviewTextSection>
                </S.ReviewItemContent>
              </Card>
            );
          })
        )}
      </S.ReviewList>
      
      {reviews.length > 0 && (
        <Card style={{ marginTop: '40px', background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
          <S.CTASection>
            <h3>✍️ 공연을 관람하셨나요?</h3>
            <p>다른 관객들과 소중한 경험을 나눠주세요!</p>
            <Button onClick={() => setCurrentPage && setCurrentPage('performances')}>
              공연 보러가기
            </Button>
          </S.CTASection>
        </Card>
      )}
    </Container>
  );
};