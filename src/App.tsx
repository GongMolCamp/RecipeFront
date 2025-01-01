import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import './CSS/Header.css';
import Home from './Body/Home';
import Ingredient from './Body/Ingredient';
import Login from './Body/Login';
import Join from './Body/Join';
import Popular from './Body/Popular';
import Tast from './Body/Taste';
import RecipeDetail from './Body/RecipeDetail';
import Recommend from './Body/Recommend';

const App: React.FC = () => {
  const [page, setPage] = useState('home'); //디폴트 페이지는 home

  const GoHome = () => {setPage('home');}
  const GoIngre = () => {setPage('ingredient');}
  const GoLogin = () => {setPage('login');}
  const GoJoin = () => {setPage('join');}
  const GoPopular = () => {setPage('popular');}
  const GoTaste = () => {setPage('taste');}
  const GoRecipeDetail = () => {setPage('recipeDetail');}
  const GoRecommend = () => {setPage('recommend');}

  const renderBody = () =>{
    switch(page){
      case 'home':
        return <Home />;
      case 'ingredient':
        return <Ingredient />;
      case 'login':
        return <Login />;
      case 'join':
        return <Join />;
      case 'popular':
        return <Popular />;
      case 'taste':
        return <Tast />;
      case 'recipeDetail':
        return <RecipeDetail />;
      case 'recommend':
        return <Recommend />;
      default:
        return <Home />;
    }
  }
  return (
    <div>
      <Header GoHome={GoHome} GoTaste={GoTaste} GoRecommend={GoRecommend} GoPopular={GoPopular} GoLogin={GoLogin} />
      {renderBody()}
    </div>
  );
};

export default App;
