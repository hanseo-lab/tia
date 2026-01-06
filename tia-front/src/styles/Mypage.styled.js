import styled from 'styled-components';

export const Header = styled.div`
  margin-bottom: 40px;
  
  h1 {
    font-size: 36px;
    margin-bottom: 10px;
    color: #1f2937;
    font-weight: 900;
  }
  
  p {
    font-size: 16px;
    color: #6b7280;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e5e7eb;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  border-bottom: ${props => props.$active ? '3px solid #EA580C' : '3px solid transparent'};
  padding: 15px 25px;
  font-size: 16px;
  font-weight: ${props => props.$active ? '700' : '500'};
  color: ${props => props.$active ? '#EA580C' : '#6b7280'};
  cursor: pointer;
  transition: all 0.3s;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
`;

export const InfoDisplay = styled.div`
  background: #f9fafb;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
`;

export const InfoItem = styled.div`
  margin-bottom: ${props => props.$last ? 0 : '20px'};
  
  p:first-child {
    color: #6b7280;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  
  p:last-child {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: ${props => props.$mt ? props.$mt : 0};
`;

export const BookingItem = styled.div`
  display: flex;
  gap: 25px;
  align-items: flex-start;
`;

export const BookingImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

export const BookingContent = styled.div`
  flex: 1;
`;

export const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin: 0;
  }
`;

export const StatusBadge = styled.span`
  background: #10b981;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  height: fit-content;
`;

export const BookingDetails = styled.div`
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
`;

export const BookingFooter = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p {
    font-weight: 800;
    font-size: 18px;
    color: #EA580C;
    margin: 0;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ReviewContent = styled.p`
  background: #f9fafb;
  padding: 15px;
  border-radius: 8px;
  color: #374151;
  line-height: 1.6;
`;