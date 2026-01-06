import styled from 'styled-components';

export const PageHeader = styled.div`
  margin-bottom: 40px;
  
  h1 {
    font-size: 36px;
    margin-bottom: 10px;
    color: #1f2937;
    font-weight: bold;
  }
  
  p {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.6;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ReviewCount = styled.div`
  margin-bottom: 20px;
  color: #6b7280;
  font-size: 14px;
  
  strong {
    color: #667eea;
  }
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const EmptyState = styled.p`
  text-align: center;
  color: #9ca3af;
  padding: 60px 0;
  font-size: 16px;
`;

export const ReviewItemContent = styled.div`
  display: flex;
  gap: 20px;
`;

export const ThumbImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  flex-shrink: 0;
`;

export const ReviewTextSection = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: flex-start;
`;

export const UserInfo = styled.div`
  margin-bottom: 8px;
`;

export const UserName = styled.span`
  font-weight: bold;
  margin-right: 12px;
  font-size: 18px;
  color: #1f2937;
`;

export const Rating = styled.span`
  color: #f59e0b;
  font-size: 20px;
`;

export const PerfLink = styled.p`
  font-size: 15px;
  color: #667eea;
  margin-bottom: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateText = styled.span`
  color: #9ca3af;
  font-size: 14px;
  flex-shrink: 0;
  margin-left: 15px;
`;

export const Content = styled.p`
  color: #4b5563;
  line-height: 1.8;
  font-size: 16px;
  margin: 15px 0 0 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MetaTags = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #6b7280;
`;

export const CategoryTag = styled.span`
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  color: #667eea;
  font-weight: 600;
`;

export const CTASection = styled.div`
  text-align: center;
  
  h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #1f2937;
  }
  
  p {
    color: #6b7280;
    margin-bottom: 25px;
    font-size: 16px;
  }
`;