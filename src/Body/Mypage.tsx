import React, { useEffect, useState} from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useGlobal, useRefresh } from '../contexts/GlobalContext';

interface User {
    user_id: string;
    email: string;
    preference1: string;
    preference2: string;
    preference3: string;
}

const Mypage: React.FC = () => {
    const navigate = useNavigate();
    const { globalVariable, setGlobalVariable } = useGlobal();
    const { refresh, setRefresh} = useRefresh();
    const [ user, setUser] = useState<User | null>(null);

    const response = fetch('http://localhost:4000/services/user/mypage',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: globalVariable }),
    })
    .then((response) => {
        if(!response.ok){
            console.error('HTTP Error:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        setUser(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    

    return (
        <><div>
            <h1>마이페이지</h1>
        </div><div>{refresh ?
            (<div>
                <h2>{globalVariable}님 안녕하세요!</h2>
                <div>이메일: {user?.email}</div>
                <div>선호1: {user?.preference1}</div>
                <div>선호2: {user?.preference2}</div>
                <div>선호3: {user?.preference3}</div>

                <button onClick={() => { navigate('/'); } }>홈으로</button>
                </div>) :
            (<></>)}</div></>
        
    );
    
};

export default Mypage;