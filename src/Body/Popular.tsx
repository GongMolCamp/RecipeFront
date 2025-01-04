import React from 'react';
import '../CSS/Popular.css';
import FoodCardComponent from '../Components/FoodCardComponent';
import { useQuery } from '@tanstack/react-query';

const fetchPopularQuery = async () => {
  const response = await fetch('http://localhost:4000/services/food/popular');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Popular: React.FC = () => {

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['posts'],  // 데이터 캐시 키
    queryFn: fetchPopularQuery, // 데이터를 가져오는 함수
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  
  const data_list = data['item'].map(
    (item : JSON, idx : number) => 
      (<FoodCardComponent item={item}></FoodCardComponent>));
  return (
    <div className="app-container">
      
      {/* 카드 레이아웃 */}
      <div className="card-container">
        {data_list}
      </div>
    </div>
  );
}

export default Popular;