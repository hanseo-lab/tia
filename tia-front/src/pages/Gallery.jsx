import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const PageContainer = styled.div`
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5%;
    border-bottom: 1px solid #eee;
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
`;

const LogoImg = styled.img`
    height: 50px;
    width: auto;
`;

const GallerySection = styled.section`
    padding: 40px 5%;
    max-width: 1400px;
    margin: 0 auto;
`;

const PageHeader = styled.div`
    text-align: center;
    margin-bottom: 40px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 20px;

    span {
        color: var(--color-accent);
    }
`;

const FilterNav = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
    flex-wrap: wrap;
`;

const FilterButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.active ? 'var(--color-accent)' : '#888'};
    border-bottom: 2px solid ${props => props.active ? 'var(--color-accent)' : 'transparent'};
    transition: all 0.2s;

    &:hover {
        color: var(--color-accent);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

const GridItem = styled.div`
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    background-color: #eee;

    &:hover img {
        transform: scale(1.05);
    }
    
    &:hover div {
        opacity: 1;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
`;

const Overlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const ItemTitle = styled.h4`
    font-size: 1.1rem;
    margin-bottom: 5px;
`;

const ItemDate = styled.span`
    font-size: 0.9rem;
    opacity: 0.8;
`;

// Mock Data
const galleryItems = [
    { id: 1, category: 'mission', title: '필리핀 단기 선교', date: '2025.12', src: 'https://placehold.co/600x400/333/fff?text=Mission+Trip' },
    { id: 2, category: 'performance', title: '전국 대회 시범', date: '2025.10', src: 'https://placehold.co/600x400/orange/white?text=Demo' },
    { id: 3, category: 'training', title: '동계 훈련 캠프', date: '2025.01', src: 'https://placehold.co/600x400/555/fff?text=Training' },
    { id: 4, category: 'mission', title: '태국 사역', date: '2024.11', src: 'https://placehold.co/600x400/333/fff?text=Thailand' },
    { id: 5, category: 'performance', title: '교회 초청 공연', date: '2024.08', src: 'https://placehold.co/600x400/orange/white?text=Church+Event' },
    { id: 6, category: 'training', title: '정기 승급 심사', date: '2024.06', src: 'https://placehold.co/600x400/555/fff?text=Test' },
];

const Gallery = () => {
    const [filter, setFilter] = useState('all');

    const filteredItems = filter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    return (
        <PageContainer>
            <Header>
                <LogoLink to="/">
                    <LogoImg src={logo} alt="TIA Logo" />
                </LogoLink>
            </Header>

            <GallerySection>
                <PageHeader>
                    <Title>MINISTRY <span>GALLERY</span></Title>
                    <p>TIA의 생생한 사역 현장을 소개합니다.</p>
                </PageHeader>

                <FilterNav>
                    <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>전체</FilterButton>
                    <FilterButton active={filter === 'mission'} onClick={() => setFilter('mission')}>해외선교</FilterButton>
                    <FilterButton active={filter === 'performance'} onClick={() => setFilter('performance')}>시범/공연</FilterButton>
                    <FilterButton active={filter === 'training'} onClick={() => setFilter('training')}>훈련/교육</FilterButton>
                </FilterNav>

                <Grid>
                    {filteredItems.map(item => (
                        <GridItem key={item.id}>
                            <Image src={item.src} alt={item.title} />
                            <Overlay>
                                <ItemTitle>{item.title}</ItemTitle>
                                <ItemDate>{item.date}</ItemDate>
                            </Overlay>
                        </GridItem>
                    ))}
                </Grid>
            </GallerySection>
        </PageContainer>
    );
};

export default Gallery;
