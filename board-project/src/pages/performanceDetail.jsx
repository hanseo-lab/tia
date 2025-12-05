import React, { useState } from 'react';
import { Container, Card, Button, Textarea } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';
import { useAuthStore } from '../store/authStore';

export const PerformanceDetail = ({ performanceId, setCurrentPage }) => {
  const { performances, reviews, addReview, addBooking } = usePerformanceStore();
  const { isAuthenticated, user } = useAuthStore();
  
  // 상태 관리
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  
  // 데이터 찾기
  const performance = performances.find(p => p.id === parseInt(performanceId));
  const performanceReviews = reviews.filter(r => r.performanceId === parseInt(performanceId));
  
  // 평균 평점
  const averageRating = performanceReviews.length > 0
    ? (performanceReviews.reduce((sum, r) => sum + r.rating, 0) / performanceReviews.length).toFixed(1)
    : 0;
  
  // 예외 처리
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
  
  // 핸들러: 예매
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
  
  // 핸들러: 후기 작성
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
      {/* 뒤로가기 버튼 */}
      <Button 
        onClick={() => setCurrentPage('performances')} 
        variant="secondary" 
        style={{ marginBottom: '30px', padding: '8px 16px', fontSize: '14px' }}
      >
        ← 목록으로 돌아가기
      </Button>
      
      {/* 상단: 공연 상세 정보 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '50px', 
        marginBottom: '80px' 
      }}>
        {/* 왼쪽: 포스터 이미지 */}
        <div>
          <img 
            src={performance.image} 
            alt={performance.title} 
            style={{ 
              width: '100%', 
              height: '500px', 
              objectFit: 'cover', 
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }} 
          />
        </div>
        
        {/* 오른쪽: 텍스트 정보 */}
        <div>
          {/* 카테고리 배지 */}
          <span style={{ 
            display: 'inline-block', 
            background: '#fff7ed', // 연한 오렌지 배경
            color: '#EA580C',      // 진한 오렌지 글씨
            padding: '8px 16px', 
            borderRadius: '30px', 
            fontSize: '14px', 
            marginBottom: '20px',
            fontWeight: '700',
            border: '1px solid #ffedd5'
          }}>
            {performance.category}
          </span>
          
          {/* 타이틀 */}
          <h1 style={{ 
            fontSize: '42px', 
            margin: '0 0 20px 0', 
            color: '#111827', 
            fontWeight: '900', 
            lineHeight: '1.2' 
          }}>
            {performance.title}
          </h1>
          
          {/* 평점 정보 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '30px',
            paddingBottom: '30px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <span style={{ fontSize: '24px', color: '#F59E0B' }}>⭐⭐⭐⭐⭐</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
              {averageRating}
            </span>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>
              / 5.0 ({performanceReviews.length}개의 후기)
            </span>
          </div>
          
          {/* 설명 */}
          <p style={{ 
            fontSize: '18px', 
            color: '#4b5563', 
            lineHeight: '1.8', 
            marginBottom: '40px' 
          }}>
            {performance.description}
          </p>
          
          {/* 예매 컨트롤 박스 */}
          <div style={{ 
            background: '#f9fafb', 
            padding: '30px', 
            borderRadius: '16px', 
            border: '1px solid #e5e7eb'
          }}>
             {/* 일시 및 장소 */}
             <div style={{ marginBottom: '20px', fontSize: '16px', color: '#4b5563' }}>
                <p style={{ marginBottom: '8px' }}>📅 <strong>일시:</strong> {performance.date}</p>
                <p>📍 <strong>장소:</strong> {performance.location}</p>
             </div>

            {/* 가격 정보 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '20px',
              alignItems: 'center'
            }}>
               <span style={{ color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>티켓 가격</span>
               <span style={{ fontSize: '24px', fontWeight: '800', color: '#1f2937' }}>
                 {performance.price.toLocaleString()}원
               </span>
            </div>
            
            {/* 수량 선택 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '30px' 
            }}>
               <span style={{ color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>수량 선택</span>
               <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '15px', 
                 background: 'white', 
                 padding: '5px', 
                 borderRadius: '8px', 
                 border: '1px solid #e5e7eb' 
               }}>
                 <button 
                   onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} 
                   style={{ width: '32px', height: '32px', border: 'none', background: '#f3f4f6', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#374151' }}
                 >
                   -
                 </button>
                 <span style={{ fontSize: '18px', fontWeight: 'bold', width: '30px', textAlign: 'center', color: '#1f2937' }}>
                   {ticketCount}
                 </span>
                 <button 
                   onClick={() => setTicketCount(ticketCount + 1)} 
                   style={{ width: '32px', height: '32px', border: 'none', background: '#f3f4f6', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#374151' }}
                 >
                   +
                 </button>
               </div>
            </div>

            {/* 구분선 */}
            <div style={{ borderTop: '2px dashed #d1d5db', margin: '20px 0' }}></div>

            {/* 총 결제금액 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '25px' 
            }}>
               <span style={{ color: '#1f2937', fontWeight: 'bold', fontSize: '18px' }}>총 결제금액</span>
               <span style={{ fontSize: '32px', fontWeight: '900', color: '#EA580C' }}>
                 {(performance.price * ticketCount).toLocaleString()}원
               </span>
            </div>

            {/* 예매 버튼 */}
            <Button 
              onClick={handleBooking} 
              style={{ width: '100%', padding: '18px', fontSize: '18px' }}
            >
              예매하기
            </Button>
          </div>
        </div>
      </div>
      
      {/* 하단: 후기 섹션 */}
      <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '60px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          <h2 style={{ fontSize: '32px', color: '#1f2937', fontWeight: '900' }}>
            📝 관람 후기 <span style={{ color: '#EA580C' }}>{performanceReviews.length}</span>
          </h2>
          {isAuthenticated && (
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              variant={showReviewForm ? "secondary" : "primary"}
            >
              {showReviewForm ? '취소하기' : '후기 작성하기'}
            </Button>
          )}
        </div>
        
        {/* 후기 작성 폼 */}
        {showReviewForm && (
          <Card style={{ marginBottom: '40px', background: '#fff7ed', border: '1px solid #fed7aa' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#9a3412' }}>
              ✍️ 솔직한 후기를 남겨주세요
            </h3>
            
            {/* 별점 선택 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#374151' }}>
                평점
              </label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ 
                      fontSize: '36px', 
                      cursor: 'pointer', 
                      color: star <= rating ? '#F59E0B' : '#d1d5db',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            
            {/* 내용 입력 */}
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
        
        {/* 후기 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {performanceReviews.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '60px 0', background: '#f9fafb', border: 'none' }}>
              <p style={{ color: '#9ca3af', fontSize: '16px' }}>
                아직 작성된 후기가 없습니다.<br/>
                첫 번째 후기의 주인공이 되어주세요! ✨
              </p>
            </Card>
          ) : (
            performanceReviews.map((review) => (
              <Card key={review.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: '#f3f4f6', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      👤
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{review.userName}</div>
                      <div style={{ color: '#F59E0B', fontSize: '14px' }}>{'⭐'.repeat(review.rating)}</div>
                    </div>
                  </div>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>{review.date}</span>
                </div>
                <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
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