import React, {JSX} from 'react';

type FullIngredientModalProps = {
    reftype: number;
    refdata: JSX.Element[];
    closeModal : () => void;
}

const FullIngredientModal:React.FC<FullIngredientModalProps> = ({reftype, refdata, closeModal}) =>{
    return (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation}>
                <div className="modal-title">
                    {reftype === 1 ? <div>냉동실</div> : <div>냉장실</div>}
                </div>
                <div className='p-8 refdata-container'>
                    {refdata}
                </div>
            </div>
        </div>
    );
}

export default FullIngredientModal;