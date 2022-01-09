import styled from "@emotion/styled";
// utils
import { StyleSheet } from "../utils/style-sheet";

const { gray3, white, bold, textBody } = StyleSheet;

const List = styled.ul`
  padding-left: 12px;
  list-style: none;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: ${textBody};
  font-weight: 400;
  line-height: 23px;
  color: ${gray3};
  padding: 4px 0;

  &::before {
    content: "\u25CF";
    position: relative;
    right: 12px;
    color: ${({ color }) => (color ? color : white)};
    font-weight: ${bold};
  }
  & p {
    float: right;
    font-size: ${textBody};
    font-weight: ${bold};
    line-height: 23px;
  }
`;

export { List, ListItem };
