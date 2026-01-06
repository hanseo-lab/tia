import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5%;
    background-color: var(--color-white);
    border-bottom: 1px solid #eee;

    @media (max-width: 768px) {
        padding: 10px 5%;
    }
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
`;

const LogoImg = styled.img`
    height: 50px;
    width: auto;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 60px 5%;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
`;

const RequestLayout = styled.div`
    display: flex;
    max-width: 1000px;
    width: 100%;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

const SidePanel = styled.div`
    flex: 1;
    background-color: var(--color-primary);
    color: white;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 850px) {
        padding: 30px;
    }
`;

const SideTitle = styled.h2`
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 20px;
    color: var(--color-accent);
`;

const SideText = styled.p`
    line-height: 1.8;
    margin-bottom: 40px;
    opacity: 0.9;
`;

const ContactInfo = styled.div`
    h4 {
        color: var(--color-accent);
        margin-bottom: 10px;
    }
    p {
        margin-bottom: 5px;
        font-size: 0.9rem;
    }
`;

const FormPanel = styled.div`
    flex: 1.5;
    padding: 50px;

    @media (max-width: 850px) {
        padding: 30px;
    }
`;

const FormTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: var(--color-primary);
`;

const FormGroup = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        color: #555;
    }

    input, select, textarea {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        transition: border-color 0.2s;

        &:focus {
            outline: none;
            border-color: var(--color-accent);
        }
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: var(--color-accent);
    color: white;
    font-weight: 700;
    border-radius: 8px;
    font-size: 1rem;
    transition: background 0.2s;

    &:hover {
        background-color: #e67300;
    }
`;

const MinistryRequest = () => {
    return (
        <PageContainer>
            <Header>
                <LogoLink to="/">
                    <LogoImg src={logo} alt="TIA Logo" />
                </LogoLink>
                {/* Navigation links can be added via a common component */}
            </Header>

            <MainContent>
                <RequestLayout>
                    <SidePanel>
                        <div>
                            <SideTitle>사역 신청</SideTitle>
                            <SideText>
                                TIA 태권도 선교단은 전 세계 어디든 복음이 필요한 곳으로 달려갑니다.<br /><br />
                                태권도 시범, 간증, 교육 등 다양한 사역을 통해 하나님의 사랑을 전하고자 하시는 교회나 단체는 언제든 신청해 주세요.
                            </SideText>
                        </div>
                        <ContactInfo>
                            <h4>문의처</h4>
                            <p>전화: 02-1234-5678</p>
                            <p>이메일: mission@tia.org</p>
                        </ContactInfo>
                    </SidePanel>

                    <FormPanel>
                        <FormTitle>신청서 작성</FormTitle>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <FormGroup>
                                <label>단체/교회명</label>
                                <input type="text" placeholder="단체명을 입력하세요" required />
                            </FormGroup>
                            <FormGroup>
                                <label>신청자 성함</label>
                                <input type="text" placeholder="담당자 성함" required />
                            </FormGroup>
                            <FormGroup>
                                <label>연락처</label>
                                <input type="tel" placeholder="010-0000-0000" required />
                            </FormGroup>
                            <FormGroup>
                                <label>요청 사역 유형</label>
                                <select>
                                    <option>태권도 시범</option>
                                    <option>집회 간증</option>
                                    <option>단기 선교 교육</option>
                                    <option>기타</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>사역 요청 내용</label>
                                <textarea placeholder="날짜, 장소, 예상 인원 등 구체적인 내용을 적어주세요." required></textarea>
                            </FormGroup>
                            <SubmitButton type="submit">신청하기</SubmitButton>
                        </form>
                    </FormPanel>
                </RequestLayout>
            </MainContent>
        </PageContainer>
    );
};

export default MinistryRequest;
