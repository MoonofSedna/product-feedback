import styled from "@emotion/styled";
// utils
import { StyleSheet } from "../utils/style-sheet";

const {
  gray,
  gray4,
  blue,
  white,
  borderRadius,
  semiBold,
  textBody3,
  withoutBackground,
} = StyleSheet;

const Button = styled.button`
  // display
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "column"};
  align-items: center;
  // width
  min-width: ${({ minWidth }) => `${minWidth}`};
  // background
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? `${backgroundColor}` : gray};
  // border
  border: none;
  border-radius: ${borderRadius};
  // color
  color: ${({ textColor }) => (textColor ? `${textColor}` : blue)};
  // font
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : textBody3)};
  font-weight: ${semiBold};
  line-height: 19px;
  letter-spacing: -0.25px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  // margins & paddings
  padding: ${({ padding }) => (padding ? `${padding}` : "5px 16px")};
  margin: ${({ margin }) => `${margin}`};
  cursor: pointer;
  &:hover {
    // background
    background-color: ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor ? `${hoverBackgroundColor}` : gray4};
    // color
    color: ${({ hoverTextColor }) => `${hoverTextColor}`};
  }
  &:focus,
  &:active {
    outline: none;
    // background
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? `${backgroundColor}` : blue};
    // color
    color: ${({ focusTextColor }) =>
      focusTextColor ? `${focusTextColor}` : white};
  }
  &:before {
    content: "";
    // icon
    background-image: url(${({ icon }) => `${icon}`});
    background-repeat: no-repeat;
    background-size: contain;
    height: ${({ icon }) => icon && "10px"};
    width: ${({ icon }) => icon && "10px"};
  }
  &:active:before,
  :focus:before {
    content: "";
    // icon
    background-image: url(${({ iconHover, icon }) =>
      iconHover ? `${iconHover}` : `${icon}`});
    background-repeat: no-repeat;
    background-size: contain;
    height: ${({ icon }) => icon && "10px"};
    width: ${({ icon }) => icon && "10px"};
  }
  & img {
    margin: 0 5px;
  }
`;

const TextButton = styled.button`
  position: relative;
  background: ${withoutBackground};
  border: none;
  color: ${({ textColor }) => (textColor ? `${textColor}` : blue)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : textBody3)};
  font-weight: ${({ fontWeight }) => fontWeight || semiBold};
  line-height: 19px;
  letter-spacing: -0.25px;
  padding: ${({ padding }) => (padding ? `${padding}` : "5px 20px")};
  cursor: pointer;
  :hover {
    text-decoration: underline;
    text-underline-offset: 0.5px;
    color: ${({ hoverTextColor }) => `${hoverTextColor}`};
  }
  &:before {
    content: "";
    // icon
    background-image: url(${({ icon }) => `${icon}`});
    background-repeat: no-repeat;
    background-size: contain;
    height: ${({ icon }) => icon && "10px"};
    width: ${({ icon }) => icon && "10px"};
    position: absolute;
    left: 0;
    top: 9px;
  }
`;

export { Button, TextButton };
