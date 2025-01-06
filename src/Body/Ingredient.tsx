//냉장고 재료 입력 페이지
import React, { useState, useEffect } from 'react';
import '../CSS/Ingredient.css';
import IngredientModal from '../Components/IngredientModal';

const fetchIngredientQuery = async () => {
  const response = await fetch('http://localhost:4000/services/food/ingredient');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Ingredient: React.FC = () => {
  const [modal, setModal] = useState<number>(0);

  const openModal = (reftype : number) => {
    setModal(reftype);
  }
  const closeModal = () => {
    setModal(0);
  }

  const renderModal = () => {
    switch (modal) {
      case 0 : 
        return <></>;
      case 1:
        return <IngredientModal closeModal={closeModal} reftype={modal}/>;
      case 2:
        return <IngredientModal closeModal={closeModal} reftype={modal}/>;
      default:
        return <></>;
    }
  }

  return (
    <div>
      {renderModal()}
      <div className='Ingredient-container'>
      <div className='refrigerator'>
        <div className='refrigerator-top' onClick={() => openModal(1)}><span>냉동실</span><span>재료추가</span></div>
        <div className='refrigerator-bottom' onClick={() => openModal(2)}><span>냉장실</span><span>재료추가</span></div>
      </div>
      <div className='ingredient'>
        <div className='ingredient-top'>냉동 재료</div>
        <div className='ingredient-bottom'>냉장 재료</div>
      </div>
    </div>
    </div>
    
  );
};

export default Ingredient;

