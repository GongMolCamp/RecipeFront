import React from 'react';

type IngredientModalProps = {
    reftype: number;
    closeModal: () => void;
}

const IngredientModal: React.FC<IngredientModalProps> = ({reftype , closeModal}) => {
  return (
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-title'> 
            {reftype === 1 ? <div className=''>냉동실</div> : '냉장실'}
        </div>
        <div className='modal-input'>
            재료
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;