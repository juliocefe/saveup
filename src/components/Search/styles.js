import styled from 'styled-components'


export const SearchContainer = styled.div`
    height: 100vh;
    display: flex;
    /* top:100px; */
    flex-direction:column;
    position: relative;
    justify-content: flex-start;
    padding: 5px 10px 0 10px;
    @media (max-width: 768px) {
        border-bottom: lightgray solid 1px; 
    }
    border-bottom: solid 1px gray;
`

// NO se está usando
export const SearchBox = styled.div`
    position: relative;
    width: 300px;
    margin-right:5px;
    @media (max-width: 768px) {
        width: 100%;
    }
}
`

export const SearchInput = styled.input`
    margin-top: 100px;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 14px;
    word-wrap: break-word;
    line-height: 1em;
    outline: 0;
    white-space: normal;
    min-height: 2em;
    background: #fff;
    display: block;
    padding: 1em 2em 1em 1em;
    color: rgba(0,0,0,.87);
    box-shadow: none;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .30rem;
    transition: box-shadow .1s ease,width .1s ease;
    :hover {
        border-color: #96c8da;
        box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
    }
    :focus {
        border-color: #96c8da;
        box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
    }
`

export const PlusBtn = styled.button`
   padding: 5px 1rem !important;
   font-size: 2rem;
   font-weight: bold;
   border-radius: .30rem;
   border: none;
   display:none;
`



