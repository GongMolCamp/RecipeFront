import React from 'react';
type IngredientDeleteModalProps = {
    reftype: number;
    closeModal: () => void;
}
const IngredientDeleteModal:React.FC<IngredientDeleteModalProps> = ({reftype, closeModal}) =>{
    return <div className='modal-overlay' onClick={closeModal}>
        <div className='modal-content'>
            <div className="modal-title">
            {reftype === 3 ? <div>냉동실</div> : <div>냉장실</div>}
            </div>
            <div className="button-container">
                <button className="button">삭제하기</button>
            </div>
        </div>
    </div>;
}

export default IngredientDeleteModal;