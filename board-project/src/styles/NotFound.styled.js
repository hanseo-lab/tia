import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export const ErrorIcon = styled.div`
  font-size: 100px;
  margin-bottom: 20px;
  animation: ${bounce} 2s infinite;
`;

export const ErrorCode = styled.h1`
  font-size: 80px;
  font-weight: 900;
  background: linear-gradient(135deg, #EA580C 0%, #F97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  line-height: 1;
`;

export const ErrorTitle = styled.h2`
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 15px;
  font-weight: 800;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 40px;
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;