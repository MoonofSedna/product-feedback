import React, { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "@emotion/styled";
import { StyleSheet } from "../utils/style-sheet";
import { Text } from "./text";
// icon
import Check from "../public/images/icon-check.svg";
import ArrowDown from "../public/images/arrow-down-white.svg";
import ArrowUp from "../public/images/ArrowWhite.svg";

const {
  gray,
  gray3,
  white,
  purple,
  withoutBackground,
  regular,
  bold,
  h4,
  textBody,
  textBody3,
  borderRadius,
  boxShadow2,
} = StyleSheet;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${regular};
  float: left;
  & button {
    border: none;
    font-weight: ${bold};
    font-size: ${h4};
    text-transform: capitalize;
    background-color: ${withoutBackground};
    &:hover,
    &:focus,
    &:active {
      background-color: ${withoutBackground};
      outline: none;
      border: none;
      box-shadow: none !important;
    }
  }
  & button[aria-expanded="true"] {
    background-color: ${withoutBackground}!important;
  }

  & .show .dropdown-toggle::after,
  .dropdown-toggle::after {
    background-image: url(${ArrowDown.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: none !important;
    width: 10px;
    height: 10px;
    position: relative;
    left: 8px;
    top: 5px;
  }
  & .show .dropdown-toggle::after {
    background-image: url(${ArrowUp.src});
  }
  & .dropdown .dropdown-toggle:hover,
  .dropdown .dropdown-toggle:active,
  .dropdown .dropdown-toggle:focus {
    opacity: 0.8;
  }
  & .dropdown-menu {
    min-width: 255px;
    overflow: hidden;
    padding: 0;
    border-radius: ${borderRadius};
    border: none;
    box-shadow: ${boxShadow2};
    transform: translate(-50px, 65px) !important;
  }
  & .dropdown-menu a {
    color: ${gray3};
    padding: 10px 24px;
    font-size: ${textBody};
    text-decoration: none;
    text-transform: capitalize;
    &:hover {
      color: ${purple};
      background: ${white};
      &:focus,
      &:active {
        color: ${purple};
        background: ${white};
      }
    }
  }
  & .dropdown-menu a:not(:last-of-type) {
    border-bottom: 1px solid #97979730;
  }

  & .dropdown-menu .active-item {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: 20px;
      top: 18px;
      background-image: url(${Check.src});
      background-repeat: no-repeat;
      background-size: contain;
      height: 14px;
      width: 14px;
    }
  }
  @media (max-width: 767px) {
    & button,
    & p {
      font-size: ${textBody3};
    }
  }
`;

export default function DropdownMenu({
  items,
  title,
  getValue,
  objectWithKey,
  defaultValue,
}) {
  const [currentValue, setCurrentValue] = useState(
    objectWithKey ? Object.keys(items)[0] : items[0]
  );

  const handleSelect = (e) => {
    setCurrentValue(e);
    getValue(e);
  };

  useEffect(() => {
    if (defaultValue) {
      setCurrentValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Container>
      {title && (
        <Text fontSize={h4} margin="0 5px">
          {title}
        </Text>
      )}
      <DropdownButton title={currentValue} onSelect={handleSelect}>
        {objectWithKey
          ? Object.keys(items).map((item) => (
              <Dropdown.Item
                key={item}
                eventKey={item}
                className={
                  currentValue.toLocaleLowerCase() ===
                    item.toLocaleLowerCase() && "active-item"
                }
              >
                {item}
              </Dropdown.Item>
            ))
          : items.map((item) => (
              <Dropdown.Item
                key={item}
                eventKey={item}
                className={
                  currentValue.toLocaleLowerCase() ===
                    item.toLocaleLowerCase() && "active-item"
                }
              >
                {item}
              </Dropdown.Item>
            ))}
      </DropdownButton>
    </Container>
  );
}
