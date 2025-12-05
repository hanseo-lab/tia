// store/performanceStore.js
import { create } from 'zustand';

export const usePerformanceStore = create((set) => ({
  // 공연 데이터
  performances: [
    {
      id: 1,
      title: '2025 TIA 세계 태권도 공연',
      date: '2025.03.15',
      location: '서울 올림픽공원',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400',
      description: '전통과 현대가 만나는 특별한 태권도 공연',
      price: 50000,
      category: '대형공연'
    },
    {
      id: 2,
      title: '청소년 태권도 시범',
      date: '2025.04.20',
      location: '부산 벡스코',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      description: '미래의 태권도 꿈나무들의 열정적인 공연',
      price: 30000,
      category: '시범'
    },
    {
      id: 3,
      title: 'TIA 선교단 창단 기념공연',
      date: '2025.05.10',
      location: '대전 컨벤션센터',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
      description: '태권도를 통한 평화와 화합의 메시지',
      price: 40000,
      category: '기념공연'
    }
  ],
  
  // 후기 데이터
  reviews: [
    {
      id: 1,
      performanceId: 1,
      userId: 1,
      userName: '김태권',
      rating: 5,
      content: '정말 감동적인 공연이었습니다. 태권도의 아름다움을 느낄 수 있었어요!',
      date: '2025.02.15'
    },
    {
      id: 2,
      performanceId: 1,
      userId: 2,
      userName: '이선교',
      rating: 4,
      content: '기술적으로 완벽했고, 스토리텔링도 훌륭했습니다.',
      date: '2025.02.16'
    }
  ],
  
  // 예매 내역
  bookings: [],
  
  // 후기 추가
  addReview: (review) => set((state) => ({ 
    reviews: [...state.reviews, { ...review, id: Date.now() }] 
  })),
  
  // 예매 추가
  addBooking: (booking) => set((state) => ({ 
    bookings: [...state.bookings, { 
      ...booking, 
      id: Date.now(), 
      date: new Date().toISOString() 
    }] 
  })),
  
  // 후기 삭제
  deleteReview: (reviewId) => set((state) => ({ 
    reviews: state.reviews.filter(r => r.id !== reviewId) 
  }))
}));