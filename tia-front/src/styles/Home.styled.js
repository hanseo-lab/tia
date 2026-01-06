import styled from 'styled-components';

export const SlideBanner = styled.div`
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

export const SlideItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 1s;
  background: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 60px;
  color: white;
`;

export const SlideCategory = styled.span`
  background: #EA580C;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const SlideTitle = styled.h2`
  font-size: 48px;
  margin: 0 0 20px 0;
  font-weight: 800;
`;

export const SlideInfo = styled.p`
  font-size: 20px;
  margin: 0 0 30px 0;
  opacity: 0.9;
`;

export const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 60px;
  display: flex;
  gap: 10px;
`;

export const Indicator = styled.div`
  width: ${props => props.$active ? '30px' : '10px'};
  height: 10px;
  border-radius: 5px;
  background: ${props => props.$active ? '#EA580C' : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  transition: all 0.3s;
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  color: #1f2937;
  font-weight: 800;
`;

export const Divider = styled.div`
  flex: 1;
  height: 2px;
  background: #f3f4f6;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
`;

export const PerformanceImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const PerformanceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
`;

export const CategoryBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
`;

export const PerformanceTitle = styled.h3`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #111827;
`;

export const PerformanceText = styled.p`
  color: #6b7280;
  margin: 5px 0;
  font-size: 14px;
`;

export const PriceContainer = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.p`
  font-weight: 800;
  font-size: 20px;
  color: #EA580C;
  margin: 0;
`;

export const DetailLink = styled.span`
  color: #9ca3af;
  font-size: 14px;
`;

export const ReviewSection = styled.div`
  background: #f9fafb;
  margin: 0 -20px;
  padding: 60px 20px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const UserName = styled.span`
  font-weight: bold;
`;

export const StarRating = styled.span`
  color: #F59E0B;
`;

export const ReviewContent = styled.div`
  min-height: 60px;
  margin-bottom: 15px;
`;

export const ReviewText = styled.p`
  color: #4b5563;
  line-height: 1.6;
  font-size: 15px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ReviewFooter = styled.p`
  font-size: 13px;
  color: #EA580C;
  font-weight: 600;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
  margin: 0;
`;