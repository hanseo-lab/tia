import styled from 'styled-components';

export const PageHeader = styled.div`
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  color: #1f2937;
  font-weight: 900;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
`;

export const FilterSection = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #f3f4f6;
`;

export const FilterGroup = styled.div`
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 700;
  color: #1f2937;
  font-size: 15px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CountText = styled.div`
  margin-bottom: 20px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  
  strong {
    color: #EA580C;
    font-size: 16px;
  }
`;

export const EmptyState = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

export const EmptyText = styled.p`
  color: #6b7280;
  font-size: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
`;

export const CardImageWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  display: inline-block;
  background: #EA580C;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const CardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
`;

export const CardDesc = styled.p`
  color: #6b7280;
  margin: 0 0 20px 0;
  line-height: 1.6;
  font-size: 15px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const InfoBox = styled.div`
  background: #f9fafb;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const InfoText = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #4b5563;
`;

export const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const PriceText = styled.p`
  font-weight: 800;
  font-size: 24px;
  color: #EA580C;
  margin: 0;
`;

export const DetailButton = styled.span`
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  
  span {
    color: #EA580C;
  }
`;