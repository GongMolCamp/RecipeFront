//레시피 디테일 페이지
import React, { useState, useEffect } from 'react';
import '../CSS/Detail.css';

const RecipeDetail: React.FC = () => {
  return (
    <div className='detail-container'>
      <div className='detail-title'>
        <div className='detail-title-name'>레시피 이름</div>
        <div className='detail-title-like'>x명이 좋아합니다</div>
      </div>
      <div className='detail-content'>
        <div className='detail-ingredient'>
          <div className='detail-ingredient-title'>필요한 재료</div>
          <div className='detail-ingredient-list'>재료 리스트</div>
        </div>
        <div className='detail-recipe'>
          <div className='detail-recipe-title'>레시피 순서</div>
          <div className='detail-recipe-list'>레시피 ...</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

/*
<div className='detail-content'>
  <div className='detail-ingredient'>
    <div className='detail-ingredient-title'>필요한 재료</div>
    <div className='detail-ingredient-list'>재료 리스트</div>
  </div>
  <div className='detail-recipe'>
    <div className='detail-recipe-title'>레시피 순서</div>
    <div className='detail-recipe-list'>레시피 ...</div>
  </div>
</div>
*/