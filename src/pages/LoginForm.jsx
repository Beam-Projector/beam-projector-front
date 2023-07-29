import { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosClient } from "../api/axiosClients";

function LoginForm() {
  const navigate = useNavigate();

  const [idFocus, setIdFocus] = useState(false);
  const [passwordfocus, setPassWordFocus] = useState(false);

  //아이디인풋창을 클릭하면 아이콘사라지게하기
  const inputIdFocus = () => setIdFocus(true);
  const inputIdBlur = () => {
    if (idRef.current.value === "") {
      setIdFocus(false);
    } else {
      setIdFocus(true);
    }
  };

  //패스워드인풋창을 클릭하면 아이콘 사라지게 하기
  const inputPassWordFocus = () => setPassWordFocus(true);
  const inputPassWordBlur = () => {
    if (passwordRef.current.value === "") {
      setPassWordFocus(false);
    } else {
      setPassWordFocus(true);
    }
  };

  //useNavigate
  const goToSignUp = () => {
    navigate("/signup");
  };

  //아이디랑 패스워드
  const idRef = useRef();
  const passwordRef = useRef();

  // 로그인요청하기
  const Login = () => {
    axios
      .post(
        "http://43.202.4.184:8080/login",
        {
          memberId: idRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        localStorage.setItem("access_token", JSON.stringify(response.data));
        navigate("/");
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <LoginContainer>
        <SignupTitle>LOGIN</SignupTitle>
        <InputBox>
          <FlexDiv>
            {!idFocus ? (
              <InputIconIdDiv>
                <InputIconImage src="/src/assets/user.svg"></InputIconImage>
                <InputIconText htmlFor="id">ID</InputIconText>
              </InputIconIdDiv>
            ) : (
              ""
            )}

            <Input
              name="id"
              id="id"
              ref={idRef}
              onFocus={inputIdFocus}
              onBlur={inputIdBlur}
            />
          </FlexDiv>

          <FlexDiv>
            {passwordfocus === false ? (
              <InputIconPassWordDiv>
                <InputIconImage src="/src/assets/lock.svg"></InputIconImage>
                <InputIconText htmlFor="password">password</InputIconText>
              </InputIconPassWordDiv>
            ) : (
              ""
            )}
            <Input
              name="password"
              id="password"
              ref={passwordRef}
              type="password"
              onFocus={inputPassWordFocus}
              onBlur={inputPassWordBlur}
            />
          </FlexDiv>

          <ForgetIdPassword>
            <div>
              <input type="checkbox" /> 보안접속
            </div>

            <div> 아이디찾기 /비밀번호찾기</div>
          </ForgetIdPassword>

          <LoginButton onClick={Login}>로그인</LoginButton>
        </InputBox>

        <InputBox>
          <GoToSignUpDiv>
            <div>더 많은 혜택, 아직 회원이 아니시라면?</div>
            <SignUpButton onClick={goToSignUp}>회원가입</SignUpButton>
          </GoToSignUpDiv>
        </InputBox>
      </LoginContainer>
    </>
  );
}
export default LoginForm;

const LoginContainer = styled.div`
  margin: auto;
  width: 1200px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignupTitle = styled.div`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 400;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
  padding: 1rem 1rem 2rem 1rem;
  border-bottom: 1px solid #cfcfcf;
`;

const Input = styled.input`
  width: 450px;
  height: 50px;
  border: 1px solid #cfcfcf;
`;
const Label = styled.label`
  width: 100px;
`;
const InputRightSpace = styled.div`
  width: 200px;
`;

const Required = styled.span`
  color: red;
`;
const GoBackButton = styled.button`
  font-size: 1.3rem;
  margin-top: 1rem;
  width: 200px;
  padding: 0.6rem;
  border: 1px solid #cfcfcf;
  background-color: white;
`;

const LoginButton = styled.button`
  font-size: 1.5rem;
  margin-top: 1rem;
  width: 450px;
  padding: 0.6rem;
  color: white;
  background-color: #000000;
  transition: all 0.1s ease-out;
  &:hover {
    scale: 1.1;
  }
`;
const SignUpButton = styled.button`
  font-size: 1.5rem;
  margin-top: 1rem;
  width: 450px;
  height: 100px;
  padding: 0.6rem;
  color: #000000;
  background-color: #f6f6f6;
  transition: all 0.1s ease-out;

  &:hover {
    scale: 1.1;
  }
`;

const GoToSignUpDiv = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1rem;
  width: 450px;
  height: 150px;
  padding: 0.6rem;
  color: #000000;
  background-color: #ffffff;
  transition: all 0.1s ease-out;
`;

const FlexDiv = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
const ForgetIdPassword = styled.div`
  width: 450px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;
const InputIconIdDiv = styled.div`
  width: 0px;
  position: relative;
  left: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputIconPassWordDiv = styled.div`
  width: 0px;
  position: relative;
  left: 60px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputIconText = styled.label`
  font-size: 1rem;
`;

const IsValidDiv = styled.div`
  color: #fa8a8a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputIconImage = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  padding: 5px;
`;
