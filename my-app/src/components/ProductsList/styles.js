import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  padding-top: 5.2rem;
`;

export const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: auto;
  list-style-type: none;
`;

export const TrueList = styled.ul`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
  position: absolute;
  z-index: 0;

  & li {
    background-color: lightgreen !important;
  }
`;

export const Item = styled.li`
  position: relative;
  margin-bottom: 5px;
  border-bottom: gray solid 1px;
  width: 100%;
  padding: 5px 15px;
  background-color: #f7f7f7;
  padding: 1rem 0;

  &:focus {
    background-color: #96c8da;
  }
  &:focus {
    border-color: #96c8da;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  }
`;
const animationBtn = keyframes`
  0%   { background: green; color:white}
  100% { background: transparent; color:green;}
`;

export const PlusBtn = styled.div`
  display: flex;
  visibility: visible;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  & button {
    padding: 5px 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 0.3rem;
    border: none;
    display: block;
  }
  & .rojito {
    & a {
      text-decoration: inherit;
      color: inherit;
      cursor: auto;
    }
    animation: ${animationBtn} 4s infinite;
    font-size: 12px;
    color: black;
  }
`;

export const SearchInput = styled.input`
  margin: auto;
  margin-bottom: 1rem;
  width: 100%;
  // max-width: 600px;
  text-align: center;
  font-size: 18px;
  // word-wrap: break-word;
  line-height: 1em;
  outline: 0;
  white-space: normal;
  background: #fff;
  display: block;
  padding: 1em 2em 1em 1em;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.3);
  border-radius: 0.3rem;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  :hover {
    border-color: #96c8da;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  }
  :focus {
    border-color: #96c8da;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  }
  &::-webkit-input-placeholder {
    color: lightgray;
  }
`;
