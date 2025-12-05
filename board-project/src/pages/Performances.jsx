import React, { useState } from 'react';
import { Container, Card, Button } from '../components/common';
import { usePerformanceStore } from '../store/performanceStore';
import * as S from '../styles/Performances.styled';

export const Performances = ({ setCurrentPage }) => {
  const { performances } = usePerformanceStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  const categories = ['all', '대형공연', '시범', '기념공연'];
  
  const filtered = filter === 'all' 
    ? performances 
    : performances.filter(p => p.category === filter);
  
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });
  
  return (
    <Container>
      <S.PageHeader>
        <S.Title>🎭 공연 정보</S.Title>
        <S.Subtitle>TIA 태권도 선교단의 역동적인 공연 일정을 확인하세요.</S.Subtitle>
      </S.PageHeader>
      
      <S.FilterSection>
        <S.FilterGroup>
          <S.FilterLabel>📂 카테고리 선택</S.FilterLabel>
          <S.ButtonGroup>
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'primary' : 'secondary'}
                style={{ padding: '8px 18px', fontSize: '14px', borderRadius: '20px' }}
              >
                {cat === 'all' ? '전체보기' : cat}
              </Button>
            ))}
          </S.ButtonGroup>
        </S.FilterGroup>
        
        <S.FilterGroup>
          <S.FilterLabel>🔽 정렬 기준</S.FilterLabel>
          <S.ButtonGroup>
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
          </S.ButtonGroup>
        </S.FilterGroup>
      </S.FilterSection>
      
      <S.CountText>
        총 <strong>{sorted.length}개</strong>의 공연이 있습니다.
      </S.CountText>
      
      {sorted.length === 0 ? (
        <Card style={{ padding: '80px 0', textAlign: 'center' }}>
          <S.EmptyState>🔍</S.EmptyState>
          <S.EmptyText>해당 조건의 공연을 찾을 수 없습니다.</S.EmptyText>
          <Button onClick={() => setFilter('all')} style={{ marginTop: '20px' }} variant="secondary">
            전체 목록 보기
          </Button>
        </Card>
      ) : (
        <S.Grid>
          {sorted.map((perf) => (
            <Card 
              key={perf.id} 
              onClick={() => setCurrentPage(`performance-${perf.id}`)}
              style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <S.CardImageWrapper>
                <S.CardImage src={perf.image} alt={perf.title} />
                <S.Badge>{perf.category}</S.Badge>
              </S.CardImageWrapper>
              
              <S.CardTitle>{perf.title}</S.CardTitle>
              <S.CardDesc>{perf.description}</S.CardDesc>
              
              <S.InfoBox>
                <S.InfoText>📅 <strong>{perf.date}</strong></S.InfoText>
                <S.InfoText>📍 {perf.location}</S.InfoText>
              </S.InfoBox>
              
              <S.FooterBox>
                <S.PriceText>{perf.price.toLocaleString()}원</S.PriceText>
                <S.DetailButton>
                  상세보기 <span>→</span>
                </S.DetailButton>
              </S.FooterBox>
            </Card>
          ))}
        </S.Grid>
      )}
    </Container>
  );
};