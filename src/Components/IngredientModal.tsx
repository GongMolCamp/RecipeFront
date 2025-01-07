import React, { useState } from 'react';
import ModalInput from './ModalInput'; // ModalInput 컴포넌트를 import

type IngredientModalProps = {
    reftype: number;
    closeModal: () => void;
};

const IngredientModal: React.FC<IngredientModalProps> = ({ reftype, closeModal }) => {
    const inputTitles = [
        '육류',
        '해산물',
        '채소 및 과일류',
        reftype === 1 ? '유제품' : '간편식',
        reftype === 1 ? '조리된 음식 및 반찬' : '간식류',
        '기타'
    ];
    const [inputList, setInputList] = useState<string[]>([]);
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});

    const handleInputChange = (title: string, value: string) => {
        setInputs(prevInputs => ({ ...prevInputs, [title]: value }));
    };

    const handleButtonClick = async () => {
        const newList = Object.values(inputs).flatMap(input => input.split(',').map(item => item.trim()));
        setInputList(newList);
    
        try {
            for (const name of newList) {
                const response = await fetch('http://localhost:4000/services/ingredient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: 1, // 고정된 값
                        reftype: reftype, // reftype을 값으로 전송
                        name: name
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const responseData = await response.json();
                console.log(responseData);
            }
            alert('Ingredients added successfully');
            closeModal();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add ingredients');
        }
    };
    

    return (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-title'>
                    {reftype === 1 ? <div>냉동실</div> : <div>냉장실</div>}
                </div>
                <div className='modal-input-container'>
                    {inputTitles.map((title, index) => (
                        <ModalInput key={index} title={title} handleInputChange={handleInputChange} />
                    ))}
                </div>
                <div className='button-container'>
                    <button className='button' onClick={handleButtonClick}>추가하기</button>
                </div>
            </div>
        </div>
    );
};

export default IngredientModal;
