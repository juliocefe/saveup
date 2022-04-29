import styled from "styled-components";

export const SearchContainer = styled.div`
  /* overflow: hidden; */
  height: 100vh;
  display: flex;
  /* top:100px; */
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  padding: 5px 10px 0 10px;
  @media (max-width: 768px) {
    border-bottom: lightgray solid 1px;
  }
`;
