import styled from "styled-components";

const NavIcon = ({ children }) => {
  return (
    <IconWrapper>
      <i>{children}</i>
    </IconWrapper>
  );
};

export default NavIcon;

const IconWrapper = styled.i`
  margin-right: 20px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
