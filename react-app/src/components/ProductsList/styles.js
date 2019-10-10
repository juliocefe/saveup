import styled from 'styled-components'
import { Fragment } from 'react'

export const List = styled.ul`
    display: flex;
    justify-content: flex-start;
    flex-direction:column;
    overflow: auto;
    list-style-type: none;
`

export const TrueList = styled.ul`
    display: flex;
    flex-direction:column;
    justify-content: center;
    overflow: auto;
    list-style-type: none;
    position: absolute;
    z-index: 0;
   

    & li {
        background-color: lightgreen !important;
    }

`

export const Item = styled.li`
    position:relative;
    margin-bottom:5px;
    border-bottom: gray solid 1px;
    width: 100%;
    padding: 5px 15px;
    background-color: #F7F7F7;
    padding: 1rem 0;

    &:focus {
        background-color: #96c8da;
    }
    &:focus{
        border-color: #96c8da;
        box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
    }

`