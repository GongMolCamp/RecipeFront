import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Popular.css';  // CSS 스타일을 따로 추가할 수 있습니다.


interface CardItemProps {
  name: string;
  img_src: string;
  
}

const FoodCardComponent : React.FC<CardItemProps> = (props) => {
  const navigate = useNavigate();
  
  return (
    <div className="card">
      <img
        src={props.name}
        className="card-image"
      />
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <button className="card-button" onClick={() => navigate("/recipeDetail")}>레시피 보러가기</button>
      </div>
    </div>
  );
}


export default FoodCardComponent;