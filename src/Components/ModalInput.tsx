import { hasSubscribers } from 'diagnostics_channel';
import React,{useState} from 'react';

type TextInputCompProps = {
}

const TextInputComp:React.FC<TextInputCompProps> = ({}) => {
    
    const [input,setInput] = useState<string>("");
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); //페이지 리로드 방지
        //여기에 입력값 처리해주는 구간
        console.log(input);
    }

    return (
        <form onSubmit={handleSubmit} className='input-div'>
            <label>
                <div>
                    <input 
                        className='w-full h-full border-none outline-none' 
                        type="text" 
                        value={input} 
                        onChange={handleInputChange}
                        placeholder="추가할 재료 적기" 
                    />
                </div>
            </label>
        </form>
    )
}

type ModalInputProps = {
    title: string;
};

const ModalInput: React.FC<ModalInputProps> = ({ title }) => {
    return (
        <div className='modal-input'>
            <div className='input-title'>{title}</div>
            <TextInputComp />
        </div>
    );
};

export default ModalInput;
