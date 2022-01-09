import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const StyledLayout = styled.main`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 40px;
  @media (max-width: 1024px) {
    padding: 50px 32px;
  }
  @media (max-width: 767px) {
    padding: 0;
  }
`;

export default function Layout({ children }) {
  return (
    <StyledLayout>
      <Global
        styles={css`
          :root {
            --gray: #f2f4ff;
            --gray-2: #f7f8fd;
            --gray-3: #647196;
            --gray-4: #cfd7ff;
            --blue: #4661e6;
            --blue-2: #7c91f9;
            --purple: #ad1fea;
            --purple-2: #c75af6;
            --white: #ffffff;
            --dark-blue: #373f68;
            --dark-blue-2: #3a4374;
            --dark-blue-3: #656ea3;
            --orange: #f49f85;
            --orange-2: #e98888;
            --light-blue: #62bcfa;
            --light-blue-2: #8397f8;
            --red: #d73737;
            --line-color: #dfe0ea;
            --border-radius: 10px;
            --h1: 24px;
            --h2: 20px;
            --h3: 18px;
            --h4: 14px;
            --text-body: 16px;
            --text-body-2: 15px;
            --text-body-3: 13px;
            --regular: 400;
            --semi-bold: 600;
            --bold: 700;
            --without-background: none;
            --flex-start: flex-start;
            --flex-end: flex-end;
            --center: center;
            --card-padding: 22px 24px;
            --box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            --box-shadow-2: 0px 10px 40px -7px rgba(55, 63, 104, 0.350492);
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
            min-height: 100%;
            height: 100%;
          }
          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            font-weight: 600;
            line-height: 1.7;
            font-family: "Jost", sans-serif;
            background-color: var(--gray);
            height: 100%;
            min-height: 100%;
          }
          #__next {
            height: 100%;
          }
          h1,
          h2,
          h3 {
            margin: 0;
            line-height: 1.2;
          }
          a {
            text-decoration: none;
          }
        `}
      />

      {children}
    </StyledLayout>
  );
}
