import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    width: 100vw;
    font: 15px sans-serif;
    background: #eaeaea;
    color: #363636;
    display: flex;
    flex-direction: row;
    -webkit-font-smoothing: antialiased !important;
  }
`;
