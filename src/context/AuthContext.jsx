// contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getToken } from "../utils/handleToken";

// Context 생성
export const AuthContext = createContext();

// Context Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져옴
    const token = getToken();

    if (token) {
      try {
        // 토큰 디코딩하여 그 안에 들어있는 정보들을 추출
        const decodedToken = jwt_decode(token);

        // 디코딩된 정보를 상태로 설정
        setUserInfo(decodedToken);
        setLoggedIn(true);
      } catch (error) {
        // 토큰 디코딩 중 오류 발생 시 상태를 null로 설정
        setUserInfo(null);
        setLoggedIn(false);
        console.log("토큰 디코딩 오류");
      }
    } else {
      // 토큰이 존재하지 않으면 상태를 null로 설정
      setUserInfo(null);
      setLoggedIn(false);
      console.log("토큰이 존재하지않음");
    }
  }, []);

  return (
    <AuthContext.Provider value={loggedIn ? { userInfo } : null}>
      {children}
    </AuthContext.Provider>
  );
};
