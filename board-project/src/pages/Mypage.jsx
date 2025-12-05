import React, { useState } from 'react';
import { Container, Card, Button, Input } from '../components/common'; 
import { useAuthStore } from '../store/authStore';
import { usePerformanceStore } from '../store/performanceStore';
import * as S from '../styles/Mypage.styled';

export const MyPage = ({ setCurrentPage }) => {
  const { user, updateUser, logout } = useAuthStore();
  const { bookings, reviews, performances, deleteReview } = usePerformanceStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [activeTab, setActiveTab] = useState('info'); 
  
  const myBookings = bookings.filter(b => b.userId === user?.id);
  const myReviews = reviews.filter(r => r.userId === user?.id);
  
  const handleUpdate = () => {
    if (!editData.name.trim()) return alert('이름을 입력해주세요.');
    if (!editData.email.trim()) return alert('이메일을 입력해주세요.');
    updateUser({ ...user, ...editData });
    setIsEditing(false);
    alert('정보가 수정되었습니다.');
  };
  
  const handleDeleteReview = (reviewId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteReview(reviewId);
      alert('후기가 삭제되었습니다.');
    }
  };
  
  const handleDeleteAccount = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      logout();
      alert('회원탈퇴가 완료되었습니다.');
      setCurrentPage('home');
    }
  };
  
  return (
    <Container>
      <S.Header>
        <h1>👤 마이페이지</h1>
        <p>안녕하세요, <strong style={{ color: '#EA580C', fontSize: '18px' }}>{user?.name}</strong>님!</p>
      </S.Header>
      
      <S.StatGrid>
        <Card style={{ background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)', color: 'white', textAlign: 'center', border: 'none' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>예매 내역</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{myBookings.length}</p>
        </Card>
        
        <Card style={{ background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)', color: 'white', textAlign: 'center', border: 'none' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>작성한 후기</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{myReviews.length}</p>
        </Card>
        
        <Card style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: 'white', textAlign: 'center', border: 'none' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>총 결제금액</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            {myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}원
          </p>
        </Card>
      </S.StatGrid>
      
      <S.TabContainer>
        {[
          { id: 'info', label: '📋 내 정보' },
          { id: 'bookings', label: '🎫 예매 내역' },
          { id: 'reviews', label: '✍️ 작성한 후기' }
        ].map(tab => (
          <S.TabButton
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            $active={activeTab === tab.id}
          >
            {tab.label}
          </S.TabButton>
        ))}
      </S.TabContainer>
      
      {activeTab === 'info' && (
        <Card>
          <S.SectionTitle>📋 내 정보 관리</S.SectionTitle>
          
          {isEditing ? (
            <>
              <Input label="이름" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
              <Input label="이메일" type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
              <Input label="전화번호" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
              <S.ButtonGroup $mt="20px">
                <Button onClick={handleUpdate}>저장하기</Button>
                <Button onClick={() => setIsEditing(false)} variant="secondary">취소</Button>
              </S.ButtonGroup>
            </>
          ) : (
            <>
              <S.InfoDisplay>
                {[
                    { label: '이름', value: user?.name },
                    { label: '이메일', value: user?.email },
                    { label: '전화번호', value: user?.phone || '미등록' },
                    { label: '가입일', value: user?.joinDate },
                ].map((item, i, arr) => (
                    <S.InfoItem key={i} $last={i === arr.length - 1}>
                        <p>{item.label}</p>
                        <p>{item.value}</p>
                    </S.InfoItem>
                ))}
              </S.InfoDisplay>
              <S.ButtonGroup>
                <Button onClick={() => setIsEditing(true)}>정보 수정</Button>
                <Button onClick={() => { logout(); setCurrentPage('home'); }} variant="secondary">로그아웃</Button>
                <Button onClick={handleDeleteAccount} variant="danger">회원탈퇴</Button>
              </S.ButtonGroup>
            </>
          )}
        </Card>
      )}
      
      {activeTab === 'bookings' && (
        <div>
           {myBookings.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#9ca3af', marginBottom: '20px' }}>예매 내역이 없습니다.</p>
              <Button onClick={() => setCurrentPage('performances')}>공연 보러가기</Button>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {myBookings.map((booking) => {
                const perf = performances.find(p => p.id === booking.performanceId);
                return (
                  <Card key={booking.id}>
                    <S.BookingItem>
                      {perf && <S.BookingImg src={perf.image} alt={perf.title} />}
                      <S.BookingContent>
                        <S.BookingHeader>
                           <h3>{booking.performanceTitle}</h3>
                           <S.StatusBadge>{booking.status}</S.StatusBadge>
                        </S.BookingHeader>
                        <S.BookingDetails>
                           <p>📅 {booking.performanceDate}</p>
                           <p>📍 {booking.performanceLocation}</p>
                           <p>🎫 {booking.ticketCount}매</p>
                        </S.BookingDetails>
                        <S.BookingFooter>
                           <p>{booking.totalPrice?.toLocaleString()}원</p>
                           <Button variant="secondary" onClick={() => setCurrentPage(`performance-${booking.performanceId}`)} style={{ padding: '6px 16px', fontSize: '13px' }}>
                             상세보기
                           </Button>
                        </S.BookingFooter>
                      </S.BookingContent>
                    </S.BookingItem>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'reviews' && (
        <div>
           {myReviews.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#9ca3af', marginBottom: '20px' }}>작성한 후기가 없습니다.</p>
              <Button onClick={() => setCurrentPage('performances')}>공연 보러가기</Button>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {myReviews.map((review) => {
                const perf = performances.find(p => p.id === review.performanceId);
                return (
                  <Card key={review.id}>
                    <S.ReviewHeader>
                      <div>
                        {perf && (
                          <p style={{ color: '#EA580C', fontWeight: 'bold', fontSize: '15px', marginBottom: '5px' }}>
                            🎬 {perf.title}
                          </p>
                        )}
                        <S.ReviewMeta>
                           <span style={{ color: '#F59E0B' }}>{'⭐'.repeat(review.rating)}</span>
                           <span style={{ color: '#9ca3af', fontSize: '13px' }}>{review.date}</span>
                        </S.ReviewMeta>
                      </div>
                      <Button onClick={() => handleDeleteReview(review.id)} variant="danger" style={{ padding: '6px 12px', fontSize: '13px', height: 'fit-content' }}>
                        삭제
                      </Button>
                    </S.ReviewHeader>
                    <S.ReviewContent>{review.content}</S.ReviewContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};