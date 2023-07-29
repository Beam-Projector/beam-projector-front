import styled from "styled-components";

// 이전, 다음 버튼을 스타일드 컴포넌트로 만듭니다.
const StyledButton = styled.button`
  margin: 5px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
`;

const PrevButton = styled(StyledButton)``;
const NextButton = styled(StyledButton)``;

// 페이지 버튼을 스타일드 컴포넌트로 만듭니다.
const NumberButton = styled(StyledButton)`
  /* 선택된 페이지의 스타일을 변경할 수 있습니다. */
  background-color: ${({ selected }) => (selected ? "#007bff" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
`;

const PaginationButton = ({ type, onClick, disabled, selected, children }) => {
  return (
    <>
      {type === "prev" && (
        <PrevButton onClick={onClick} disabled={disabled}>
          이전
        </PrevButton>
      )}
      {type === "next" && (
        <NextButton onClick={onClick} disabled={disabled}>
          다음
        </NextButton>
      )}
      {type === "number" && (
        <NumberButton onClick={onClick} disabled={disabled} selected={selected}>
          {selected ? <strong>{selected}</strong> : disabled}
        </NumberButton>
      )}
    </>
  );
};

export default PaginationButton;
