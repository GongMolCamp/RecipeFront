
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import '../CSS/Popular.css';
import FoodCardComponent from '../Components/FoodCardComponent';
import { API_SRC } from '../API/custom_search_api_service';

const fetchFoodData = async (name: string) => {
  const response = await fetch(`${API_SRC}${name}`);
  if (!response.ok) {
    console.log('Something went wrong!');
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  return data;
};

const Popular: React.FC = () => {
  const test_data = ['닭갈비', '샐러드', '피자', '돈까스', '스파게티', '라면', '감자탕', '냉면', '짜장'];

  const { data, isLoading, error } = useQuery({
    queryKey: ['foodData'],
    queryFn: async () => {
      const results = await Promise.all(test_data.map(fetchFoodData));
      return results;
    },
  });

  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;

  // 에러 상태 처리
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const foodCardList = test_data.map((name, idx) => (
    <FoodCardComponent
      key={idx}
      name={name}
      img_src={(data && data[idx]?.image) || '정보없음'}
    />
  ));

  return (
    <div className="app-container">
      {/* 카드 레이아웃 */}
      <div className="card-container">{foodCardList}</div>
    </div>
  );
};

export default Popular;
