import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='Header flex justify-between items-center'>
      <div className='Header-Logo text-5xl text-center' onClick={() => navigate('/')}>
        <p>냉장고를 부탁해</p>
      </div>
      <div className='Menu'>
        <div onClick={() => navigate('/ingredient')}>내취향 입력</div>
        <div onClick={() => navigate('/recommend')}>추천 레시피</div>
        <div onClick={() => navigate('/popular')}>인기 레시피</div>
        <div onClick={() => navigate('/login')}>로그인</div>
      </div>
    </div>
  );
};

export default Header;