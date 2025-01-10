import React, { useEffect, useState} from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useGlobal, useRefresh } from '../contexts/GlobalContext';
import '../CSS/Mypage.css';

interface User {
    user_id: string;
    user_email: string;
    user_preference1: string;
    user_preference2: string;
    user_preference3: string;
}

const Mypage: React.FC = () => {
    const navigate = useNavigate();
    const { globalVariable, setGlobalVariable } = useGlobal();
    const [ user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        alert('로그아웃 되었습니다.');
        sessionStorage.removeItem("user_id");
        setGlobalVariable('');
        navigate('/');
    }

    useEffect(()=>{
        if (!globalVariable) return;

        const params = new URLSearchParams({user_id: globalVariable});
        fetch(`http://localhost:4000/services/user/mypage?${params.toString()}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if(!response.ok){
                console.error('HTTP Error:', response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setUser(data.data[0]);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setLoading(false);
          });
    },[globalVariable]);

    if (loading) {
        return <p>로딩 중...</p>;
      }
    
      if (!globalVariable) {
        return <p>로그인이 필요합니다.</p>;
      }
    
    

    return (
        
        <><div>{globalVariable ?
            (
                <div className='mypage-body'>
                <div className="mypage-container">
                <div className="mypage-header">
                <h1>마이페이지</h1>
                </div>
                <div className="mypage-content">
                <h2>{globalVariable}님 안녕하세요!</h2>
                <div className="user-info">
                    <p><strong>이메일: </strong>{user?.user_email}</p>
                    <p><strong>선호1: </strong>{user?.user_preference1}</p>
                    <p><strong>선호2: </strong>{user?.user_preference2}</p>
                    <p><strong>선호3: </strong>{user?.user_preference3}</p>
                </div>
                <div className="mypage-buttons">
                    <button className="update-btn" onClick={()=>{navigate('/update')}}>정보수정</button>
                    <button className="logout-btn" onClick={()=>logout()}>로그아웃</button>
                    <button className="home-btn" onClick={()=>{navigate('/');}}>홈으로</button>
                </div>
                </div>
            </div>
            </div>
                ) :
            (<></>)}</div></>
        
    );
    
};

export default Mypage;