import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
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

  const location_session_data = sessionStorage.getItem("LocationData");
  const location_data = location_session_data === null ? '' : location_session_data;
  useEffect(() => {
    setActiveMenu(location_data);
    console.log(location_data);
  }, [location_data]);

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
      sessionStorage.removeItem("user_id");
      setGlobalVariable('');
      //setRefresh(false);
    }
  }
  
  return (
    <div className='flex items-center justify-between Header'>
      <div className='LogoContainer' onClick={() => handleMenuClick('/', '')}>
        <img className='w-64' src={img} alt="냉장고를 부탁해 로고" />
        <p className='text-5xl text-center Header-Logo'>냉장고를 부탁해</p>
      </div>
      <div className='Menu'>
        {
          globalVariable ==='' ? (
            <>
            <div className={
              activeMenu === 'ingredient' ? 'active' : 'non-active'}></div>
            <div className={
              activeMenu.slice(0, 9) == 'recommend' || activeMenu == 'taste' ? 'active' : 'non-active'} ></div>
            </>
          )
          : (
            <>
            <div className={
              activeMenu === 'ingredient' ? 'active' : 'non-active'} 
              onClick={() => handleMenuClick('/ingredient', 'ingredient')}>재료입력</div>
            <div className={
              activeMenu.slice(0, 9) == 'recommend' || activeMenu == 'taste' ? 'active' : 'non-active'} 
              onClick={() => handleMenuClick('/taste', 'taste')}>추천 레시피 받기</div>
            </>
          )
        }
        <div className={
              activeMenu.slice(0, 7) === 'popular' ? 'active' : 'non-active'} 
              onClick={() => handleMenuClick('/popular', 'popular')}>인기 레시피</div>
        <div>
          {
            globalVariable!='' ? 
              (<div className='flex h-[100%]'>
                <div className={activeMenu === 'mypage' ? 'active' : 'non-active'} onClick={() => handleLoginClick('/mypage', 'mypage')}>마이페이지</div>
              </div>
              ) : 
              (<div className={activeMenu === 'login' ? 'active' : 'non-active'} onClick={() => handleLoginClick('/login', 'login')}>로그인</div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Header;