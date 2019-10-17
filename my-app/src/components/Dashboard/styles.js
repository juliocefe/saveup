import styled from 'styled-components'

export const Body = styled.div`
    /* OJO AQUI SI PONGO LOS REM CON margin-top en vez de top sale una falla cuando empiezo 
    a  naverga INVESTIGAR ESO!! */
    position: relative;
    top: 4rem;   
    height: 100vh;
    width: 100%;
    font-family:  Tahoma;
    text-align:center;
    & h1{
        margin-top: 8rem; 
        font-size: 4rem;
        text-align:center;
    }
    & .welcome{
        font-size: 1.5rem;
        text-align:center;
        font-weight: bold;
    }
    &  p{
        padding: 5px 2rem;
        font-size: 1rem;
        text-align:center;
    }
`
