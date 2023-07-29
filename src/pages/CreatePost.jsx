import styled, { createGlobalStyle } from "styled-components";
import { PiNotePencilBold, PiPencilFill } from "react-icons/pi";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosClient } from "../api/axiosClients";
import { useRecoilState } from "recoil";
import { PostAtom } from "../context/atoms";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [post, setPost] = useRecoilState(PostAtom);

  const submitPost = () => {
    axiosClient
      .post("/boards/save", {
        title,
        content,
        categoryName: "",
        disclosure: "",
      })
      .then((result) => {
        navigate(`/board/${result.boardNum}`);
        setPost(result);
      });
  };

  return (
    <InnerWrapper>
      <SubjectWrapper>
        <IconWrapper>
          <PiNotePencilBold />
        </IconWrapper>
        <InputName>프로젝트 정보</InputName>
      </SubjectWrapper>
      <TitleWrapper>
        <TitleInput
          placeholder="제목"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TitleIcon>
          <PiPencilFill />
        </TitleIcon>
      </TitleWrapper>
      <EditorWrapper>
        <GlobalStyle />
        <Editor value={content} setValue={setContent} />
      </EditorWrapper>
      <ButtonWrapper>
        <Btn onClick={() => submitPost()}>제출하기</Btn>
        <Btn onClick={() => navigate("/board")}>취소하기</Btn>
      </ButtonWrapper>
    </InnerWrapper>
  );
};

export default CreatePost;

const InnerWrapper = styled.section`
  border: 1.5px solid black;
  height: 1200px;
  width: 1074px;
  border-radius: 30px;
  position: relative;
`;

const SubjectWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 100px;
  top: 70px;
`;

const IconWrapper = styled.div`
  font-size: 40px;
  margin-right: 10px;
`;

const InputName = styled.h2`
  padding-top: 10px;
  font-size: 30px;
  font-weight: bold;
`;

const TitleWrapper = styled.div`
  position: absolute;
  display: flex;
  left: 120px;
  top: 200px;
  height: 90px;
  width: 800px;
  border-bottom: 2px solid black;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 30px;
  outline: none;
  border: none;
  padding: 20px;
  font-weight: 200;
  height: 100%;

  &::placeholder {
    font-size: 30px;
  }
`;

const TitleIcon = styled.div`
  padding-top: 10px;
  font-size: 50px;
`;

const EditorWrapper = styled.div`
  position: absolute;
  bottom: 170px;
  left: 35px;
`;

const GlobalStyle = createGlobalStyle`
  .ql-editor[data-placeholder]::before {
    font-size: 30px; /* 여기에 원하는 크기를 설정합니다 */
  }

  .ql-editor {
    font-size: 30px;
  }


  .quill-editor {
    width: 1000px; /* 원하는 너비 값으로 변경 */
    height: 700px; /* 원하는 높이 값으로 변경 */

    .ql-editor {
      height: calc(100% - 52px); /* 툴바를 제외한 높이 설정 */
    }

    .ql-container {
    /* border: none; 에디터의 테두리를 없애는 설정 */

    }

  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  right: 400px;
`;

const Btn = styled.button`
  height: 50px;
  width: 100px;
  margin-right: 20px;
  background: none;
  outline: none;
  border-radius: 20px;
  border: 1px solid black;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: black;
    color: white;
  }
`;
