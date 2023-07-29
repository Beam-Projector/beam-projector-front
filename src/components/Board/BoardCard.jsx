import { styled } from "styled-components";
import Folder from "../../assets/folder.png";
import Heart from "../../assets/heart.svg";
import Logo from "../../assets/projet-logo2.svg";
import StackIcon from "./StackIcon";

const BoardCard = ({ title, boardHits, createAt, onClick }) => {
  return (
    <CardList onClick={onClick}>
      <CategoryWrapper>
        <CategoryIcon src={Folder} />
        <LogoImg src={Logo} />
      </CategoryWrapper>
      <DateWrapper>
        <DateP>[등록일]</DateP>
        <DateP>{createAt.substring(0, 10)}</DateP>
      </DateWrapper>
      <TitleH1>{title}</TitleH1>
      <StackWrapper>
        <StackTitle>Stacks</StackTitle>
        <StackLists>
          <StackIcon src={"/techIcons/AWS.svg"} />
          <StackIcon src={"/techIcons/Git.svg"} />
          <StackIcon src={"/techIcons/JS.svg"} />
          <StackIcon src={"/techIcons/React.svg"} />
          <StackIcon src={"/techIcons/TS.svg"} />
        </StackLists>
      </StackWrapper>
      <FooterWrapper>
        <LikesWrapper>
          <ThumbsUp src={Heart} />
          <CountSpan>{boardHits}</CountSpan>
        </LikesWrapper>
        <NameWrapper>
          <ProfileLogo src={"profileImg.png"} />
          <ProfileName>{"프론트엔드 마스터"}</ProfileName>
        </NameWrapper>
      </FooterWrapper>
    </CardList>
  );
};

export default BoardCard;

const CardList = styled.li`
  border: 2px solid rgba(0, 0, 0, 0.6);
  width: 280px;
  height: 340px;
  border-radius: 30px;
  /* margin-bottom: 40px; */
  overflow: hidden;
  padding: 20px;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    transform: scale(1.02);
  }
`;

const CategoryWrapper = styled.div`
  /* background-color: rgba(128, 128, 128, 0.4); */
  /* width: 100%; */
  height: 50px;
  position: relative;
  margin-bottom: 8px;
`;

const CategoryIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const LogoImg = styled.img`
  position: absolute;
  top: 14px;
  right: 5px;
  width: 80px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
`;

const DateP = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: gray;
  margin-right: 7px;
`;

const TitleH1 = styled.h1`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2em;
  max-height: 3.6em;
  height: 200px;
`;

const StackWrapper = styled.div`
  height: 88px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const StackTitle = styled.h2`
  color: gray;
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 10px;
`;

const StackLists = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikesWrapper = styled.div`
  display: flex;
  margin-left: 5px;
  overflow: hidden;
  width: 77px;
`;

const ThumbsUp = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const CountSpan = styled.span`
  font-size: 15px;
  font-weight: 600;
  /* font-weight: bold; */
`;

const NameWrapper = styled.div`
  display: flex;
`;

const ProfileLogo = styled.img`
  width: 25px;
  height: 30px;
  margin-right: 5px;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
`;
