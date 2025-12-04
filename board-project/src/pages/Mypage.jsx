// pages/MyPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button, Input } from '../components/StyledComponents';
import { useAuthStore } from '../store/authStore';
import { usePerformanceStore } from '../store/performanceStore';

export const MyPage = ({ setCurrentPage }) => {
  const { user, updateUser, logout } = useAuthStore();
  const { bookings, reviews, performances, deleteReview } = usePerformanceStore();
  
  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [activeTab, setActiveTab] = useState('info'); // info, bookings, reviews
  
  // 내 데이터
  const myBookings = bookings.filter(b => b.userId === user?.id);
  const myReviews = reviews.filter(r => r.userId === user?.id);
  
  // 정보 수정 핸들러
  const handleUpdate = () => {
    if (!editData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!editData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    
    updateUser({ ...user, ...editData });
    setIsEditing(false);
    alert('정보가 수정되었습니다.');
  };
  
  // 후기 삭제 핸들러
  const handleDeleteReview = (reviewId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteReview(reviewId);
      alert('후기가 삭제되었습니다.');
    }
  };
  
  // 회원탈퇴 핸들러
  const handleDeleteAccount = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?\n모든 데이터가 삭제됩니다.')) {
      logout();
      alert('회원탈퇴가 완료되었습니다.');
      setCurrentPage('home');
    }
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
          👤 마이페이지
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          안녕하세요, <strong style={{ color: '#667eea' }}>{user?.name}</strong>님!
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>
            예매 내역
          </p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            {myBookings.length}
          </p>
        </Card>
        
        <Card style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>
            작성한 후기
          </p>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            {myReviews.length}
          </p>
        </Card>
        
        <Card style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>
            총 결제금액
          </p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            {myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}원
          </p>
        </Card>
      </div>
      
      {/* 탭 네비게이션 */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px', 
        borderBottom: '2px solid #e5e7eb',
        overflow: 'auto'
      }}>
        {[
          { id: 'info', label: '📋 내 정보', icon: '📋' },
          { id: 'bookings', label: '🎫 예매 내역', icon: '🎫' },
          { id: 'reviews', label: '✍️ 작성한 후기', icon: '✍️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
              padding: '15px 25px',
              fontSize: '16px',
              fontWeight: '600',
              color: activeTab === tab.id ? '#667eea' : '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 내 정보 탭 */}
      {activeTab === 'info' && (
        <Card>
          <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
            📋 내 정보 관리
          </h2>
          
          {isEditing ? (
            // 수정 모드
            <>
              <Input
                label="이름"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="이름을 입력하세요"
              />
              <Input
                label="이메일"
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="이메일을 입력하세요"
              />
              <Input
                label="전화번호 (선택)"
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                placeholder="010-0000-0000"
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button onClick={handleUpdate}>저장하기</Button>
                <Button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({ 
                      name: user?.name || '', 
                      email: user?.email || '',
                      phone: user?.phone || ''
                    });
                  }} 
                  variant="secondary"
                >
                  취소
                </Button>
              </div>
            </>
          ) : (
            // 조회 모드
            <>
              <div style={{ 
                background: '#f9fafb',
                padding: '25px',
                borderRadius: '12px',
                marginBottom: '25px'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    이름
                  </p>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {user?.name}
                  </p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    이메일
                  </p>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {user?.email}
                  </p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    전화번호
                  </p>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {user?.phone || '미등록'}
                  </p>
                </div>
                
                <div>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    가입일
                  </p>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {user?.joinDate}
                  </p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <Button onClick={() => setIsEditing(true)}>
                  정보 수정하기
                </Button>
                <Button 
                  onClick={() => {
                    logout();
                    setCurrentPage('home');
                  }} 
                  variant="secondary"
                >
                  로그아웃
                </Button>
                <Button 
                  onClick={handleDeleteAccount} 
                  variant="danger"
                >
                  회원탈퇴
                </Button>
              </div>
            </>
          )}
        </Card>
      )}
      
      {/* 예매 내역 탭 */}
      {activeTab === 'bookings' && (
        <div>
          <h2 style={{ marginBottom: '25px', fontSize: '24px', fontWeight: 'bold' }}>
            🎫 나의 예매 내역
          </h2>
          
          {myBookings.length === 0 ? (
            <Card>
              <p style={{ 
                textAlign: 'center', 
                color: '#9ca3af', 
                padding: '60px 0',
                fontSize: '16px'
              }}>
                예매 내역이 없습니다.<br/>
                멋진 공연을 예매해보세요! 🎭
              </p>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button onClick={() => setCurrentPage('performances')}>
                  공연 둘러보기
                </Button>
              </div>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {myBookings.map((booking) => {
                const perf = performances.find(p => p.id === booking.performanceId);
                return (
                  <Card key={booking.id}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      {/* 공연 이미지 */}
                      {perf && (
                        <img 
                          src={perf.image} 
                          alt={perf.title}
                          style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            flexShrink: 0
                          }}
                        />
                      )}
                      
                      {/* 예매 정보 */}
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '15px'
                        }}>
                          <div>
                            <h3 style={{ 
                              fontSize: '20px', 
                              marginBottom: '8px',
                              fontWeight: 'bold',
                              color: '#1f2937'
                            }}>
                              {booking.performanceTitle}
                            </h3>
                            <span style={{
                              display: 'inline-block',
                              background: '#10b981',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        
                        <div style={{ 
                          background: '#f9fafb',
                          padding: '15px',
                          borderRadius: '8px',
                          marginBottom: '15px'
                        }}>
                          <p style={{ 
                            color: '#6b7280', 
                            margin: '8px 0',
                            fontSize: '14px'
                          }}>
                            <strong>예매일:</strong> {new Date(booking.date).toLocaleDateString('ko-KR')}
                          </p>
                          <p style={{ 
                            color: '#6b7280', 
                            margin: '8px 0',
                            fontSize: '14px'
                          }}>
                            <strong>공연일:</strong> {booking.performanceDate}
                          </p>
                          <p style={{ 
                            color: '#6b7280', 
                            margin: '8px 0',
                            fontSize: '14px'
                          }}>
                            <strong>장소:</strong> {booking.performanceLocation}
                          </p>
                          <p style={{ 
                            color: '#6b7280', 
                            margin: '8px 0',
                            fontSize: '14px'
                          }}>
                            <strong>티켓 수:</strong> {booking.ticketCount}매
                          </p>
                          <p style={{ 
                            color: '#667eea', 
                            margin: '8px 0',
                            fontSize: '18px',
                            fontWeight: 'bold'
                          }}>
                            <strong>총 금액:</strong> {booking.totalPrice?.toLocaleString()}원
                          </p>
                        </div>
                        
                        <Button 
                          variant="secondary"
                          onClick={() => setCurrentPage(`performance-${booking.performanceId}`)}
                          style={{ fontSize: '14px', padding: '10px 20px' }}
                        >
                          공연 상세보기
                        </Button>
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
          <h2 style={{ marginBottom: '25px', fontSize: '24px', fontWeight: 'bold' }}>
            ✍️ 내가 작성한 후기
          </h2>
          
          {myReviews.length === 0 ? (
            <Card>
              <p style={{ 
                textAlign: 'center', 
                color: '#9ca3af', 
                padding: '60px 0',
                fontSize: '16px'
              }}>
                작성한 후기가 없습니다.<br/>
                관람한 공연에 대한 후기를 남겨보세요! ✨
              </p>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button onClick={() => setCurrentPage('performances')}>
                  공연 둘러보기
                </Button>
              </div>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {myReviews.map((review) => {
                const perf = performances.find(p => p.id === review.performanceId);
                return (
                  <Card key={review.id}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '15px',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ flex: 1 }}>
                        {/* 공연 정보 */}
                        {perf && (
                          <p style={{ 
                            fontSize: '16px', 
                            color: '#667eea', 
                            marginBottom: '10px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span>🎭</span>
                            <span>{perf.title}</span>
                          </p>
                        )}
                        
                        {/* 평점 & 날짜 */}
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          marginBottom: '15px'
                        }}>
                          <span style={{ 
                            color: '#f59e0b', 
                            fontSize: '24px'
                          }}>
                            {'⭐'.repeat(review.rating)}
                          </span>
                          <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                            {review.date}
                          </span>
                        </div>
                      </div>
                      
                      {/* 삭제 버튼 */}
                      <Button 
                        onClick={() => handleDeleteReview(review.id)} 
                        variant="danger"
                        style={{ 
                          padding: '8px 16px',
                          fontSize: '14px'
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                    
                    {/* 후기 내용 */}
                    <p style={{ 
                      color: '#4b5563', 
                      lineHeight: '1.8',
                      fontSize: '16px',
                      whiteSpace: 'pre-wrap',
                      background: '#f9fafb',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
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