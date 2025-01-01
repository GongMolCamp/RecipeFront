import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';

type HeaderProps = {
  GoHome: () => void;
  GoTaste: () => void;
  GoRecommend: () => void;
  GoPopular: () => void;
  GoLogin: () => void;
}

const Header: React.FC<HeaderProps> = (
  {GoHome, GoTaste, GoRecommend, GoPopular, GoLogin}
) => {
  return (
    <div className='Header flex justify-between items-center'>
      <div className='Header-Logo text-5xl text-center' onClick={GoHome}>
        <p>냉장고를 부탁해</p>
      </div>
      <div className='Menu'>
        <div onClick={GoTaste}>내취향 입력</div>
        <div onClick={GoRecommend}>추천 레시피</div>
        <div onClick={GoPopular}>인기 레시피</div>
        <div onClick={GoLogin}>로그인</div>
      </div>
    </div>
  );
};

export default Header;