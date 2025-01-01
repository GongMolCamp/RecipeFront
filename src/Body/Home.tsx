//메인 페이지
import React, { useState, useEffect } from 'react';
import '../CSS/Home.css';

const Home: React.FC = () => {
  return (
    <div className='Home'>
      <div className='Home-Title'><span className='Pink'>"냉장고를 부탁해"</span> 란?</div>
      <div className='Home-Content'>
        이 사이트는 사용자의 냉장고에 들어있는 재료들을 사용하여 
        다양한 요리법을 추천해주는 앱입니다. 사용자는 냉장고에 있는 재료를 입력하면,
        그 재료들로 만들 수 있는 요리법을 확인할 수 있습니다.
      </div>
      <div className='Home-Content'>
      <h3 className='Pink text-4xl'>앱 사용 방법:</h3>
        <ol>
          <li>1. 냉장고에 있는 재료를 입력한다.</li>
          <li>2. 입력한 재료를 바탕으로 추천 요리법을 확인한다.</li>
          <li>3. 마음에 드는 요리법을 선택하고 자세한 레시피를 확인한다.</li>
          <li>4. 레시피를 따라 요리를 완성한다.</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
