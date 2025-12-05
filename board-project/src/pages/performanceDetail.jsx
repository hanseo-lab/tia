// pages/PerformanceDetailPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button, Textarea } from '../components/StyledComponents';
import { usePerformanceStore } from '../store/performanceStore';
import { useAuthStore } from '../store/authStore';

export const PerformanceDetailPage = ({ performanceId, setCurrentPage }) => {
  const { performances, reviews, addReview, addBooking } = usePerformanceStore();
  const { isAuthenticated, user } = useAuthStore();
  
  // 후기 작성 상태
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  
  // 공연 및 후기 데이터
  const performance = performances.find(p => p.id === parseInt(performanceId));
  const performanceReviews = reviews.filter(r => r.performanceId === parseInt(performanceId));
  
  // 평균 평점 계산
  const averageRating = performanceReviews.length > 0
    ? (performanceReviews.reduce((sum, r) => sum + r.rating, 0) / performanceReviews.length).toFixed(1)
    : 0;
  
  // 공연이 없을 경우
  if (!performance) {
    return (
      <Container>
        <Card>
          <h2 style={{ textAlign: 'center', color: '#6b7280' }}>
            공연을 찾을 수 없습니다.
          </h2>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button onClick={() => setCurrentPage('performances')}>
              공연 목록으로 돌아가기
            </Button>
          </div>
        </Card>
      </Container>
    );
  }
  
  // 예매하기 핸들러
  const handleBooking = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      setCurrentPage('login');
      return;
    }
    
    const totalPrice = performance.price * ticketCount;
    
    addBooking({
      performanceId: performance.id,
      performanceTitle: performance.title,
      performanceDate: performance.date,
      performanceLocation: performance.location,
      userId: user.id,
      userName: user.name,
      ticketCount: ticketCount,
      totalPrice: totalPrice,
      status: '예매완료'
    });
    
    alert(`예매가 완료되었습니다!\n티켓 수: ${ticketCount}매\n총 금액: ${totalPrice.toLocaleString()}원`);
    setTicketCount(1);
  };
  
  // 후기 작성 핸들러
  const handleReviewSubmit = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      setCurrentPage('login');
      return;
    }
    
    if (!reviewContent.trim()) {
      alert('후기 내용을 입력해주세요.');
      return;
    }
    
    addReview({
      performanceId: performance.id,
      userId: user.id,
      userName: user.name,
      rating,
      content: reviewContent,
      date: new Date().toLocaleDateString('ko-KR')
    });
    
    setReviewContent('');
    setRating(5);
    setShowReviewForm(false);
    alert('후기가 등록되었습니다!');
  };
  
  return (
    <Container>
      {/* 뒤로가기 버튼 */}
      <Button 
        onClick={() => setCurrentPage('performances')} 
        variant="secondary" 
        style={{ marginBottom: '30px' }}
      >
        ← 목록으로
      </Button>
      
      {/* 공연 상세 정보 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px', 
        marginBottom: '60px',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        {/* 왼쪽: 이미지 */}
        <div>
          <img 
            src={performance.image} 
            alt={performance.title} 
            style={{ 
              width: '100%', 
              height: '500px', 
              objectFit: 'cover', 
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }} 
          />
        </div>
        
        {/* 오른쪽: 정보 */}
        <div>
          {/* 카테고리 */}
          <span style={{ 
            display: 'inline-block', 
            background: '#667eea', 
            color: 'white', 
            padding: '8px 18px', 
            borderRadius: '20px', 
            fontSize: '14px', 
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            {performance.category}
          </span>
          
          {/* 제목 */}
          <h1 style={{ 
            fontSize: '40px', 
            margin: '0 0 20px 0', 
            color: '#1f2937',
            fontWeight: 'bold',
            lineHeight: '1.2'
          }}>
            {performance.title}
          </h1>
          
          {/* 평점 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '25px'
          }}>
            <span style={{ fontSize: '24px' }}>
              {'⭐'.repeat(Math.round(averageRating))}
            </span>
            <span style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              color: '#f59e0b'
            }}>
              {averageRating}
            </span>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>
              ({performanceReviews.length}개의 후기)
            </span>
          </div>
          
          {/* 설명 */}
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            lineHeight: '1.8', 
            marginBottom: '30px'
          }}>
            {performance.description}
          </p>
          
          {/* 공연 정보 박스 */}
          <div style={{ 
            background: '#f9fafb', 
            padding: '25px', 
            borderRadius: '12px', 
            marginBottom: '30px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              color: '#374151',
              fontWeight: '700'
            }}>
              📋 공연 정보
            </h3>
            <p style={{ margin: '12px 0', fontSize: '16px', color: '#4b5563' }}>
              <strong>📅 공연일시:</strong> {performance.date}
            </p>
            <p style={{ margin: '12px 0', fontSize: '16px', color: '#4b5563' }}>
              <strong>📍 장소:</strong> {performance.location}
            </p>
            <p style={{ 
              margin: '15px 0 0 0', 
              fontSize: '28px', 
              color: '#667eea',
              fontWeight: 'bold'
            }}>
              💰 {performance.price.toLocaleString()}원
            </p>
          </div>
          
          {/* 예매 섹션 */}
          <div style={{ 
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #667eea',
            marginBottom: '20px'
          }}>
            <label style={{ 
              display: 'block',
              marginBottom: '15px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              티켓 수량
            </label>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '20px'
            }}>
              <button
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '2px solid #667eea',
                  background: 'white',
                  color: '#667eea',
                  fontSize: '20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                -
              </button>
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                {ticketCount}
              </span>
              <button
                onClick={() => setTicketCount(ticketCount + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '2px solid #667eea',
                  background: 'white',
                  color: '#667eea',
                  fontSize: '20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                +
              </button>
            </div>
            <div style={{ 
              marginBottom: '20px',
              padding: '15px',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                margin: '5px 0'
              }}>
                총 금액
              </p>
              <p style={{ 
                fontSize: '28px', 
                fontWeight: 'bold',
                color: '#667eea',
                margin: '5px 0'
              }}>
                {(performance.price * ticketCount).toLocaleString()}원
              </p>
            </div>
            <Button 
              onClick={handleBooking} 
              style={{ 
                width: '100%', 
                fontSize: '18px', 
                padding: '16px',
                fontWeight: 'bold'
              }}
            >
              🎫 예매하기
            </Button>
          </div>
        </div>
      </div>
      
      {/* 후기 섹션 */}
      <div style={{ 
        borderTop: '2px solid #e5e7eb',
        paddingTop: '50px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px'
        }}>
          <h2 style={{ 
            fontSize: '32px', 
            color: '#1f2937',
            fontWeight: 'bold'
          }}>
            📝 공연 후기 ({performanceReviews.length})
          </h2>
          {isAuthenticated && (
            <Button onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? '취소' : '후기 작성하기'}
            </Button>
          )}
        </div>
        
        {/* 후기 작성 폼 */}
        {showReviewForm && (
          <Card style={{ marginBottom: '30px', background: '#f9fafb' }}>
            <h3 style={{ marginBottom: '25px', fontSize: '20px' }}>
              ✍️ 후기 작성
            </h3>
            
            {/* 별점 선택 */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '600',
                fontSize: '16px'
              }}>
                평점을 선택해주세요
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ 
                      fontSize: '40px', 
                      cursor: 'pointer', 
                      color: star <= rating ? '#f59e0b' : '#d1d5db',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            
            {/* 후기 내용 */}
            <Textarea
              label="후기 내용"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="공연에 대한 솔직한 후기를 작성해주세요. 다른 분들에게 큰 도움이 됩니다!"
              rows={6}
            />
            
            {/* 버튼 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={handleReviewSubmit}>등록하기</Button>
              <Button 
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewContent('');
                  setRating(5);
                }} 
                variant="secondary"
              >
                취소
              </Button>
            </div>
          </Card>
        )}
        
        {/* 후기 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {performanceReviews.length === 0 ? (
            <Card>
              <p style={{ 
                textAlign: 'center', 
                color: '#9ca3af', 
                padding: '60px 0',
                fontSize: '16px'
              }}>
                아직 작성된 후기가 없습니다.<br/>
                첫 번째 후기를 작성해보세요! ✨
              </p>
            </Card>
          ) : (
            performanceReviews.map((review) => (
              <Card key={review.id}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '15px',
                  alignItems: 'center'
                }}>
                  <div>
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
                  <span style={{ 
                    color: '#9ca3af',
                    fontSize: '14px'
                  }}>
                    {review.date}
                  </span>
                </div>
                <p style={{ 
                  color: '#4b5563', 
                  lineHeight: '1.8', 
                  fontSize: '16px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {review.content}
                </p>
              </Card>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};