import React, { useState } from 'react';
import { Container, Card, Button, Textarea } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';
import { useAuthStore } from '../store/authStore';
import * as S from '../styles/PerfpormanceDetail.styled';

export const PerformanceDetail = ({ performanceId, setCurrentPage }) => {
  const { performances, reviews, addReview, addBooking } = usePerformanceStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  
  const performance = performances.find(p => p.id === parseInt(performanceId));
  const performanceReviews = reviews.filter(r => r.performanceId === parseInt(performanceId));
  
  const averageRating = performanceReviews.length > 0
    ? (performanceReviews.reduce((sum, r) => sum + r.rating, 0) / performanceReviews.length).toFixed(1)
    : 0;
  
  if (!performance) {
    return (
      <Container>
        <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2 style={{ color: '#6b7280', marginBottom: '20px' }}>
            공연 정보를 찾을 수 없습니다.
          </h2>
          <Button onClick={() => setCurrentPage('performances')} variant="secondary">
            목록으로 돌아가기
          </Button>
        </Card>
      </Container>
    );
  }
  
  const handleBooking = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
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
    
    alert(`예매가 완료되었습니다!\n[${performance.title}]\n티켓: ${ticketCount}매\n총 금액: ${totalPrice.toLocaleString()}원`);
    setTicketCount(1);
  };
  
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
    alert('소중한 후기가 등록되었습니다!');
  };
  
  return (
    <Container>
      <Button 
        onClick={() => setCurrentPage('performances')} 
        variant="secondary" 
        style={{ marginBottom: '30px', padding: '8px 16px', fontSize: '14px' }}
      >
        ← 목록으로 돌아가기
      </Button>
      
      <S.TopSection>
        <div>
          <S.PosterImage src={performance.image} alt={performance.title} />
        </div>
        
        <S.InfoSection>
          <S.CategoryTag>{performance.category}</S.CategoryTag>
          <S.Title>{performance.title}</S.Title>
          
          <S.RatingInfo>
            <S.Star>⭐⭐⭐⭐⭐</S.Star>
            <S.RatingScore>{averageRating}</S.RatingScore>
            <S.RatingCount>/ 5.0 ({performanceReviews.length}개의 후기)</S.RatingCount>
          </S.RatingInfo>
          
          <S.Description>{performance.description}</S.Description>
          
          <S.BookingBox>
             <S.DateTimeLoc>
                <p>📅 <strong>일시:</strong> {performance.date}</p>
                <p>📍 <strong>장소:</strong> {performance.location}</p>
             </S.DateTimeLoc>

            <S.Row>
               <S.Label>티켓 가격</S.Label>
               <S.PriceValue>{performance.price.toLocaleString()}원</S.PriceValue>
            </S.Row>
            
            <S.Row $mb="30px">
               <S.Label>수량 선택</S.Label>
               <S.Counter>
                 <S.CounterBtn onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}>-</S.CounterBtn>
                 <S.CountDisplay>{ticketCount}</S.CountDisplay>
                 <S.CounterBtn onClick={() => setTicketCount(ticketCount + 1)}>+</S.CounterBtn>
               </S.Counter>
            </S.Row>

            <S.Divider />

            <S.Row $mb="25px">
               <S.Label $bold>총 결제금액</S.Label>
               <S.TotalPrice>{(performance.price * ticketCount).toLocaleString()}원</S.TotalPrice>
            </S.Row>

            <Button onClick={handleBooking} style={{ width: '100%', padding: '18px', fontSize: '18px' }}>
              예매하기
            </Button>
          </S.BookingBox>
        </S.InfoSection>
      </S.TopSection>
      
      <S.ReviewsSection>
        <S.ReviewsHeader>
          <S.ReviewsTitle>📝 관람 후기 <span>{performanceReviews.length}</span></S.ReviewsTitle>
          {isAuthenticated && (
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              variant={showReviewForm ? "secondary" : "primary"}
            >
              {showReviewForm ? '취소하기' : '후기 작성하기'}
            </Button>
          )}
        </S.ReviewsHeader>
        
        {showReviewForm && (
          <Card style={{ marginBottom: '40px', background: '#fff7ed', border: '1px solid #fed7aa' }}>
            <S.ReviewFormHeader>✍️ 솔직한 후기를 남겨주세요</S.ReviewFormHeader>
            
            <div style={{ marginBottom: '20px' }}>
              <S.Label>평점</S.Label>
              <S.StarSelect>
                {[1, 2, 3, 4, 5].map(star => (
                  <S.SelectStar
                    key={star}
                    onClick={() => setRating(star)}
                    $active={star <= rating}
                  >
                    ⭐
                  </S.SelectStar>
                ))}
              </S.StarSelect>
            </div>
            
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="공연은 어떠셨나요? 다른 관객들을 위해 생생한 감동을 공유해주세요!"
              rows={5}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button onClick={() => setShowReviewForm(false)} variant="secondary">취소</Button>
              <Button onClick={handleReviewSubmit}>등록하기</Button>
            </div>
          </Card>
        )}
        
        <S.ReviewList>
          {performanceReviews.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '60px 0', background: '#f9fafb', border: 'none' }}>
              <S.EmptyReviews>
                아직 작성된 후기가 없습니다.<br/>
                첫 번째 후기의 주인공이 되어주세요! ✨
              </S.EmptyReviews>
            </Card>
          ) : (
            performanceReviews.map((review) => (
              <Card key={review.id}>
                <S.ReviewItemHeader>
                  <S.ReviewerInfo>
                    <S.Avatar>👤</S.Avatar>
                    <div>
                      <S.ReviewerName>{review.userName}</S.ReviewerName>
                      <div style={{ color: '#F59E0B', fontSize: '14px' }}>{'⭐'.repeat(review.rating)}</div>
                    </div>
                  </S.ReviewerInfo>
                  <S.ReviewDate>{review.date}</S.ReviewDate>
                </S.ReviewItemHeader>
                <S.ReviewText>{review.content}</S.ReviewText>
              </Card>
            ))
          )}
        </S.ReviewList>
      </S.ReviewsSection>
    </Container>
  );
};