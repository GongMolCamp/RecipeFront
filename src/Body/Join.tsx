//회원가입 페이지
import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../CSS/Join.css';

const Join: React.FC = () => {
  const navigate = useNavigate();
  const [user_id, setuser_id] = useState('');
  const [user_email, setuser_email] = useState('');
  const [user_password, setuser_password] = useState('');
  const [error, setError] = useState('');
  const [user_preference1, setuser_preference1] = useState('');
  const [user_preference2, setuser_preference2] = useState('');
  const [user_preference3, setuser_preference3] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/user/join', {
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
        alert('회원가입 성공');
        navigate('/'); // 홈으로 이동
      } else {
        setError(data.message || '회원가입 실패');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className='joincontainer'>
    <form className='joinform' onSubmit={handleRegister}>
      <h1 className='jointitle'>회원가입</h1>
      <label>아이디</label>
      <input
        type="text"
        value={user_id}
        onChange={(e) => setuser_id(e.target.value)}
        placeholder="Enter your ID"
        required
      />
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
        placeholder="Enter your Email"
        required
      />
      <br />
      <div className='userpreferneces'>
        <div className='userpreferneceslabels'>
          <label>음식 취향1</label>
          <select className='preferenceselect' id='dropdown' name='user_preference1' value={user_preference1} onChange={(e) => setuser_preference1(e.target.value)}>
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
          <select className='preferenceselect' id='dropdown' name='user_preference1' value={user_preference2} onChange={(e) => setuser_preference2(e.target.value)}>
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
          <select className='preferenceselect' id='dropdown' name='user_preference1' value={user_preference3} onChange={(e) => setuser_preference3(e.target.value)}>
            <option value='한식'>한식</option>
            <option value='중식'>중식</option>
            <option value='일식'>일식</option>
            <option value='양식'>양식</option>
            <option value='기타'>기타</option>
          </select>
        </div>
        <br />
      </div>
      <button type="submit">회원가입</button>
      <button className='backbutton' onClick={() => navigate('/')}>뒤로가기</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>
  );
};

export default Join;
