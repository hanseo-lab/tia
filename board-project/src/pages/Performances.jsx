import React, { useState } from 'react';
import { Container, Card, Button } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';

export const Performances = ({ setCurrentPage }) => {
  const { performances } = usePerformanceStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // date, price, title
  
  // 카테고리 목록
  const categories = ['all', '대형공연', '시범', '기념공연'];
  
  // 필터링된 공연
  const filtered = filter === 'all' 
    ? performances 
    : performances.filter(p => p.category === filter);
  
  // 정렬
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  return (
    <Container>
      {/* 페이지 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          marginBottom: '10px', 
          color: '#1f2937',
          fontWeight: '900' // 폰트 두께 강화
        }}>
          🎭 공연 정보
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          TIA 태권도 선교단의 역동적인 공연 일정을 확인하세요.
        </p>
      </div>
      
      {/* 필터 & 정렬 섹션 */}
      <div style={{ 
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #f3f4f6'
      }}>
        {/* 카테고리 필터 */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '700',
            color: '#1f2937',
            fontSize: '15px'
          }}>
            📂 카테고리 선택
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'primary' : 'secondary'}
                style={{ 
                  padding: '8px 18px',
                  fontSize: '14px',
                  borderRadius: '20px' // 둥근 버튼 스타일
                }}
              >
                {cat === 'all' ? '전체보기' : cat}
              </Button>
            ))}
          </div>
        </div>
        
        {/* 정렬 옵션 */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '700',
            color: '#1f2937',
            fontSize: '15px'
          }}>
            🔽 정렬 기준
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['date', 'price', 'title'].map(type => (
               <Button
               key={type}
               onClick={() => setSortBy(type)}
               variant={sortBy === type ? 'primary' : 'secondary'}
               style={{ padding: '8px 18px', fontSize: '14px', borderRadius: '20px' }}
             >
               {type === 'date' && '날짜순'}
               {type === 'price' && '가격순'}
               {type === 'title' && '이름순'}
             </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 공연 개수 표시 */}
      <div style={{ 
        marginBottom: '20px',
        color: '#4b5563',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        총 <strong style={{ color: '#EA580C', fontSize: '16px' }}>{sorted.length}개</strong>의 공연이 있습니다.
      </div>
      
      {/* 공연 카드 그리드 */}
      {sorted.length === 0 ? (
        <Card style={{ padding: '80px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            해당 조건의 공연을 찾을 수 없습니다.
          </p>
          <Button 
            onClick={() => setFilter('all')} 
            style={{ marginTop: '20px' }}
            variant="secondary"
          >
            전체 목록 보기
          </Button>
        </Card>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {sorted.map((perf) => (
            <Card 
              key={perf.id} 
              onClick={() => setCurrentPage(`performance-${perf.id}`)}
              style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* 공연 이미지 */}
              <div style={{ 
                position: 'relative',
                marginBottom: '20px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img 
                  src={perf.image} 
                  alt={perf.title} 
                  style={{ 
                    width: '100%', 
                    height: '220px', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }} 
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                {/* 카테고리 배지 (오렌지색) */}
                <span style={{ 
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  display: 'inline-block', 
                  background: '#EA580C', 
                  color: 'white', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {perf.category}
                </span>
              </div>
              
              {/* 공연 정보 */}
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '22px',
                fontWeight: '800',
                color: '#111827',
                lineHeight: '1.3'
              }}>
                {perf.title}
              </h3>
              
              <p style={{ 
                color: '#6b7280', 
                margin: '0 0 20px 0', 
                lineHeight: '1.6',
                fontSize: '15px',
                flex: 1, // 카드 높이 맞춤
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {perf.description}
              </p>
              
              {/* 날짜와 장소 */}
              <div style={{ 
                background: '#f9fafb',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4b5563' }}>
                  📅 <strong>{perf.date}</strong>
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4b5563' }}>
                  📍 {perf.location}
                </p>
              </div>
              
              {/* 가격 및 버튼 */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto'
              }}>
                <p style={{ 
                  fontWeight: '800', 
                  fontSize: '24px', 
                  color: '#EA580C', 
                  margin: 0
                }}>
                  {perf.price.toLocaleString()}원
                </p>
                <span style={{
                  color: '#4b5563',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  상세보기 <span style={{ color: '#EA580C' }}>→</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};