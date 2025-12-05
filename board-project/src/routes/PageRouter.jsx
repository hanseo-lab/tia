import React from 'react';
import { Home } from '../pages/Home';
import { Performances } from '../pages/Performances';
import { PerformanceDetail } from '../pages/PerformanceDetail';
import { ReviewsPage } from '../pages/ReviewsPage';
import { MyPage } from '../pages/Mypage';
import { Login } from '../pages/Login';

export const PageRouter = ({ currentPage, setCurrentPage }) => {
  // 홈 페이지
  if (currentPage === 'home') {
    return <Home setCurrentPage={setCurrentPage} />;
  }
  
  // 공연 목록 페이지
  if (currentPage === 'performances') {
    return <Performances setCurrentPage={setCurrentPage} />;
  }
  
  // 공연 상세 페이지
  if (currentPage.startsWith('performance-')) {
    const id = currentPage.split('-')[1];
    return <PerformanceDetail performanceId={id} setCurrentPage={setCurrentPage} />;
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
    return <Login setCurrentPage={setCurrentPage} />;
  }
  
  // 기본값: 홈 페이지
  return <Home setCurrentPage={setCurrentPage} />;
};