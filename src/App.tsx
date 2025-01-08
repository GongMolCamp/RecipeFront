import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import './CSS/Header.css';
import Home from './Body/Home';
import Ingredient from './Body/Ingredient';
import Login from './Body/Login';
import Join from './Body/Join';
import Popular from './Body/Popular';
import Taste from './Body/Taste';
import RecipeDetail from './Body/RecipeDetail';
import Recommend from './Body/Recommend';
import Mypage from './Body/Mypage';



const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const changeLogin = () => {
    setLogin(!login);
    
  };

  return (
      <BrowserRouter basename="/react-test">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ingredient' element={<Ingredient />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/taste' element={<Taste />} />
          <Route path='/recipeDetail' element={<RecipeDetail />} />
          <Route path='/recommend' element={<Recommend />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
