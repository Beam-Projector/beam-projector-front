import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import stick from "../../assets/stick.gif";
import NavMenu from "./NavMenu";
import NavIcon from "./NavIcon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);
  const logOut = () => {
    navigate("/");
    localStorage.removeItem("access_token");
    location.reload();
  };

  return (
    <HeaderCompo>
      <LogoWrapper>
        <Link to={"/"}>
          <Logo src={stick} />
        </Link>
      </LogoWrapper>
      <CenterNav>
        <NavUl>
          <NavMenu path={"/about"}>We&apos;re</NavMenu>
          <NavMenu path={"/board"}>Board</NavMenu>
          <NavMenu path={"/ranking"}>Ranking</NavMenu>
          {!userInfo ? (
            <NavMenu path={"/login"}>Login</NavMenu>
          ) : (
            <NavMenu onClick={() => logOut()} style={{ fontWeight: "bold" }}>
              LogOut
            </NavMenu>
          )}
        </NavUl>
      </CenterNav>
      <NavIcons>
        <NavIcon>
          <Link to="/members">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
        </NavIcon>
        <NavIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </NavIcon>
      </NavIcons>
    </HeaderCompo>
  );
};

export default Header;

const HeaderCompo = styled.header`
  position: fixed;
  height: 100px;
  left: 0;
  top: 0;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
  z-index: 500;
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 5vw;
  top: 25px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const CenterNav = styled.nav`
  display: flex;
  align-items: center;
  width: 400px;
`;

const NavUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NavIcons = styled.ul`
  position: absolute;
  top: 42px;
  right: 3vw;
  display: flex;
  justify-content: center;
`;
