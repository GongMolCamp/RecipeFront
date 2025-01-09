import React, {useState} from 'react';
import '../CSS/Popular.css';  // CSS 스타일을 따로 추가할 수 있습니다.
import ImageButton from './ImageButton';
interface Food {
  item: JSON;
  
  from : string;
  
}


const FoodCardComponent : React.FC<Food> = (props) => {
  const data = JSON.parse(JSON.stringify(props.item));
  const foodname =  data['food_name'];
  const foodsrc = data['food_image_src'];
  const from = props.from;


  return (
    <div className="card">
      <img
        //src는 테스트 제외로 나중에 추가해주어야함.
        src={foodsrc}
        className="card-image"
      />
      <div className="card-body">
        <div className="card-side">
          <h2 className="card-title">{foodname}</h2>
          <div className='card-like-part'>
            <h2 className="liked-title">{data["food_liked"]}</h2>
            <ImageButton food={data} from={from}></ImageButton>
          </div>
        </div>
        <button onClick={()=>{}} className="card-button">레시피 보러가기</button>
      </div>ㄴ
    </div>
  );
}


export default FoodCardComponent;