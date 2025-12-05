import styled from 'styled-components';

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  margin-bottom: 80px;
`;

export const PosterImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

export const InfoSection = styled.div``;

export const CategoryTag = styled.span`
  display: inline-block;
  background: #fff7ed;
  color: #EA580C;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 700;
  border: 1px solid #ffedd5;
`;

export const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 20px 0;
  color: #111827;
  font-weight: 900;
  line-height: 1.2;
`;

export const RatingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e7eb;
`;

export const Star = styled.span`
  font-size: 24px;
  color: #F59E0B;
`;

export const RatingScore = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
`;

export const RatingCount = styled.span`
  color: #6b7280;
  font-size: 16px;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 40px;
`;

export const BookingBox = styled.div`
  background: #f9fafb;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
`;

export const DateTimeLoc = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #4b5563;
  
  p {
    margin-bottom: 8px;
    &:last-child { margin-bottom: 0; }
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.$mb || '20px'};
`;

export const Label = styled.span`
  color: #1f2937;
  font-weight: 600;
  font-size: 16px;
  ${props => props.$bold && `
    font-weight: bold;
    font-size: 18px;
  `}
`;

export const PriceValue = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
`;

export const TotalPrice = styled.span`
  font-size: 32px;
  font-weight: 900;
  color: #EA580C;
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

export const CounterBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #374151;
`;

export const CountDisplay = styled.span`
  font-size: 18px;
  font-weight: bold;
  width: 30px;
  text-align: center;
  color: #1f2937;
`;

export const Divider = styled.div`
  border-top: 2px dashed #d1d5db;
  margin: 20px 0;
`;

export const ReviewsSection = styled.div`
  border-top: 2px solid #e5e7eb;
  padding-top: 60px;
`;

export const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const ReviewsTitle = styled.h2`
  font-size: 32px;
  color: #1f2937;
  font-weight: 900;
  
  span {
    color: #EA580C;
  }
`;

export const ReviewFormHeader = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #9a3412;
`;

export const StarSelect = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

export const SelectStar = styled.span`
  font-size: 36px;
  cursor: pointer;
  color: ${props => props.$active ? '#F59E0B' : '#d1d5db'};
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const EmptyReviews = styled.p`
  color: #9ca3af;
  font-size: 16px;
  text-align: center;
`;

export const ReviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
`;

export const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const ReviewerName = styled.div`
  font-weight: bold;
  color: #1f2937;
`;

export const ReviewDate = styled.span`
  color: #9ca3af;
  font-size: 14px;
`;

export const ReviewText = styled.p`
  color: #4b5563;
  line-height: 1.6;
  font-size: 16px;
  white-space: pre-wrap;
`;