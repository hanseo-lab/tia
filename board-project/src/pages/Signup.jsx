// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button, Input } from '../components/StyledComponents'; // components/common.jsx
import { useAuthStore } from '../store/authStore';

export const SignupPage = ({ setCurrentPage }) => {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: ''
  });
  
  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
        alert('비밀번호는 6자 이상이어야 합니다.');
        return;
    }
    
    // 회원가입 처리 (자동 로그인)
    login({
      id: Date.now(), // 임시 ID 생성
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinDate: new Date().toLocaleDateString('ko-KR')
    });
    
    alert(`환영합니다, ${formData.name}님!\n회원가입이 완료되었습니다.`);
    setCurrentPage('home');
  };
  
  return (
    <Container style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      padding: '40px 20px'
    }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
           <span style={{ fontSize: '48px', marginBottom: '10px', display: 'block' }}>👋</span>
           <h1 style={{ 
            fontSize: '32px', 
            marginBottom: '10px', 
            color: '#1f2937',
            fontWeight: '900'
          }}>
            회원가입
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>
            TIA 태권도 선교단의 가족이 되어주세요.<br/>
            다양한 공연 정보와 혜택을 누리실 수 있습니다.
          </p>
        </div>
        
        <Input
          label="이름 (필수)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="실명을 입력하세요"
        />
        
        <Input
          label="이메일 (필수)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="user@example.com"
        />
        
        <Input
          label="비밀번호 (필수)"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="6자 이상 입력하세요"
        />

        <Input
          label="비밀번호 확인 (필수)"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="비밀번호를 다시 입력하세요"
        />

        <Input
          label="전화번호 (선택)"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="010-0000-0000"
        />
        
        <div style={{ marginTop: '30px' }}>
            <Button 
            onClick={handleSubmit} 
            style={{ width: '100%', marginBottom: '20px', padding: '16px', fontSize: '18px' }}
            >
            가입하기
            </Button>
            
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            이미 계정이 있으신가요?
            <button
                onClick={() => setCurrentPage('login')}
                style={{
                background: 'none',
                border: 'none',
                color: '#EA580C', // 오렌지색 링크
                fontWeight: '700',
                cursor: 'pointer',
                marginLeft: '8px',
                textDecoration: 'underline'
                }}
            >
                로그인하기
            </button>
            </p>
        </div>
      </Card>
    </Container>
  );
};