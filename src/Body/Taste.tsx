//취향 입력 페이지
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import '../CSS/Taste.css';
import { useNavigate } from 'react-router-dom';

const Taste: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");  // 상태의 타입을 string으로 지정
  const navigate = useNavigate();
  
  sessionStorage.setItem('locationData', "recommend");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const pageNavigate = () => {
    sessionStorage.removeItem("rrr");
    navigate('/recommend', {state : {preference : inputValue}});
  };

  return (
    <div>
      <div className='Ingredient-container'>
        <div className='ingredient'>
          <div className='ingredient-top'>오늘 어떤 음식을 먹고싶은지 설명해주세요!</div>
          <div className='ingredient-bottom'>
              <input
                type="text"
                className="input-field"
                value={inputValue}
                onChange={handleChange}
                placeholder="여기에 입력하세요"
              />
              <button 
                onClick={pageNavigate} 
                className='button'>
                  <div className='button-text'>추천 받기</div>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Taste;