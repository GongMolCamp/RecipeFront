import React from 'react';
import '../CSS/Popular.css';  // CSS 스타일을 따로 추가할 수 있습니다.

interface Food {
  item: JSON;
}


const FoodCardComponent : React.FC<Food> = (props) => {
  const foodname = JSON.parse(JSON.stringify(props.item))['food_name'];
  return (
    <div className="card">
      <img
        //src는 테스트 제외로 나중에 추가해주어야함.
        src="정보없음"
        className="card-image"
      />
      <div className="card-body">
        <h2 className="card-title">{foodname}</h2>
        <button className="card-button">레시피 보러가기</button>
      </div>
    </div>
  );
}


export default FoodCardComponent;