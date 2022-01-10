import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
// components
import Layout from "../components/layout";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Title, SubTitle } from "../components/text";
import Spacer from "./spacer";
// images
import Empty from "../public/images/illustration-empty.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";

const {
  darkBlue2,
  gray3,
  regular,
  purple,
  purple2,
  white,
  textBody,
  h1,
  h3,
  h4,
  borderRadius,
  withoutBackground,
} = StyleSheet;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background-color: ${({ background }) =>
    background ? background : withoutBackground};
  margin: 25px 0;
  border-radius: ${borderRadius};
  > div p {
    margin: 0;
  }
  > div span {
    margin-bottom: 10px;
  }
  @media (max-width: 767px) {
    margin: 36px 22px;
    > div h2 {
      font-size: ${h3};
    }
    > div p {
      font-size: ${h4};
    }
  }
`;

export default function FeedbackNotFound({
  title,
  backgroundColor,
  description,
  buttonText,
  buttonIcon,
  goBack,
}) {
  const router = useRouter();
  return (
    <Container background={backgroundColor}>
      <Card
        margin="20px 0"
        minHeight="100%"
        display="flex"
        justifyContent="center"
        alingItem="center"
        backgroundColor={backgroundColor ? backgroundColor : withoutBackground}
      >
        <Image
          src={Empty}
          alt="comment"
          width="130px"
          height="137px"
          objectFit="contain"
        />
        <Spacer height="50px" />
        <Title align="center" textColor={darkBlue2} fontSize={h1}>
          {title}
        </Title>
        <Spacer height="20px" />
        <SubTitle
          textColor={gray3}
          align="center"
          fontWeight={regular}
          fontSize={textBody}
        >
          {description}
        </SubTitle>
        <Spacer height="40px" />
        {goBack ? (
          <Button
            backgroundColor={purple}
            hoverBackgroundColor={purple2}
            textColor={white}
            fontSize={h4}
            className="color-button"
            onClick={() => router.push("/")}
            icon={buttonIcon && buttonIcon.src}
          >
            {buttonText}
          </Button>
        ) : (
          <Link href="/add-feedback" passHref>
            <Button
              backgroundColor={purple}
              hoverBackgroundColor={purple2}
              textColor={white}
              fontSize={h4}
              icon={buttonIcon && buttonIcon.src}
              className="color-button"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </Card>
    </Container>
  );
}
