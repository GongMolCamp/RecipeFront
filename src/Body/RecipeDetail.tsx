//레시피 디테일 페이지
import React, { useState, useEffect } from 'react';
import '../CSS/Detail.css';
import { useLocation } from 'react-router-dom';

const RecipeDetail: React.FC = () => {
  const {state} = useLocation();
  const {like, ingredient, recipe} = state;
  return (
    <div className='detail-container'>
      <div className='detail-title'>
        <div className='detail-title-name'>레시피 이름</div>
        <div className='detail-title-like'>{like}명이 좋아합니다</div>
      </div>
      <div className='detail-content'>
        <div className='detail-ingredient'>
          <div className='detail-ingredient-title'>필요한 재료</div>
          <div className='detail-ingredient-list'>{ingredient}</div>
        </div>
        <div className='detail-recipe'>
          <div className='detail-recipe-title'>레시피 순서</div>
          <div className='detail-recipe-list'>{recipe}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;