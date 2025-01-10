import { useState } from "react";

type IngredientInputModalProps = {
    userid: string
    reftype: number;
    closeModal: () => void;
    onUpdate: () => void; // 데이터 업데이트 콜백
};

const IngredientModal: React.FC<IngredientInputModalProps> = ({ userid, reftype, closeModal, onUpdate }) => {
    const inputTitles = [
        '육류',
        '해산물',
        '채소 및 과일류',
        reftype === 1 ? '유제품' : '간편식',
        reftype === 1 ? '조리된 음식 및 반찬' : '간식류',
        '기타'
    ];
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});

    // 입력값 변경 핸들러
    const handleInputChange = (title: string, value: string) => {
        setInputs(prevInputs => ({ ...prevInputs, [title]: value }));
    };

    // 버튼 클릭 핸들러 (데이터 전송)
    const handleButtonClick = async () => {
        const newList = Object.values(inputs)
            .flatMap(input => input.split(',').map(item => item.trim()))
            .filter(name => name); // 빈 문자열 제거

        try {
            for (const name of newList) {
                const response = await fetch('http://localhost:4000/services/ingredient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: userid,
                        reftype: reftype,
                        name: name,
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.error === 'Duplicate entry') {
                        alert(`'${name}'은(는) 이미 추가된 항목입니다.`);
                    } else {
                        throw new Error('Unknown error');
                    }
                    continue; // 다음 항목으로 진행
                }
            }
            alert('Ingredients added successfully');
            onUpdate(); // 상위 컴포넌트에 데이터 업데이트 요청
            closeModal();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add ingredients');
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    {reftype === 1 ? <div>냉동실</div> : <div>냉장실</div>}
                </div>
                <div className="modal-input-container">
                    {inputTitles.map((title, index) => (
                        <div className="modal-input" key={index}>
                            <div className="input-title">{title}</div>
                            <div className="input-div">
                                <label>
                                    <input
                                        className="w-full h-full border-none outline-none"
                                        type="text"
                                        value={inputs[title] || ""}
                                        onChange={(e) => handleInputChange(title, e.target.value)}
                                        placeholder={`추가할 ${title} 적기`}
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-button-container">
                    <button className="input-button" onClick={handleButtonClick}>추가하기</button>
                </div>
            </div>
        </div>
    );
};

export default IngredientModal;
