import styled from "styled-components";

export const Link = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.img`
  margin: 5px 1rem;
  border: 1px solid #ddd;
  box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: auto;
  overflow: hidden;
  object-fit: cover;
  height: 75px;
  width: 75px;
`;

export const SecondSection = styled.div`
  .productName {
    margin: 0;
    color: red;
    font-weight: bold;
  }
  .brand {
    margin: 0;
  }

  .product-counter {
    position: absolute;
    top: 10px;
    right: 1rem;
    color: green;
    font-size: 1rem;
    font-weight: 2px;
  }

  & .btn-Autocomplete__group {
    position: absolute;
    right: 5px;
    bottom: 1rem;

    .btn-Autocomplete__add {
      padding: 5px 10px;
      font-size: 10px;
      margin-right: 0.5rem;
    }
    .btn-Autocomplete__delete {
      padding: 5px 10px;
      font-size: 10px;
      border-radius: 5px;
    }
  }
`;

export const CheckBoxIcon = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 3px;
  outline: 0 !important;
  border: 2px solid black;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  background: transparent;
  & i {
    font-size: 30px;
    color: gray;
  }
  :focus {
  }
`;
