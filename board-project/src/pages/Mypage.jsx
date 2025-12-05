import React, { useState } from 'react';
import { Container, Card, Button, Input } from '../components/common'; 
import { useAuthStore } from '../store/authStore';
import { usePerformanceStore } from '../store/performanceStore';

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
      {/* 페이지 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#1f2937', fontWeight: '900' }}>
          👤 마이페이지
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280' }}>
          안녕하세요, <strong style={{ color: '#EA580C', fontSize: '18px' }}>{user?.name}</strong>님!
        </p>
      </div>
      
      {/* 요약 통계 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <Card style={{ 
          // 오렌지 그라데이션 (Main)
          background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
          color: 'white', textAlign: 'center', border: 'none'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>예매 내역</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{myBookings.length}</p>
        </Card>
        
        <Card style={{ 
          // 다크 그레이 그라데이션 (Sub)
          background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)',
          color: 'white', textAlign: 'center', border: 'none'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>작성한 후기</p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{myReviews.length}</p>
        </Card>
        
        <Card style={{ 
          // 골드/옐로우 (Point)
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: 'white', textAlign: 'center', border: 'none'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>총 결제금액</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            {myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}원
          </p>
        </Card>
      </div>
      
      {/* 탭 네비게이션 */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '30px', borderBottom: '2px solid #e5e7eb' }}>
        {[
          { id: 'info', label: '📋 내 정보' },
          { id: 'bookings', label: '🎫 예매 내역' },
          { id: 'reviews', label: '✍️ 작성한 후기' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #EA580C' : '3px solid transparent',
              padding: '15px 25px',
              fontSize: '16px',
              fontWeight: activeTab === tab.id ? '700' : '500',
              color: activeTab === tab.id ? '#EA580C' : '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 내 정보 탭 */}
      {activeTab === 'info' && (
        <Card>
          <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>📋 내 정보 관리</h2>
          
          {isEditing ? (
            <>
              <Input label="이름" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
              <Input label="이메일" type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
              <Input label="전화번호" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Button onClick={handleUpdate}>저장하기</Button>
                <Button onClick={() => setIsEditing(false)} variant="secondary">취소</Button>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: '#f9fafb', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
                {[
                    { label: '이름', value: user?.name },
                    { label: '이메일', value: user?.email },
                    { label: '전화번호', value: user?.phone || '미등록' },
                    { label: '가입일', value: user?.joinDate },
                ].map((item, i) => (
                    <div key={i} style={{ marginBottom: i !== 3 ? '20px' : 0 }}>
                        <p style={{ color: '#6b7280', marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>{item.label}</p>
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>{item.value}</p>
                    </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => setIsEditing(true)}>정보 수정</Button>
                <Button onClick={() => { logout(); setCurrentPage('home'); }} variant="secondary">로그아웃</Button>
                <Button onClick={handleDeleteAccount} variant="danger">회원탈퇴</Button>
              </div>
            </>
          )}
        </Card>
      )}
      
      {/* 예매 내역 탭 */}
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
                    <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
                      {perf && (
                        <img 
                          src={perf.image} 
                          alt={perf.title}
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                           <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{booking.performanceTitle}</h3>
                           <span style={{ background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', height: 'fit-content' }}>
                             {booking.status}
                           </span>
                        </div>
                        <div style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.6' }}>
                           <p>📅 {booking.performanceDate}</p>
                           <p>📍 {booking.performanceLocation}</p>
                           <p>🎫 {booking.ticketCount}매</p>
                        </div>
                        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <p style={{ fontWeight: '800', fontSize: '18px', color: '#EA580C', margin: 0 }}>
                             {booking.totalPrice?.toLocaleString()}원
                           </p>
                           <Button variant="secondary" onClick={() => setCurrentPage(`performance-${booking.performanceId}`)} style={{ padding: '6px 16px', fontSize: '13px' }}>
                             상세보기
                           </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* 작성한 후기 탭 */}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        {perf && (
                          <p style={{ color: '#EA580C', fontWeight: 'bold', fontSize: '15px', marginBottom: '5px' }}>
                            🎬 {perf.title}
                          </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <span style={{ color: '#F59E0B' }}>{'⭐'.repeat(review.rating)}</span>
                           <span style={{ color: '#9ca3af', fontSize: '13px' }}>{review.date}</span>
                        </div>
                      </div>
                      <Button onClick={() => handleDeleteReview(review.id)} variant="danger" style={{ padding: '6px 12px', fontSize: '13px', height: 'fit-content' }}>
                        삭제
                      </Button>
                    </div>
                    <p style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', color: '#374151', lineHeight: '1.6' }}>
                      {review.content}
                    </p>
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