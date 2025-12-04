// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from '../components/StyledComponents';
import { usePerformanceStore } from '../store/performanceStore';

export const HomePage = ({ setCurrentPage }) => {
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
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${perf.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'white'
            }}
          >
            <h2 style={{ fontSize: '48px', margin: '0 0 20px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {perf.title}
            </h2>
            <p style={{ fontSize: '24px', margin: '0 0 30px 0' }}>
              📅 {perf.date} | 📍 {perf.location}
            </p>
            <Button onClick={() => setCurrentPage(`performance-${perf.id}`)}>
              상세보기
            </Button>
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
          {performances.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* 추천 공연 */}
      <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#1f2937' }}>🎭 추천 공연</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        {performances.map((perf) => (
          <Card key={perf.id} onClick={() => setCurrentPage(`performance-${perf.id}`)}>
            <img src={perf.image} alt={perf.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
            <span style={{ display: 'inline-block', background: '#667eea', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '10px' }}>
              {perf.category}
            </span>
            <h3 style={{ margin: '10px 0', fontSize: '20px' }}>{perf.title}</h3>
            <p style={{ color: '#6b7280', margin: '5px 0' }}>📅 {perf.date}</p>
            <p style={{ color: '#6b7280', margin: '5px 0' }}>📍 {perf.location}</p>
            <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#667eea', margin: '10px 0' }}>
              {perf.price.toLocaleString()}원
            </p>
          </Card>
        ))}
      </div>
      
      {/* 최신 후기 */}
      <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#1f2937' }}>📝 최신 공연 후기</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reviews.slice(0, 3).map((review) => {
          const perf = performances.find(p => p.id === review.performanceId);
          return (
            <Card key={review.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{review.userName}</span>
                  <span style={{ color: '#f59e0b' }}>{'⭐'.repeat(review.rating)}</span>
                </div>
                <span style={{ color: '#9ca3af' }}>{review.date}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#667eea', marginBottom: '8px' }}>
                공연: {perf?.title}
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{review.content}</p>
            </Card>
          );
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button onClick={() => setCurrentPage('reviews')} variant="secondary">
          모든 후기 보기 →
        </Button>
      </div>
    </Container>
  );
};