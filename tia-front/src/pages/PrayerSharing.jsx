import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const PageContainer = styled.div`
    min-height: 100vh;
    background-color: #f7f7f7;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5%;
    background-color: white;
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

const ContentWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
`;

const BoardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
`;

const Title = styled.h2`
    color: var(--color-primary);
    font-size: 1.8rem;
`;

const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: var(--color-primary);
    color: white;
    border-radius: 5px;
    font-weight: 600;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

const PrayerList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PrayerCard = styled.div`
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    border-left: 4px solid var(--color-accent);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: #888;
`;

const WriterName = styled.span`
    font-weight: 700;
    color: var(--color-primary);
`;

const PrayerContent = styled.p`
    line-height: 1.6;
    color: #333;
    margin-bottom: 20px;
    white-space: pre-wrap;
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0f0f0;
    padding-top: 15px;
`;

const Tag = styled.span`
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #555;
    margin-right: 10px;
`;

const PrayButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-accent);
    font-weight: 600;
    padding: 6px 12px;
    border: 1px solid var(--color-accent);
    border-radius: 20px;
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-accent);
        color: white;
    }
`;

const PrayerSharing = () => {
    return (
        <PageContainer>
            <Header>
                <LogoLink to="/">
                    <LogoImg src={logo} alt="TIA Logo" />
                </LogoLink>
            </Header>

            <ContentWrapper>
                <BoardHeader>
                    <Title>기도 나눔 게시판</Title>
                    <WriteButton>기도제목 나누기</WriteButton>
                </BoardHeader>

                <PrayerList>
                    <PrayerCard>
                        <CardHeader>
                            <WriterName>김철수 성도</WriterName>
                            <span>방금 전</span>
                        </CardHeader>
                        <PrayerContent>
                            이번 주말에 있을 청년부 수련회를 위해 기도 부탁드립니다. 모든 청년들이 하나님을 깊이 만나는 시간이 되길 소망합니다.
                        </PrayerContent>
                        <CardFooter>
                            <div>
                                <Tag>#수련회</Tag>
                                <Tag>#청년부</Tag>
                            </div>
                            <PrayButton>🙏 함께 기도하기 (12)</PrayButton>
                        </CardFooter>
                    </PrayerCard>

                    <PrayerCard>
                        <CardHeader>
                            <WriterName>익명</WriterName>
                            <span>1시간 전</span>
                        </CardHeader>
                        <PrayerContent>
                            가족들의 건강과 아버지의 수술이 잘 진행되도록 기도해주세요. 의료진의 손길을 붙들어주시길 기도합니다.
                        </PrayerContent>
                        <CardFooter>
                            <div>
                                <Tag>#가족건강</Tag>
                                <Tag>#치유</Tag>
                            </div>
                            <PrayButton>🙏 함께 기도하기 (35)</PrayButton>
                        </CardFooter>
                    </PrayerCard>

                    <PrayerCard>
                        <CardHeader>
                            <WriterName>TIA 본부</WriterName>
                            <span>1일 전</span>
                        </CardHeader>
                        <PrayerContent>
                            필리핀 단기 선교팀의 안전한 도착과 사역 준비를 위해 기도해주십시오. 현지 교회와의 협력이 은혜 가운데 이루어지길 바랍니다.
                        </PrayerContent>
                        <CardFooter>
                            <div>
                                <Tag>#필리핀</Tag>
                                <Tag>#단기선교</Tag>
                            </div>
                            <PrayButton>🙏 함께 기도하기 (89)</PrayButton>
                        </CardFooter>
                    </PrayerCard>
                </PrayerList>
            </ContentWrapper>
        </PageContainer>
    );
};

export default PrayerSharing;
