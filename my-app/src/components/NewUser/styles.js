import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    height: 100vh;
    background-color: #F9F9F9;
    padding: 0 1.2rem;

    & h1 {
        text-align:center;
    }
`

export const LoginBox = styled.div` 
    padding: 20px 1rem;
    max-width: 700px;
    width: 500px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 1px;
`