//정보 수정
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import '../CSS/Join.css';

interface User {
    user_id: string;
    user_email: string;
    user_preference1: string;
    user_preference2: string;
    user_preference3: string;
}

const Join: React.FC = () => {
  const navigate = useNavigate();
  const [user_id, setuser_id] = useState<string>('');
  const [user_email, setuser_email] = useState<string>('');
  const [user_password, setuser_password] = useState<string>('');
  const [error, setError] = useState('');
  const [user_preference1, setuser_preference1] = useState<string>('');
  const [user_preference2, setuser_preference2] = useState<string>('');
  const [user_preference3, setuser_preference3] = useState<string>('');
  const [ user, setUser] = useState<User | null>(null);
  const { globalVariable, setGlobalVariable } = useGlobal();
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
          if (!globalVariable) return;
  
          const params = new URLSearchParams({user_id: globalVariable});
          fetch(`http://localhost:4000/services/user/update?${params.toString()}`,{
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
              setuser_id(globalVariable);
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

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    

    try {
      const response = await fetch('http://localhost:4000/services/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, user_password, user_email, user_preference1, user_preference2, user_preference3}), // 입력 데이터를 JSON으로 전달
      });

      if (!response.ok) {
        console.error('HTTP Error:', response.status); // 상태 코드 출력
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok && data.success) {
        alert('정보 수정 완료');
        navigate('/mypage'); // 마이페이지로 이동
      } else {
        setError(data.message || '수정 실패');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className='joincontainer'>
    <form className='joinform' onSubmit={handleUpdate}>
      <h1 className='jointitle'>내 정보</h1>
      <label>아이디</label>
      <div>{user?.user_id}</div>
      <br />
      <label>비밀번호</label>
      <input
        type="password"
        value={user_password}
        onChange={(e) => setuser_password(e.target.value)}
        placeholder="Enter your Password"
        required
      />
      <br />
      <label>이메일</label>
      <input
        type="email"
        value={user_email}
        onChange={(e) => setuser_email(e.target.value)}
        required
        placeholder={user?.user_email}
      />
      <br />
      <div className='userpreferneces'>
        <div className='userpreferneceslabels'>
          <label>음식 취향1</label>
          <select className='preferenceselect' id='dropdown1' name='user_preference1' value={user_preference1} onChange={(e) => setuser_preference1(e.target.value)} defaultValue={'한식'}>
            <option value=''>선택</option>
            <option value='한식'>한식</option>
            <option value='중식'>중식</option>
            <option value='일식'>일식</option>
            <option value='양식'>양식</option>
            <option value='기타'>기타</option>
          </select>
        </div>
        <br />
        <div className='userpreferneceslabels'>
          <label>음식 취향2</label>
          <select className='preferenceselect' id='dropdown2' name='user_preference2' value={user_preference2} onChange={(e) => setuser_preference2(e.target.value)} defaultValue={'중식'}>
            <option value=''>선택</option>
            <option value='한식'>한식</option>
            <option value='중식'>중식</option>
            <option value='일식'>일식</option>
            <option value='양식'>양식</option>
            <option value='기타'>기타</option>
          </select>
        </div>
        <br />
        <div className='userpreferneceslabels'>
          <label>음식 취향3</label>
          <select className='preferenceselect' id='dropdown3' name='user_preference3' value={user_preference3} onChange={(e) => setuser_preference3(e.target.value)} defaultValue={'일식'}>
            <option value=''>선택</option>
            <option value='한식'>한식</option>
            <option value='중식'>중식</option>
            <option value='일식'>일식</option>
            <option value='양식'>양식</option>
            <option value='기타'>기타</option>
          </select>
        </div>
        <br />
      </div>
      <button type="submit">정보 수정</button>
      <button className='backbutton' onClick={() => navigate('/mypage')}>뒤로가기</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>
  );
};

export default Join;
