import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal, useRefresh } from '../contexts/GlobalContext';
import '../CSS/Header.css';
import img from '../imgs/logo.png';


type HeaderProps = {
  login: boolean;
  changeLogin: () => void;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>('');
  const { globalVariable, setGlobalVariable } = useGlobal();
  const { refresh, setRefresh} = useRefresh();

  const handleMenuClick = (path: string, menuName: string) => {
    setActiveMenu(menuName);
    navigate(path);
  };
  const handleLoginClick = (path: string, menuName: string) => {
    setActiveMenu(menuName);
    navigate(path);
  };
  const logout = () => {
    const result = window.confirm('로그아웃 하시겠습니까??');
    if(result){
      alert('로그아웃 되었습니다.');
      setGlobalVariable('');
      //setRefresh(false);
    }
  }
  
  return (
    <div className='flex items-center justify-between Header'>
      <div className='LogoContainer' onClick={() => handleMenuClick('/', '')}>
        <img className='w-64' src={img} alt="냉장고를 부탁해 로고" />
        <p className='text-5xl text-center Header-Logo'>냉장고를 부탁해</p>
        {
        globalVariable!='' ? (<p>{globalVariable}님, 안녕하세요</p>) :(null)
        }
        
      </div>
      <div className='Menu'>
        <div className={activeMenu === 'ingredient' ? 'active' : 'non-active'} onClick={() => handleMenuClick('/ingredient', 'ingredient')}>재료입력</div>
        <div className={activeMenu === 'taste' ? 'active' : 'non-active'} onClick={() => handleMenuClick('/taste', 'taste')}>추천 레시피 받기</div>
        <div className={activeMenu === 'popular' ? 'active' : 'non-active'} onClick={() => handleMenuClick('/popular', 'popular')}>인기 레시피</div>

        <div>
          {
            globalVariable!='' ? 
              (<div className='flex h-[100%]'>
                <div className={activeMenu === 'login' ? 'mypage active' : 'mypage non-active'} onClick={() => handleLoginClick('/mypage', 'login')}>마이페이지</div>
                <div className={activeMenu === 'login' ? 'mypage active' : 'mypage non-active'} onClick={() => logout()}>로그아웃</div>
              </div>
              ) : 
              (<div className={activeMenu === 'login' ? 'login active' : 'login non-active'} onClick={() => handleLoginClick('/login', 'login')}>로그인</div>)
          }
        </div>

        {/* <div>
          {
            refresh ? 
              (<div className={activeMenu === 'login' ? 'mypage active' : 'mypage non-active'} onClick={() => handleLoginClick('/mypage', 'mypage')}>내 정보</div>) : 
              (<div className={activeMenu === 'login' ? 'login active' : 'login non-active'} onClick={() => handleLoginClick('/login', 'login')}>로그인</div>)
          }
        </div> */}
        
        
      </div>
    </div>
  );
};

export default Header;

/* 로그인 후 마이페이지,로그아웃 버튼 추가
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

*/