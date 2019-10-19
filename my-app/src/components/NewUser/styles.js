import styled from 'styled-components'
import {  Link } from '@reach/router'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    height: 100vh;
    background-color: #F9F9F9;

    & h1 {
        text-align:center;
    }
`

export const LoginBox = styled.div` 
    margin: 0 1.2rem;
    padding: 20px 1rem;
    max-width: 700px;
    width: 500px;
    background-color: #e9ecef;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    position: relative;
    @media (max-width: 768px) {
        width: 100%;
        margin: 0 0rem;
        border: none;
`

export const BackButton = styled(Link)` 
    font-size: 2rem;
    position: absolute;
    top: 0rem;
    left: 0rem;
`