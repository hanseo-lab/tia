import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';

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
      <div style={{ 
        position: 'relative', 
        height: '400px', 
        borderRadius: '16px', 
        overflow: 'hidden',
        marginBottom: '50px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        {performances.map((perf, idx) => (
          <div
            key={perf.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: idx === currentSlide ? 1 : 0,
              transition: 'opacity 1s',
              // 그라데이션을 검정 베이스로 하여 텍스트 가독성 확보
              background: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${perf.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-start', // 왼쪽 정렬
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: '60px',
              color: 'white'
            }}
          >
            <span style={{ 
              background: '#EA580C', 
              padding: '5px 12px', 
              borderRadius: '4px', 
              fontSize: '14px', 
              marginBottom: '15px', 
              fontWeight: 'bold' 
            }}>
              {perf.category}
            </span>
            <h2 style={{ fontSize: '48px', margin: '0 0 20px 0', fontWeight: '800' }}>
              {perf.title}
            </h2>
            <p style={{ fontSize: '20px', margin: '0 0 30px 0', opacity: 0.9 }}>
              📅 {perf.date} &nbsp;|&nbsp; 📍 {perf.location}
            </p>
            <Button onClick={() => setCurrentPage(`performance-${perf.id}`)} style={{ padding: '15px 40px', fontSize: '18px' }}>
              예매하기
            </Button>
          </div>
        ))}
        {/* 슬라이드 인디케이터 (오렌지색 적용) */}
        <div style={{ position: 'absolute', bottom: '30px', left: '60px', display: 'flex', gap: '10px' }}>
          {performances.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: idx === currentSlide ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: idx === currentSlide ? '#EA580C' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* 추천 공연 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '10px' }}>
        <h2 style={{ fontSize: '32px', color: '#1f2937', fontWeight: '800' }}>추천 공연</h2>
        <div style={{ flex: 1, height: '2px', background: '#f3f4f6' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', marginBottom: '60px' }}>
        {performances.map((perf) => (
          <Card key={perf.id} onClick={() => setCurrentPage(`performance-${perf.id}`)}>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', marginBottom: '15px' }}>
              <img src={perf.image} alt={perf.title} style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }} />
              <div style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                background: 'rgba(0,0,0,0.7)', 
                color: 'white', 
                padding: '4px 10px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                {perf.category}
              </div>
            </div>
            <h3 style={{ margin: '10px 0', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{perf.title}</h3>
            <p style={{ color: '#6b7280', margin: '5px 0', fontSize: '14px' }}>📅 {perf.date}</p>
            <p style={{ color: '#6b7280', margin: '5px 0', fontSize: '14px' }}>📍 {perf.location}</p>
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontWeight: '800', fontSize: '20px', color: '#EA580C', margin: 0 }}>
                {perf.price.toLocaleString()}원
              </p>
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>자세히 보기 &gt;</span>
            </div>
          </Card>
        ))}
      </div>
      
      {/* 최신 후기 */}
      <div style={{ background: '#f9fafb', margin: '0 -20px', padding: '60px 20px' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', color: '#1f2937', fontWeight: '800' }}>생생한 관람 후기</h2>
            <Button onClick={() => setCurrentPage('reviews')} variant="secondary">
              전체 후기 보기
            </Button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {reviews.slice(0, 3).map((review) => {
              const perf = performances.find(p => p.id === review.performanceId);
              return (
                <Card key={review.id} style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>👤</div>
                      <span style={{ fontWeight: 'bold' }}>{review.userName}</span>
                    </div>
                    <span style={{ color: '#F59E0B' }}>{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <div style={{ minHeight: '60px', marginBottom: '15px' }}>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '15px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {review.content}
                    </p>
                  </div>
                  <p style={{ fontSize: '13px', color: '#EA580C', fontWeight: '600', borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
                    @{perf?.title}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </div>
    </Container>
  );
};