import React, { useState } from 'react';

type IngredientDeleteModalProps = {
    reftype: number;
    closeModal: () => void;
    onDelete: (name: string) => void; // 삭제 콜백
};

const IngredientDeleteModal: React.FC<IngredientDeleteModalProps> = ({ reftype, closeModal, onDelete }) => {
    const [input, setInput] = useState<string>("");
    const handleInputChange = (text: string) => {
        setInput(text);
    }
    return (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-content'>
                <div className="modal-title">
                    {reftype === 3 ? <div>냉동실</div> : <div>냉장실</div>}
                </div>
                <div className="modal-message">
                    <label>
                        <input
                            className="w-full h-full border-none outline-none"
                            type="text"
                            value={input || ""}
                            onChange={(e)=>handleInputChange(e.target.value)}
                            placeholder={`추가할  적기`}
                        />
                    </label>
                </div>
                <div className="button-container">
                    <button className="button" onClick={() => onDelete(input)}>삭제하기</button>
                </div>
            </div>
        </div>
    );
};

export default IngredientDeleteModal;
