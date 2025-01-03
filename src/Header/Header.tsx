import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>('');

  const handleMenuClick = (path: string, menuName: string) => {
    setActiveMenu(menuName);
    navigate(path);
  };
  return (
    <div className='flex items-center justify-between Header'>
      <div className='text-5xl text-center Header-Logo' onClick={() => handleMenuClick('/', '')}>
        <p>냉장고를 부탁해</p>
      </div>
      <div className='Menu'>
        <div className={activeMenu === 'ingredient' ? 'active' : ''} onClick={() => handleMenuClick('/ingredient', 'ingredient')}>내취향 입력</div>
        <div className={activeMenu === 'recommend' ? 'active' : ''} onClick={() => handleMenuClick('/recommend', 'recommend')}>추천 레시피</div>
        <div className={activeMenu === 'popular' ? 'active' : ''} onClick={() => handleMenuClick('/popular', 'popular')}>인기 레시피</div>
        <div className={activeMenu === 'login' ? 'active' : ''} onClick={() => handleMenuClick('/login', 'login')}>로그인</div>
      </div>
    </div>
  );
};

export default Header;