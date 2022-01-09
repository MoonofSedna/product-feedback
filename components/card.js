import styled from "@emotion/styled";
import { StyleSheet } from "../utils/style-sheet";

const {
  gray4,
  white,
  lightBlue2,
  darkBlue2,
  flexStart,
  borderRadius,
  cardPadding,
  textBody3,
} = StyleSheet;

const Card = styled.div`
  border-radius: ${borderRadius};
  // display
  display: ${({ display }) => display};
  flex-direction: column;
  // justify-content
  align-items: ${({ alingItem }) => alingItem};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : flexStart};
  // background
  background-image: url(${({ background }) => `${background}`});
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? `${backgroundColor}` : white};
  background-size: cover;
  // height
  min-height: ${({ minHeight }) => `${minHeight}`};
  // padding and margin
  padding: ${({ padding }) => (padding ? `${padding}` : cardPadding)};
  margin: ${({ margin }) => (margin ? `${margin}` : "0")};
  position: relative;
  &:hover {
    box-shadow: ${({ boxShadow }) => boxShadow};
    cursor: ${({ cursor }) => cursor};
  }
  & > button:not(:last-of-type) {
    margin: 0 8px 12px 0;
  }
  @media (max-width: 767px) {
    .suggestion-body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, auto);
      grid-column-gap: 0px;
      grid-row-gap: 5px;

      & > div:first-of-type {
        grid-area: 2 / 1 / 3 / 2;
      }
      & div {
        grid-area: 1 / 1 / 2 / 3;
        > button {
          flex-direction: row;
          padding: 8px 18px;
          color: ${darkBlue2};
          ::before {
            margin-right: 8px;
          }
        }
      }
      & > div:last-of-type {
        grid-area: 2 / 2 / 3 / 3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  @media (max-width: 500px) {
    & .suggestion-body h2,
    .suggestion-body p {
      font-size: ${textBody3};
    }
  }
`;

const CardHeader = styled.div`
  display: ${({ display }) => (display ? display : "flex")};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "space-between"};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  align-items: center;
  // border-radius
  border-radius: ${borderRadius};
  // height
  height: ${({ height }) => `${height}`};
  // width
  width: ${({ width }) => `${width}`};
  // background
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? `${backgroundColor}` : white};
  // padding
  padding: ${({ padding }) => `${padding}`};
  & a {
    font-size: ${textBody3};
    text-decoration: underline;
    text colorcolor: ${({ hoverTextColor }) =>
      hoverTextColor ? `${hoverTextColor}` : lightBlue2};
  }
  & a:hover {
    color: ${({ textColor }) => (textColor ? `${textColor}` : gray4)};
  }
  >  span {
    margin-right: 10px!important;
  }
  div .suggestion-icon {
    width: 24px;
    height: 24px ;
    min-height: 20px;
  }
  div .comment-icon {
    width: 18px ;
    height: 16px ;
    min-height: 15px ;
    min-width: 15px ;
  }
`;

const CardBody = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    & > div {
      grid-area: 1 / 1 / 2 / 3;
    }
  }
`;

export { Card, CardHeader, CardBody };
