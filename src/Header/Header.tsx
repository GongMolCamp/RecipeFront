import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Header.css';

type HeaderProps = {
  login: boolean;
  changeLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({login,changeLogin}) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>('');

  const handleMenuClick = (path: string, menuName: string) => {
    setActiveMenu(menuName);
    navigate(path);
  };
  const handleLoginClick = (path: string, menuName: string) => {
    setActiveMenu(menuName);
    navigate('/');
    changeLogin();
  };
  
  return (
    <div className='flex items-center justify-between Header'>
      <div className='text-5xl text-center Header-Logo' onClick={() => handleMenuClick('/', '')}>
        <p>냉장고를 부탁해</p>
      </div>
      <div className='Menu'>
        <div className={activeMenu === 'ingredient' ? 'active' : 'non-active'} onClick={() => handleMenuClick('/ingredient', 'ingredient')}>내취향 입력</div>
        <div className={activeMenu === 'recommend' ? 'active' : 'non-active'} onClick={() => handleMenuClick('/recommend', 'recommend')}>추천 레시피</div>
        <div className={activeMenu === 'popular' ? 'active' : 'non-active'} onClick={() => handleMenuClick('/popular', 'popular')}>인기 레시피</div>
        <div>
          {
            login ? 
              (<div className='flex h-[100%]'>
                  <div className={activeMenu === 'login' ? 'mypage active' : 'mypage non-active'} onClick={() => handleLoginClick('/login', 'login')}>마이페이지</div>
                  <div className={activeMenu === 'login' ? 'mypage active' : 'mypage non-active'} onClick={() => handleLoginClick('/login', 'login')}>로그아웃</div>
              </div>
              ) : 
              (<div className={activeMenu === 'login' ? 'login active' : 'login non-active'} onClick={() => handleLoginClick('/login', 'login')}>로그인</div>)
          }
        </div>
        
        
      </div>
    </div>
  );
};

export default Header;