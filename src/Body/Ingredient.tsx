import React, { useState, useEffect, JSX } from 'react';
import '../CSS/Ingredient.css';
import IngredientInputModal from '../Components/IngredientInputModal';
import FullIngredientModal from '../Components/FullIngredientModal';
import { useGlobal } from '../contexts/GlobalContext';


type IngredientDetailProps = {
  item: JSON;
  fetch : () => void
};

const IngredientDetail: React.FC<IngredientDetailProps> = (props) => {
  const ingredient_name = JSON.parse(JSON.stringify(props.item))["ingredient_name"];
  const handleDelete = async () => {
    const confirmed:boolean = window.confirm("삭제하시겠습니까?");
    if(confirmed){
      try{
        const response = await fetch('http://localhost:4000/services/ingredient', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: JSON.parse(JSON.stringify(props.item))["ingredient_id"] ,
              reftype: JSON.parse(JSON.stringify(props.item))["ingredient_type"] ,
              name: ingredient_name,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
      } catch(error){
        console.error('Error:', error);
        alert("삭제가 정상적으로 되지 않았습니다.");
      }
      props.fetch();
      alert("삭제되었습니다.");
    }else{
      alert("삭제가 취소되었습니다.");
    }
  }
  return <div className='ingredient-detail' onClick={handleDelete}>{ingredient_name}</div>;
};

const Ingredient: React.FC = () => {
  const [modal, setModal] = useState<number>(0);
  const [ingredientTopList, setTopList] = useState<JSX.Element[]>([]);
  const [ingredientBottomList, setBottomList] = useState<JSX.Element[]>([]);
  const [data, setData] = useState<any>(null); // 데이터를 상태로 관리
  const { globalVariable, setGlobalVariable } = useGlobal();
  const openModal = (reftype: number) => {
    setModal(reftype);
  };
  const closeModal = () => {
    setModal(0);
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`http://localhost:4000/services/ingredient?id=${globalVariable}`);
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
    if (data && data.length > 0) {
      const topList = data["item"]
        .filter((item: any) => item["ingredient_type"] === 1)
        .map((item: any) => (
          <IngredientDetail 
            key={globalVariable}
            item={item} 
            fetch = {fetchIngredients}
          />
        ));
      setTopList(topList);

      const bottomList = data["item"]
        .filter((item: any) => item["ingredient_type"] === 2)
        .map((item: any) => (
          <IngredientDetail 
            key={globalVariable}
            item={item} 
            fetch = {fetchIngredients}
          />
        ));
      setBottomList(bottomList);
    }
    else {
      setTopList([<div className='flex justify-center'>로그인하세요</div>])
      setBottomList([<div className='flex justify-center'>로그인하세요</div>])
    }
  }, [data]);

  const handleDataUpdate = () => {
    fetchIngredients(); // 데이터를 다시 fetch
  };

  const renderModal = () => {
    switch (modal) {
      case 0:
        return <></>;
      case 1:
      case 2:
        return (
          <IngredientInputModal 
            key={globalVariable}
            userid = {globalVariable}
            closeModal={closeModal} 
            reftype={modal} 
            onUpdate={handleDataUpdate} // 데이터 업데이트 콜백 전달
          />
        );
      case 3:
      case 4:
        return (
          <FullIngredientModal 
            key={globalVariable}
            reftype = {modal-2} 
            refdata = {ingredientTopList} 
            closeModal={closeModal}/>);
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
        <div className='ingredient-container'>
          <div className='top-ingredient'>
            {ingredientTopList}
            <div className='dot' onClick={() => openModal(3)}>...</div>  
          </div>
          <div className='bottom-ingredient'>
            {ingredientBottomList}
            <div className='dot' onClick={() => openModal(4)}>...</div>  
          </div>
        </div>
      </div>
    </div>
  );
};



export default Ingredient;