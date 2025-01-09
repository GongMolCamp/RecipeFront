import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal, useRefresh } from '../contexts/GlobalContext';

const Mypage: React.FC = () => {
    return (
        <div>
            <h1>마이페이지입니다.</h1>
        </div>
    );
}

export default Mypage;