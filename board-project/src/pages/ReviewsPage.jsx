// pages/ReviewsPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button } from '../components/StyledComponents';
import { usePerformanceStore } from '../store/performanceStore';

export const ReviewsPage = ({ setCurrentPage }) => {
  const { performances, reviews } = usePerformanceStore();
  const [filterRating, setFilterRating] = useState('all'); // all, 5, 4, 3, 2, 1
  const [sortBy, setSortBy] = useState('recent'); // recent, rating
  
  // 필터링
  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(filterRating));
  
  // 정렬
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  // 평균 평점 계산
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  
  // 평점별 개수
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };
  
  return (
    <Container>
      {/* 페이지 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          marginBottom: '10px', 
          color: '#1f2937',
          fontWeight: 'bold'
        }}>
          📝 전체 공연 후기
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          관람하신 공연에 대한 생생한 후기를 만나보세요
        </p>
      </div>
      
      {/* 통계 카드 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {/* 총 후기 수 */}
        <Card style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>
            총 후기 수
          </p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            {reviews.length}
          </p>
        </Card>
        
        {/* 평균 평점 */}
        <Card style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>
            평균 평점
          </p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            ⭐ {averageRating}
          </p>
        </Card>
        
        {/* 5점 후기 */}
        <Card style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>
            5점 만점 후기
          </p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            {ratingCounts[5]}
          </p>
        </Card>
      </div>
      
      {/* 필터 & 정렬 */}
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          {/* 평점 필터 */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '15px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              ⭐ 평점 필터
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
            </div>
          </div>
          
          {/* 정렬 */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '15px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              🔽 정렬
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
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
            </div>
          </div>
        </div>
      </Card>
      
      {/* 후기 개수 */}
      <div style={{ 
        marginBottom: '20px',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        총 <strong style={{ color: '#667eea' }}>{sortedReviews.length}개</strong>의 후기
      </div>
      
      {/* 후기 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sortedReviews.length === 0 ? (
          <Card>
            <p style={{ 
              textAlign: 'center', 
              color: '#9ca3af', 
              padding: '60px 0',
              fontSize: '16px'
            }}>
              해당 조건의 후기가 없습니다.
            </p>
          </Card>
        ) : (
          sortedReviews.map((review) => {
            const perf = performances.find(p => p.id === review.performanceId);
            return (
              <Card key={review.id} style={{ 
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentPage && setCurrentPage(`performance-${review.performanceId}`)}
              >
                <div style={{ display: 'flex', gap: '20px' }}>
                  {/* 공연 썸네일 */}
                  {perf && (
                    <div style={{ flexShrink: 0 }}>
                      <img 
                        src={perf.image} 
                        alt={perf.title} 
                        style={{ 
                          width: '150px', 
                          height: '150px', 
                          objectFit: 'cover', 
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }} 
                      />
                    </div>
                  )}
                  
                  {/* 후기 내용 */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* 헤더 */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ flex: 1 }}>
                        {/* 작성자 & 평점 */}
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ 
                            fontWeight: 'bold', 
                            marginRight: '12px', 
                            fontSize: '18px',
                            color: '#1f2937'
                          }}>
                            {review.userName}
                          </span>
                          <span style={{ 
                            color: '#f59e0b', 
                            fontSize: '20px'
                          }}>
                            {'⭐'.repeat(review.rating)}
                          </span>
                        </div>
                        
                        {/* 공연 제목 */}
                        {perf && (
                          <p style={{ 
                            fontSize: '15px', 
                            color: '#667eea', 
                            marginBottom: '0', 
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span>🎭</span>
                            <span>{perf.title}</span>
                          </p>
                        )}
                      </div>
                      
                      {/* 날짜 */}
                      <span style={{ 
                        color: '#9ca3af',
                        fontSize: '14px',
                        flexShrink: 0,
                        marginLeft: '15px'
                      }}>
                        {review.date}
                      </span>
                    </div>
                    
                    {/* 후기 본문 */}
                    <p style={{ 
                      color: '#4b5563', 
                      lineHeight: '1.8', 
                      fontSize: '16px',
                      margin: '15px 0 0 0',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {review.content}
                    </p>
                    
                    {/* 공연 정보 태그 */}
                    {perf && (
                      <div style={{ 
                        marginTop: '15px',
                        paddingTop: '15px',
                        borderTop: '1px solid #e5e7eb',
                        display: 'flex',
                        gap: '15px',
                        fontSize: '13px',
                        color: '#6b7280'
                      }}>
                        <span>📅 {perf.date}</span>
                        <span>📍 {perf.location}</span>
                        <span style={{ 
                          background: '#f3f4f6',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          color: '#667eea',
                          fontWeight: '600'
                        }}>
                          {perf.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
      
      {/* 후기 작성 유도 */}
      {reviews.length > 0 && (
        <Card style={{ 
          marginTop: '40px',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          textAlign: 'center',
          padding: '40px'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            marginBottom: '15px',
            color: '#1f2937'
          }}>
            ✍️ 공연을 관람하셨나요?
          </h3>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '25px',
            fontSize: '16px'
          }}>
            다른 관객들과 소중한 경험을 나눠주세요!
          </p>
          <Button onClick={() => setCurrentPage && setCurrentPage('performances')}>
            공연 보러가기
          </Button>
        </Card>
      )}
    </Container>
  );
};