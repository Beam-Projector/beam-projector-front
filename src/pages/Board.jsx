import styled from "styled-components";
import Title from "../components/common/Title";
import BoardCard from "../components/Board/BoardCard";
import Pen from "../assets/Pen.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosClient } from "../api/axiosClients";
import PaginationButton from "../components/Board/PageBtn";

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const moveToCreatePost = () => {
    navigate("/board/create");
  };

  const moveToPostDetail = (boardNum) => {
    navigate(`/board/${boardNum}`);
  };

  const handlePageChange = (pageNumber) => {
    axiosClient
      .get(`/boards/All/${pageNumber}`)
      .then((data) => {
        setPost(data.content);
        setCurrentPage(data.pageable.pageNumber);
        setTotalPages(data.totalPages);
      })
      .catch(console.log);
    setCurrentPage(pageNumber);
    // 페이지 번호에 따른 데이터를 불러오는 비동기 로직을 구현할 수 있습니다.
  };

  useEffect(() => {
    axiosClient
      .get(`/boards/All/${currentPage}`)
      .then((data) => {
        setPost(data.content);
        setCurrentPage(data.pageable.pageNumber);
        setTotalPages(data.totalPages);
      })
      .catch(console.log);
  }, [location]);

  return (
    <>
      <Title>Board</Title>
      <ListWrapper>
        {post.map(({ boardNum, ...rest }) => {
          return (
            <BoardCard
              key={boardNum}
              {...rest}
              onClick={() => moveToPostDetail(boardNum)}
            />
          );
        })}
      </ListWrapper>
      <div>
        <PaginationButton
          type="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <PaginationButton
          type="number"
          onClick={() => handlePageChange(1)}
          disabled={currentPage !== 1 && 1}
          selected={currentPage === 1 && 1}
        >
          1
        </PaginationButton>
        <PaginationButton
          type="number"
          onClick={() => handlePageChange(2)}
          disabled={currentPage !== 2 && 2}
          selected={currentPage === 2 && 2}
        />
        <PaginationButton
          type="number"
          onClick={() => handlePageChange(3)}
          disabled={currentPage !== 3 && 3}
          selected={currentPage === 3 && 3}
        />
        <PaginationButton
          type="number"
          onClick={() => handlePageChange(4)}
          disabled={currentPage !== 4 && 4}
          selected={currentPage === 4 && 4}
        />
        <PaginationButton
          type="number"
          onClick={() => handlePageChange(5)}
          disabled={currentPage !== 5 && 5}
          selected={currentPage === 5 && 5}
        />
        {/* 다른 페이지 버튼들 */}
        <PaginationButton
          type="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
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

const PageBtn = styled.button``;
