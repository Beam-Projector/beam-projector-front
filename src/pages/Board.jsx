import styled from "styled-components";
import Title from "../components/common/Title";
import BoardCard from "../components/Board/BoardCard";
import Pen from "../assets/Pen.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Board = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const moveToCreatePost = () => {
    navigate("/board/create");
  };

  const moveToPostDetail = () => {
    navigate("/board/1");
    console.log("asd");
  };

  useEffect(() => {
    // axiosClient
    //   .get(`/comments/?boardNum=${id}`)
    //   .then(setComments)
    //   .catch(console.log);
  }, []);

  return (
    <>
      <Title>Board</Title>
      <ListWrapper>
        <BoardCard onClick={() => moveToPostDetail()} />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </ListWrapper>
      <PostBtn onClick={moveToCreatePost}>
        <img src={Pen} alt="" />
      </PostBtn>
    </>
  );
};

export default Board;

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  place-items: center;
  width: 1200px;
  margin-top: 200px;
`;

const PostBtn = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 20px;
  right: 20px;
  border-radius: 30px;
  border: 1px solid black;
  background-color: white;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
