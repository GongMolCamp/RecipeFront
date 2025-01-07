import React, { useState, useEffect } from 'react';
import '../CSS/Ingredient.css';
import IngredientModal from '../Components/IngredientModal';
import { useQuery } from '@tanstack/react-query';

const fetchIngredientQuery = async () => {
  const response = await fetch('http://localhost:4000/services/ingredient?id=1'); // id 파라미터 추가
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

type IngredientDetailProps = {
  item: JSON;
};
const IngredientDetail: React.FC<IngredientDetailProps> = (props) => {
  const ingredient_name = JSON.parse(JSON.stringify(props.item))["ingredient_name"]
  return <div>{ingredient_name}</div>;
};

const Ingredient: React.FC = () => {
  const [modal, setModal] = useState<number>(0);
  const openModal = (reftype: number) => {
    setModal(reftype);
  };
  const closeModal = () => {
    setModal(0);
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['posts'], // 데이터 캐시 키
    queryFn: fetchIngredientQuery, // 데이터를 가져오는 함수
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const ingredient_list = data["item"].map((item: JSON) => <IngredientDetail item={item} />);

  const renderModal = () => {
    switch (modal) {
      case 0:
        return <></>;
      case 1:
        return <IngredientModal closeModal={closeModal} reftype={modal} />;
      case 2:
        return <IngredientModal closeModal={closeModal} reftype={modal} />;
      default:
        return <></>;
    }
  };

  return (
    <div>
      {renderModal()}
      <div className='Ingredient-container'>
        <div className='refrigerator'>
          <div className='refrigerator-top' onClick={() => openModal(1)}>
            <span>냉동실</span>
            <span>재료추가</span>
          </div>
          <div className='refrigerator-bottom' onClick={() => openModal(2)}>
            <span>냉장실</span>
            <span>재료추가</span>
          </div>
        </div>
        <div className='ingredient'>
          <div className='ingredient-top'>{ingredient_list}</div>
          <div className='ingredient-bottom'>냉장 재료</div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;