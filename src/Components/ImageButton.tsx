import React, { useState, useEffect } from 'react';
import trans_liked from '../imgs/transparent_heart.png';
import liked from '../imgs/heart.png';
import { useQuery } from '@tanstack/react-query';
import { useGlobal, useRefresh } from '../contexts/GlobalContext';

interface ButtonProps {
  food: JSON;
  from : string;
}


// fetchlikedQuery 함수 정의
const fetchlikedQuery = async (userid: string, foodId: any) => {
  const response = await fetch('http://localhost:4000/services/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userid, food_id: foodId }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const return_val = await response.json();
  return return_val;
};

const ImageButton : React.FC<ButtonProps> = (props) => {
  const { globalVariable, setGlobalVariable } = useGlobal();
  
  const from = props.from;
  const item = JSON.parse(JSON.stringify(props.food));
  const foodId = item["food_id"];
  const [clicked, setCliked] = useState(false);
  const { refresh, setRefresh } = useRefresh();
/*
  const { data, error, isLoading, isError } = useQuery({
      queryKey: ['posts'],  // 데이터 캐시 키
      queryFn: () => fetchlikedQuery(userid, foodId), // 데이터를 가져오는 함수
    });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error: {error.message}</div>;
    }
  */
  useEffect(() => {
      // 비동기 작업을 useEffect 내에서 처리
      const loadImage = async () => {
        try {
          var result = await fetchlikedQuery(globalVariable, foodId);
          
          result = await JSON.parse(JSON.stringify(result));
          if (!result["item"]) setCliked(false);
          else setCliked(true);

        } catch (error) {
          console.error('좋아요 패치 실패:', error);
        }
      };
      loadImage();
    });
  
  const handleClick = async() => {

    
    
    if (clicked) {
      // 좋아요 누른 상태 => 좋아요 취소
      const response = await fetch('http://localhost:4000/services/like/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: globalVariable, food_id: foodId }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    }
    else {
      // 좋아요 누르지 않은 상태 => 좋아요 추가
      const response = await fetch('http://localhost:4000/services/like/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: globalVariable, food_id: foodId }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    }
    setCliked(!clicked);
    setRefresh(from);
  };

  return (
    <button onClick={async() => handleClick()} style={{ padding: 0, border: 'none', background: 'none'}}>
      <img 
        src= {clicked?liked:trans_liked}
        style={{ width: '40px', height: '40px'}} 
      />
    </button>
  );
}

export default ImageButton;
