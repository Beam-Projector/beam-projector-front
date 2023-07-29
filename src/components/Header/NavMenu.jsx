import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useWatchLocation from "../../hooks/useWatchLocation";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const NavMenu = ({ children, path, onClick }) => {
  const watchState = useWatchLocation(path);

  return (
    <>
      <NavList to={path} watchstate={`${watchState}`} onClick={onClick}>
        <li>{children}</li>
      </NavList>
    </>
  );
};

export default NavMenu;

const NavList = styled(NavLink)`
  font-weight: 400;
  font-size: 22px;
  vertical-align: baseline;
  cursor: pointer;

  &.active {
    font-weight: ${({ watchstate }) => watchstate === "true" && "bold"};
  }
`;

// const LogOutBtn = styled.button`
//   font-weight: 400;
//   font-size: 22px;
//   vertical-align: baseline;
// `;
