import styled from "@emotion/styled";
// utils
import { StyleSheet } from "../utils/style-sheet";

const { gray, blue, borderRadius, semiBold } = StyleSheet;

const Tag = styled.div`
  display: inline-block;
  background: ${gray};
  color: ${blue};
  text-transform: ${({ textTransform }) => textTransform};
  padding: 5px 18px;
  border-radius: ${borderRadius};
  font-weight: ${semiBold};
  line-height: 19px;
  letter-spacing: -0.25px;
  font-size: 13px;
  // margins
  margin: ${({ margin }) => `${margin}`};
`;

export default Tag;
