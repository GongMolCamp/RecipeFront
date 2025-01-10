// src/contexts/GlobalContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 전역 상태의 타입 정의
interface GlobalContextType {
  globalVariable: string;
  setGlobalVariable: (value: string) => void;
}

// 기본값은 undefined로 설정하여 제공자가 없으면 에러를 발생시킵니다.
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 전역 상태의 타입 정의
interface GlobalContext1Type {
  refresh: string;
  setRefresh: (value: string) => void;
}

// 기본값은 undefined로 설정하여 제공자가 없으면 에러를 발생시킵니다.
const GlobalContext1 = createContext<GlobalContext1Type | undefined>(undefined);

// Context Provider 컴포넌트
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  //변경필요
  const tmp = sessionStorage.getItem("user_id");
  const userId = tmp==null ? '' : tmp;
  const [globalVariable, setGlobalVariable] = useState<string>(userId);
  const [refresh, setRefresh] = useState<string>("");
  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      <GlobalContext1.Provider value={{ refresh, setRefresh }}>
        {children}
      </GlobalContext1.Provider>
    </GlobalContext.Provider>
  );
};

// Context를 사용하는 커스텀 훅
export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  
  // Context가 존재하지 않으면 오류를 던집니다. (Provider로 감싸지 않으면 오류 발생)
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  
  return context;
};

// Context를 사용하는 커스텀 훅
export const useRefresh = (): GlobalContext1Type => {
  const context = useContext(GlobalContext1);
  
  // Context가 존재하지 않으면 오류를 던집니다. (Provider로 감싸지 않으면 오류 발생)
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  
  return context;
};
