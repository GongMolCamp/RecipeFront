import React, {useState, useEffect} from 'react';
import '../CSS/Popular.css';
import FoodCardComponent from '../Components/FoodCardComponent';
import { useQuery } from '@tanstack/react-query';
import { useGlobal } from '../contexts/GlobalContext';
import { useRefresh } from '../contexts/GlobalContext';
const fetchPopularQuery = async () => {
  const response = await fetch('http://localhost:4000/services/food/popular');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

function usePopularQuery () {
  const { globalVariable, setGlobalVariable } = useGlobal();
  
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
  //console.log(typeof data);
  //console.log(data);
  const data_tmp = data["item"];
  const data_list = data_tmp.map(
    (item : JSON, idx : number) => 
      (<FoodCardComponent item={item} user_id={globalVariable}></FoodCardComponent>));
  return data_list;
}

const Popular: React.FC = () => {
  
  const { refresh, setRefresh } = useRefresh();
  if (refresh) {
    window.location.reload();
    setRefresh(false);
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