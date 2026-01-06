import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* CSS Reset & Basics */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
        background-color: #ffffff;
        color: #333333; /* Dark Charcoal from logo */
        line-height: 1.6;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    ul, ol {
        list-style: none;
    }

    button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;
    }

    /* Color Variables */
    :root {
        --color-primary: #333333; /* Dark Charcoal */
        --color-accent: #FF8000;  /* Vibrant Orange */
        --color-bg-light: #F4F4F4;
        --color-white: #ffffff;
    }
`;

export default GlobalStyles;
