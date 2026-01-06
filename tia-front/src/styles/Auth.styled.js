import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  padding: 40px 20px;
`;

export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const Icon = styled.span`
  font-size: 48px;
  margin-bottom: 10px;
  display: block;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: #1f2937;
  font-weight: 800;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  font-size: 15px;
`;

export const Footer = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: ${props => props.$mt ? props.$mt : 0};
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: #EA580C;
  font-weight: 700;
  cursor: pointer;
  margin-left: 8px;
  text-decoration: underline;
`;