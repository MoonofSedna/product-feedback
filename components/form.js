import styled from "@emotion/styled";
import { StyleSheet } from "../utils/style-sheet";
// icons
import BlueArrowUp from "../public/images/blue-arrow-up.svg";
import BlueArrowDown from "../public/images/blue-arrow-down.svg";

const {
  darkBlue2,
  gray,
  gray3,
  red,
  regular,
  h3,
  h4,
  blue,
  textBody2,
  textBody3,
} = StyleSheet;

const Form = styled.form`
  width: 100%;
  & > div {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  & div label {
    font-size: ${textBody2};
    color: ${darkBlue2};
  }
  & > div .dropdown,
  & input {
    width: 100%;
    background-color: ${gray};
    border: none;
    border-radius: 5px;
  }
  & div > .dropdown button {
    display: flex;
    position: relative;
    flex-direction: row;
    display: block;
    text-align: left;
    color: ${darkBlue2};
    font-weight: ${regular};
    font-size: ${textBody2};
    width: 100%;
    padding: 12px 24px;
  }
  & div > .dropdown button:hover,
  div > .dropdown button:focus,
  div > .dropdown button:active,
  input:active,
  input:focus,
  input:hover {
    color: ${darkBlue2};
    outline: 1px solid ${blue};
  }
  & div .show > .btn-primary.dropdown-toggle {
    color: ${darkBlue2};
    outline: 1px solid ${blue};
  }
  & div .dropdown .dropdown-toggle:hover,
  div .dropdown .dropdown-toggle:active,
  div .dropdown .dropdown-toggle:focus {
    opacity: 1;
  }
  & div .show .dropdown-toggle::after,
  div .dropdown-toggle::after {
    position: absolute;
    left: auto;
    right: 20px;
    top: 18px;
    background-image: url(${BlueArrowDown.src});
  }
  & div .show .dropdown-toggle::after {
    background-image: url(${BlueArrowUp.src});
  }
  & div input {
    padding: 10px 22px;
    color: ${darkBlue2};
    font-weight: ${regular};
    font-size: ${textBody2};
  }
  & div input::placeholder {
    color: ${darkBlue2};
    font-weight: ${regular};
    font-size: ${textBody2};
  }
  & div .dropdown-menu {
    width: 100%;
    transform: translate(0px, 55px) !important;
  }
  & div small {
    font-size: ${h4};
    color: ${gray3};
    font-weight: ${regular};
    margin: 0;
  }
  & > div small:last-child {
    color: ${red};
    line-height: 20px;
    padding: 4px 0;
    position: relative;
  }
  & div .error {
    outline: 1px solid ${red};
  }

  @media (max-width: 767px) {
    & h2 {
      font-size: ${h3};
    }
    & div > .dropdown button {
      font-size: ${textBody3};
    }
    & div input,
    div small {
      font-size: ${textBody3};
    }
  }
`;

const TextArea = styled.textarea`
  width: ${({ width }) => (width ? width : "100%")};
  background-color: ${gray};
  border: none;
  border-radius: 5px;
  padding: ${({ padding }) => (padding ? padding : "22px")};
  color: ${darkBlue2};
  font-weight: ${regular};
  font-size: ${textBody2};
  resize: none;
  height: ${({ height }) => height};
  &:active,
  &:focus,
  &:hover {
    color: ${darkBlue2};
    outline: 1px solid ${blue};
  }
  &.comment-error,
  &.reply-error {
    outline: 1px solid ${red};
  }
  @media (max-width: 768px) {
    font-size: ${textBody3};
  }
`;

export { Form, TextArea };
