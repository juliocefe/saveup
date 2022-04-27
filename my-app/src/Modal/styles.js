import styled from "styled-components";

export const ModalStyle = styled.div`
  position: fixed;
  z-index: 0;
  border-radius: 5px;
  justify-content: center;
  padding: 0px 1rem;
  display: flex; /* hidden or flex */
  flex-direction: column;
  width: 100vw;
  height: 220px;
  top: 9rem;
  & div {
    padding: 1rem 10px;
    border: 1px gray solid;
    background-color: white;
    border-radius: 5px;
    & h1 {
      font-size: 2rem;
      text-align: center;
    }
    & .listasGeneradas {
      border: 0px;
      & div {
        border: 0px;
        padding: 5px 0;
        display: flex;
        width: 100%;
        & button {
          display: block;
          width: 100%;
          outline: none;
          border-radius: 5px;
          :focus {
            background-color: lightgray;
          }
          :hover {
            background-color: lightgray;
          }
          border: 1px black solid;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 5px 10px;
          & p {
            display: inline;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
`;

export const ButtonSelect = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border: none !important;
  margin: 0 !important;
  padding: 0 10px !important;
  & button {
    display: inline !important;
    font-size: 1rem;
    padding: 2px 5px;
  }
`;
