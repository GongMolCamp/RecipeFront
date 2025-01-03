import React from 'react';
import '../CSS/Popular.css';  // CSS 스타일을 따로 추가할 수 있습니다.
import FoodCardComponent from '../Components/FoodCardComponent';
import { API_key, API_SRC } from '../API/custom_search_api_service';

async function custom_search (name : string) {
  const response = await fetch(API_SRC + name);
  if (!response.ok) {
    console.log('Something went wrong!');
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  console.log(data);
  return '정보없음';
}

const Popular: React.FC = () => {
  const test_data = ['닭갈비', '샐러드', '피자', '돈까스', '스파게티', '라면', '감자탕', '냉면'];
  const test_data_list = test_data.map((name : string, idx : number) => (<FoodCardComponent name={name} img_src='정보없음'></FoodCardComponent>));
  //custom_search("닭갈비");
  //이미지 검색 추가.
  return (
    <div className="app-container">
      
      {/* 카드 레이아웃 */}
      <div className="card-container">
        {test_data_list}
      </div>
    </div>
  );
}

export default Popular;