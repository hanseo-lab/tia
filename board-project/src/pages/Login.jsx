import React, { useState } from 'react';
import { Container, Card, Button, Input } from '../components/common';
import { useAuthStore } from '../store/authStore';

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
    <Container style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '600px' 
    }}>
      <Card style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
           <span style={{ fontSize: '48px', marginBottom: '10px', display: 'block' }}>
             {isLogin ? '🔐' : '👋'}
           </span>
           <h1 style={{ 
            fontSize: '32px', 
            marginBottom: '10px', 
            color: '#1f2937',
            fontWeight: '800'
          }}>
            {isLogin ? '로그인' : '회원가입'}
          </h1>
          <p style={{ color: '#6b7280' }}>
            {isLogin ? 'TIA 태권도 선교단에 오신 것을 환영합니다.' : '새로운 계정을 생성하여 시작하세요.'}
          </p>
        </div>
        
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
        
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
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
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </p>
      </Card>
    </Container>
  );
};