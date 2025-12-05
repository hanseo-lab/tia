import React, { useState } from 'react';
import { Card, Button, Input } from '../components/common';
import { useAuthStore } from '../store/authStore';
import * as S from '../styles/Auth.styled';

export const Login = ({ setCurrentPage }) => {
  const { login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '' 
  });
  
  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    if (!isLogin && !formData.name) {
      alert('이름을 입력해주세요.');
      return;
    }
    
    login({
      id: 1,
      name: formData.name || '사용자',
      email: formData.email,
      joinDate: new Date().toLocaleDateString('ko-KR')
    });
    
    alert(isLogin ? '로그인되었습니다!' : '회원가입이 완료되었습니다!');
    setCurrentPage('home');
  };
  
  return (
    <S.AuthContainer>
      <Card style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <S.AuthHeader>
           <S.Icon>{isLogin ? '🔐' : '👋'}</S.Icon>
           <S.Title>{isLogin ? '로그인' : '회원가입'}</S.Title>
          <S.Subtitle>
            {isLogin ? 'TIA 태권도 선교단에 오신 것을 환영합니다.' : '새로운 계정을 생성하여 시작하세요.'}
          </S.Subtitle>
        </S.AuthHeader>
        
        {!isLogin && (
          <Input
            label="이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="이름을 입력하세요"
          />
        )}
        
        <Input
          label="이메일"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="user@example.com"
        />
        
        <Input
          label="비밀번호"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="비밀번호를 입력하세요"
        />
        
        <Button 
          onClick={handleSubmit} 
          style={{ width: '100%', marginBottom: '20px', padding: '14px', fontSize: '16px' }}
        >
          {isLogin ? '로그인하기' : '가입하기'}
        </Button>
        
        <S.Footer>
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <S.LinkButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '회원가입' : '로그인'}
          </S.LinkButton>
        </S.Footer>
      </Card>
    </S.AuthContainer>
  );
};