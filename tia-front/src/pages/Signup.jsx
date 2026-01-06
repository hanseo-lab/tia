import React, { useState } from 'react';
import { Card, Button, Input } from '../components/common';
import { useAuthStore } from '../store/authStore';
import * as S from '../styles/Auth.styled';

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
    
    login({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinDate: new Date().toLocaleDateString('ko-KR')
    });
    
    alert(`환영합니다, ${formData.name}님!\n회원가입이 완료되었습니다.`);
    setCurrentPage('home');
  };
  
  return (
    <S.AuthContainer>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <S.AuthHeader>
           <S.Icon>👋</S.Icon>
           <S.Title>회원가입</S.Title>
          <S.Subtitle>
            TIA 태권도 선교단의 가족이 되어주세요.<br/>
            다양한 공연 정보와 혜택을 누리실 수 있습니다.
          </S.Subtitle>
        </S.AuthHeader>
        
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
            
            <S.Footer>
              이미 계정이 있으신가요?
              <S.LinkButton onClick={() => setCurrentPage('login')}>
                로그인하기
              </S.LinkButton>
            </S.Footer>
        </div>
      </Card>
    </S.AuthContainer>
  );
};