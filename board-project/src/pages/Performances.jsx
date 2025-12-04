// pages/PerformancesPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button } from '../components/StyledComponents';
import { usePerformanceStore } from '../store/performanceStore';

export const PerformancesPage = ({ setCurrentPage }) => {
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
          fontWeight: 'bold'
        }}>
          🎭 공연 정보
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          TIA 태권도 선교단의 다양한 공연을 만나보세요
        </p>
      </div>
      
      {/* 필터 & 정렬 섹션 */}
      <div style={{ 
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        {/* 카테고리 필터 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            📂 카테고리
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'primary' : 'secondary'}
                style={{ 
                  padding: '10px 20px',
                  fontSize: '14px'
                }}
              >
                {cat === 'all' ? '전체' : cat}
              </Button>
            ))}
          </div>
        </div>
        
        {/* 정렬 옵션 */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            🔽 정렬
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button
              onClick={() => setSortBy('date')}
              variant={sortBy === 'date' ? 'primary' : 'secondary'}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              날짜순
            </Button>
            <Button
              onClick={() => setSortBy('price')}
              variant={sortBy === 'price' ? 'primary' : 'secondary'}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              가격순
            </Button>
            <Button
              onClick={() => setSortBy('title')}
              variant={sortBy === 'title' ? 'primary' : 'secondary'}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              이름순
            </Button>
          </div>
        </div>
      </div>
      
      {/* 공연 개수 표시 */}
      <div style={{ 
        marginBottom: '20px',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        총 <strong style={{ color: '#667eea' }}>{sorted.length}개</strong>의 공연
      </div>
      
      {/* 공연 카드 그리드 */}
      {sorted.length === 0 ? (
        <Card>
          <p style={{ 
            textAlign: 'center', 
            color: '#9ca3af', 
            padding: '60px 0',
            fontSize: '16px'
          }}>
            해당 카테고리의 공연이 없습니다.
          </p>
        </Card>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '25px' 
        }}>
          {sorted.map((perf) => (
            <Card 
              key={perf.id} 
              onClick={() => setCurrentPage(`performance-${perf.id}`)}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {/* 공연 이미지 */}
              <div style={{ 
                position: 'relative',
                marginBottom: '15px'
              }}>
                <img 
                  src={perf.image} 
                  alt={perf.title} 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px'
                  }} 
                />
                {/* 카테고리 배지 */}
                <span style={{ 
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'inline-block', 
                  background: '#667eea', 
                  color: 'white', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '12px',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {perf.category}
                </span>
              </div>
              
              {/* 공연 정보 */}
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                lineHeight: '1.3'
              }}>
                {perf.title}
              </h3>
              
              <p style={{ 
                color: '#6b7280', 
                margin: '0 0 15px 0', 
                lineHeight: '1.6',
                fontSize: '14px',
                height: '42px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {perf.description}
              </p>
              
              {/* 날짜와 장소 */}
              <div style={{ 
                borderTop: '1px solid #e5e7eb',
                paddingTop: '15px',
                marginBottom: '15px'
              }}>
                <p style={{ 
                  color: '#4b5563', 
                  margin: '8px 0',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📅</span>
                  <span>{perf.date}</span>
                </p>
                <p style={{ 
                  color: '#4b5563', 
                  margin: '8px 0',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📍</span>
                  <span>{perf.location}</span>
                </p>
              </div>
              
              {/* 가격 */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <p style={{ 
                  fontWeight: 'bold', 
                  fontSize: '24px', 
                  color: '#667eea', 
                  margin: 0
                }}>
                  {perf.price.toLocaleString()}원
                </p>
                <span style={{
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  자세히 보기 →
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};