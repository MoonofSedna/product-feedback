import styled from "@emotion/styled";
// utils
import { StyleSheet } from "../utils/style-sheet";

const { white, bold, regular, textBody, h2, h3, gray3 } = StyleSheet;

const Title = styled.h2`
  line-height: 29px;
  letter-spacing: -0.25px;
  font-weight: ${({ fontWeight }) => fontWeight || bold};
  text-align: ${({ align }) => align};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : h2)};
  color: ${({ textColor }) => (textColor ? textColor : white)};
`;

const SubTitle = styled.h3`
  display: ${({ display }) => display};
  font-weight: ${({ fontWeight }) => fontWeight || regular};
  text-align: ${({ align }) => align};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : h3)};
  color: ${({ textColor }) => (textColor ? textColor : gray3)};
  line-height: 23px;
  cursor: ${({ cursor }) => cursor};
  :hover {
    text-decoration: ${({ decoration }) => decoration};
  }
`;

const Text = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : textBody)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : regular)};
  color: ${({ textColor }) => (textColor ? textColor : white)};
  text-align: ${({ align }) => align};
  line-height: 22px;
  letter-spacing: -0.25px;
  opacity: 0.75;
  margin: ${({ margin }) => (margin ? `${margin}` : 0)};
  white-space: pre-line;
`;

export { Title, Text, SubTitle };
