import styled from 'styled-components'

export const SearchContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    top: 100px;
    padding: 5px 10px 20px 10px;
    @media (max-width: 768px) {
        padding-bottom: 3rem;
        border-bottom: lightgray solid 1px; 
    }
`

export const SearchBox = styled.div`
    position: relative;
    width: 300px;
    margin-right:5px;
}
`

export const SearchInput = styled.input`
    width: 100%;
    font-size: 14px;
    word-wrap: break-word;
    line-height: 1em;
    outline: 0;
    white-space: normal;
    min-height: 2em;
    background: #fff;
    display: inline-block;
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

// Lista de porductos
export const  ProductsFiltered = styled.ul`
    max-height: 12rem;
    overflow: auto;
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    display: none;
    border-left: 1px solid #ced4da;
    border-right: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);

    & li {
        width: 100%;
        padding: 5px 15px;
        background-color: white; 

        :focus{
            background-color: #96c8da;
        }
        :hover{
            background-color: #F7F7F7; 
            background: #F7F7F7; 
        }
    }
`

