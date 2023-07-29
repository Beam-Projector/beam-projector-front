import { styled } from "styled-components";
import { IoPlayBackOutline } from "react-icons/io5";
// import { PiThumbsUp } from "react-icons/pi";
import { CgPacman } from "react-icons/cg";
import { BsEye } from "react-icons/bs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Comment from "../components/Comment/Comment";
import { axiosClient } from "../api/axiosClients";
import { AuthContext } from "../context/AuthContext";
import { useRecoilState } from "recoil";
import { PostAtom } from "../context/atoms";

const Post = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [post, setPost] = useRecoilState(PostAtom);
  const { userInfo } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    // {
    //   memberNum: 1, // 토큰에서 memberNum 가져와야한다.
    //   boardNum: id,
    //   commentNum: 1,
    //   nickName: "프론트엔드 마스터",
    //   comments: "댓글 테스트",
    //   createAt: "2023-07-25T00:00:00",
    // },
  ]);

  const moveToBack = () => {
    navigate(-1);
  };

  const postComment = () => {
    axiosClient
      .post("/comments/", {
        comments: comment,
        boardNum: id,
      })
      .then((res) => {
        setComments((prev) => [...prev, res]);
        setComment("");
      })
      .catch(console.log);
  };

  const deleteComment = (commentNum) => {
    axiosClient.delete(`/comments/?commentNum=${commentNum}`).then(() => {
      setComments((prev) => prev.filter((e) => e.commentNum !== commentNum));
    });
  };

  const fetchData = () => {
    axiosClient
      .get(`/boards/${id}`)
      .then((res) => {
        setPost(res);
      })
      .then(console.log);

    axiosClient
      .get(`/comments/?boardNum=${id}`)
      .then(setComments)
      .catch(console.log);
  };

  useEffect(() => {
    console.log("페이지전환");
    fetchData();
  }, [id, location]);

  return (
    <>
      <BtnBack onClick={() => moveToBack()}>
        <IoPlayBackOutline />
      </BtnBack>
      <Layout>
        <PostTitle>{post?.title}</PostTitle>
        <UserInfo>
          <UserLogo>
            <CgPacman />
          </UserLogo>
          <UserName>{userInfo?.nickName}</UserName>
          <CreatedDate>{post.createAt?.replace("T", " ")}</CreatedDate>
          <HitWrapper>
            <HitTitles>
              <BsEye />
            </HitTitles>
            <HitCount>{post.boardHits}</HitCount>
          </HitWrapper>
        </UserInfo>
        <ProjectInfoWrapper>
          <InfoUl>
            <InfoLi>
              <InfoSubject>카테고리</InfoSubject>
              <InfoValue>프로젝트</InfoValue>
            </InfoLi>
            <InfoLi>
              <InfoSubject>프로젝트 인원</InfoSubject>
              <InfoValue>10명</InfoValue>
            </InfoLi>
          </InfoUl>
        </ProjectInfoWrapper>
        <DescTitle>프로젝트 소개</DescTitle>
        <Content dangerouslySetInnerHTML={{ __html: post.content }}></Content>
        <CommentWrapper>
          <ComTitleWrapper>
            <CommentTitles>댓글</CommentTitles>
            <CommentCount>{comments.length}</CommentCount>
          </ComTitleWrapper>
          <CommentInput
            placeholder="댓글 입력하슈"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <CommentSubmit onClick={() => postComment()}>댓글 등록</CommentSubmit>
        </CommentWrapper>
        <CommentLists>
          {comments.map(({ commentNum, ...rest }) => (
            <Comment
              key={commentNum}
              commentNum={commentNum}
              boardNum={id}
              onDelete={deleteComment}
              {...rest}
            />
          ))}
        </CommentLists>
      </Layout>
    </>
  );
};

export default Post;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  padding: 50px 200px 0 200px;
  margin-bottom: 200px;
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  font-size: 60px;
  position: fixed;
  left: 90px;
  top: 700px;
  transition: all 0.1s;

  &:hover {
    transform: translateX(-10px);
  }
`;

const PostTitle = styled.h1`
  font-weight: bold;
  font-size: 60px;
  margin-bottom: 60px;
`;

const UserInfo = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 40px;
  margin-bottom: 60px;
`;

const UserLogo = styled.div`
  margin-right: 8px;
  font-size: 40px;
  padding-bottom: 10px;
`;

const UserName = styled.p`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -2px;
  margin-right: 26px;
  border-right: 1px solid gray;
  padding-right: 26px;
`;

const CreatedDate = styled.p`
  color: gray;
  font-size: 19px;
  font-weight: 400;
`;

const HitWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
`;

const HitTitles = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
`;

const HitCount = styled.p`
  padding-top: 2px;
  font-size: 20px;
  font-weight: 400;
  color: gray;
`;

const ProjectInfoWrapper = styled.section`
  display: flex;
`;

const InfoUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-row-gap: 24px;
  row-gap: 24px;
  width: 100%;
`;

const InfoLi = styled.li`
  display: flex;
`;

const InfoSubject = styled.div`
  color: gray;
  font-weight: bold;
  font-size: 21px;
  margin-right: 30px;
`;

const InfoValue = styled.div`
  font-weight: bold;
  font-size: 21px;
`;

const DescTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
  margin-top: 140px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
`;

const Content = styled.section`
  font-size: 24px;
  min-height: 600px;
  padding-top: 50px;
`;

const CommentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 50px;
`;

const ComTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentTitles = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-right: 8px;
`;

const CommentCount = styled.p`
  color: gray;
  font-size: 20px;
`;

const CommentInput = styled.textarea`
  padding: 20px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  resize: none;
  width: 100%;
  height: 110px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const CommentSubmit = styled.button`
  background-color: black;
  color: white;
  width: 110px;
  height: 40px;
  border-radius: 20px;
  align-self: flex-end;
`;

const CommentLists = styled.ul`
  display: flex;
  flex-direction: column;
`;
