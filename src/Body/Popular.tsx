import React, {useState, useEffect} from 'react';
import '../CSS/Popular.css';
import FoodCardComponent from '../Components/FoodCardComponent';
import { useQuery } from '@tanstack/react-query';
import { useRefresh } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
const fetchPopularQuery = async () => {
  
  const response = await fetch('http://localhost:4000/services/food/popular');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function usePopularQuery () {
  
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['popular'],  // 데이터 캐시 키
    queryFn: fetchPopularQuery, // 데이터를 가져오는 함수
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const data_tmp = data["item"];
  const data_list = data_tmp.map(
    (item : JSON, idx : number) => 
      (<FoodCardComponent item={item} from="popular"></FoodCardComponent>));
  return data_list;
}

const Popular: React.FC = () => {
  const navigate = useNavigate();
  const { refresh, setRefresh } = useRefresh();
  if (refresh) {
    navigate(0);
    setRefresh("");
  }
  var popular_list = usePopularQuery();
  
  return (
    <div className="app-container">
      
      {/* 카드 레이아웃 */}
      <div className="card-container">
        {popular_list}
      </div>
    </div>
  );
}

export default Popular;