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
    
    return (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-title'>
                    {reftype === 1 ? <div>냉동실</div> : <div>냉장실</div>}
                </div>
                <div className='modal-input-container'>
                    {inputTitles.map((title, index) => (
                        <ModalInput key={index} title={title}/>
                    ))}
                </div>
                <div className='button-container'>
                    <button className='button' >추가하기</button>
                </div>
            </div>
        </div>
    );
};

export default IngredientModal;
