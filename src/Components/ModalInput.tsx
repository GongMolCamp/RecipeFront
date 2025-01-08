import React, { useState } from 'react';

type TextInputCompProps = {
    title: string;
    handleInputChange: (title: string, value: string) => void;
};

const TextInputComp: React.FC<TextInputCompProps> = ({ title, handleInputChange }) => {
    const [input, setInput] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        handleInputChange(title, event.target.value);
    };

    return (
        <div className='input-div'>
            <label>
                <div>
                    <input 
                        className='w-full h-full border-none outline-none' 
                        type="text" 
                        value={input} 
                        onChange={handleChange}
                        placeholder={`추가할 ${title} 적기`} 
                    />
                </div>
            </label>
        </div>
    );
};

type ModalInputProps = {
    title: string;
    handleInputChange: (title: string, value: string) => void;
};

const ModalInput: React.FC<ModalInputProps> = ({ title, handleInputChange }) => {
    return (
        <div className='modal-input'>
            <div className='input-title'>{title}</div>
            <TextInputComp title={title} handleInputChange={handleInputChange} />
        </div>
    );
};

export default ModalInput;
