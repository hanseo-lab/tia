// pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button, Input } from '../components/StyledComponents';
import { useAuthStore } from '../store/authStore';

export const LoginPage = ({ setCurrentPage }) => {
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
    <Container style={{ maxWidth: '500px', marginTop: '50px' }}>
      <Card>
        <h1 style={{ 
          fontSize: '32px', 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: '#1f2937' 
        }}>
          🔐 {isLogin ? '로그인' : '회원가입'}
        </h1>
        
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
          placeholder="이메일을 입력하세요"
        />
        
        <Input
          label="비밀번호"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="비밀번호를 입력하세요"
        />
        
        <Button onClick={handleSubmit} style={{ width: '100%', marginBottom: '15px' }}>
          {isLogin ? '로그인' : '회원가입'}
        </Button>
        
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontWeight: '600',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </p>
      </Card>
    </Container>
  );
};