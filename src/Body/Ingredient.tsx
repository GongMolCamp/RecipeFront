import React, { useState, useEffect, JSX } from 'react';
import '../CSS/Ingredient.css';
import IngredientInputModal from '../Components/IngredientInputModal';
import IngredientDeleteModal from '../Components/IngredientDeleteModal';
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
  const ingredient_name = JSON.parse(JSON.stringify(props.item))["ingredient_name"];
  return <div className='ingredient-detail'>{ingredient_name}</div>;
};

const Ingredient: React.FC = () => {
  const [modal, setModal] = useState<number>(0);
  const [ingredientTopList, setTopList] = useState<JSX.Element[]>([]);
  const [ingredientBottomList, setBottomList] = useState<JSX.Element[]>([]);
  const [data, setData] = useState<any>(null); // 데이터를 상태로 관리
  const [userid, serId] = useState<string>("1");

  const openModal = (reftype: number) => {
    setModal(reftype);
  };
  const closeModal = () => {
    setModal(0);
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`http://localhost:4000/services/ingredient?id=${userid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (data) {
      const topList = data["item"]
        .filter((item: any) => item["ingredient_type"] === 1)
        .map((item: any) => (
          <IngredientDetail 
            key={item["ingredient_id"]}
            item={item} 
          />
        ));
      setTopList(topList);

      const bottomList = data["item"]
        .filter((item: any) => item["ingredient_type"] === 2)
        .map((item: any) => (
          <IngredientDetail 
            key={item["ingredient_id"]}
            item={item} 
          />
        ));
      setBottomList(bottomList);
    }
  }, [data]);

  const handleDataUpdate = () => {
    fetchIngredients(); // 데이터를 다시 fetch
  };

  const handleDelete = async (name: string) => {
    try {
        const response = await fetch('http://localhost:4000/services/ingredient', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userid, // 고정된 값
                reftype: modal, // 현재 모달의 타입
                name: name,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('재료가 삭제되었습니다.');
        handleDataUpdate(); // 데이터 업데이트 요청
        closeModal();
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        alert('삭제에 실패했습니다.');
    }
};

  const renderModal = () => {
    switch (modal) {
      case 0:
        return <></>;
      case 1:
      case 2:
        return (
          <IngredientInputModal 
            userid = {userid}
            closeModal={closeModal} 
            reftype={modal} 
            onUpdate={handleDataUpdate} // 데이터 업데이트 콜백 전달
          />
        );
      case 3:
      case 4:
        return (
          <IngredientDeleteModal 
              closeModal={closeModal} 
              reftype={modal} 
              onDelete={handleDelete} // 삭제 콜백 전달
          />
        );
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
          <div className='ingredient-top'>
            {ingredientTopList}
            <div className='dot'>...</div>  
            <div className='delete' onClick={() => openModal(3)} >삭제하기</div>
          </div>
          <div className='ingredient-bottom'>
            {ingredientBottomList}
            <div className='dot'>...</div>  
            <div className='delete' onClick={() => openModal(4)} >삭제하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Ingredient;