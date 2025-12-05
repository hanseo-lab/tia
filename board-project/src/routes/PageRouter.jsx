import React from 'react';
import { HomePage } from '../pages/HomePage';
import { PerformancesPage } from '../pages/PerformancesPage';
import { PerformanceDetailPage } from '../pages/PerformanceDetailPage';
import { ReviewsPage } from '../pages/ReviewsPage';
import { MyPage } from '../pages/Mypage';
import { LoginPage } from '../pages/LoginPage';

export const PageRouter = ({ currentPage, setCurrentPage }) => {
  // 홈 페이지
  if (currentPage === 'home') {
    return <HomePage setCurrentPage={setCurrentPage} />;
  }
  
  // 공연 목록 페이지
  if (currentPage === 'performances') {
    return <PerformancesPage setCurrentPage={setCurrentPage} />;
  }
  
  // 공연 상세 페이지
  if (currentPage.startsWith('performance-')) {
    const id = currentPage.split('-')[1];
    return <PerformanceDetailPage performanceId={id} setCurrentPage={setCurrentPage} />;
  }
  
  // 전체 후기 페이지
  if (currentPage === 'reviews') {
    return <ReviewsPage />;
  }
  
  // 마이페이지
  if (currentPage === 'mypage') {
    return <MyPage setCurrentPage={setCurrentPage} />;
  }
  
  // 로그인/회원가입 페이지
  if (currentPage === 'login') {
    return <LoginPage setCurrentPage={setCurrentPage} />;
  }
  
  // 기본값: 홈 페이지
  return <HomePage setCurrentPage={setCurrentPage} />;
};