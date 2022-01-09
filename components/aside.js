import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Card, CardHeader } from "./card";
import { List, ListItem } from "./list";
import { Title, Text } from "./text";
import { Button } from "./button";
import NavButton from "./nav-button";
import Spacer from "./spacer";
// images
import background from "../public/images/background-header.png";
import backgroundTablet from "../public/images/background-header-tablet.png";
import backgroundMobile from "../public/images/background-header-mb.png";
// utils
import { StyleSheet } from "../utils/style-sheet";

const {
  darkBlue2,
  gray3,
  orange,
  blue,
  lightBlue,
  purple,
  white,
  flexEnd,
  h3,
  textBody2,
  textBody3,
  cardPadding,
} = StyleSheet;

const Container = styled.div`
  & > div {
    margin-bottom: 20px;
    padding: ;
  }
  & > div:first-of-type {
    min-height: 137px;
    & div {
      margin: 0;
    }
  }
  & > div {
    padding: ${cardPadding};
  }
  & .aside-card button:not(:last-of-type) {
    margin: 0 8px 12px 0;
  }
  & div .active-button,
  div .active-button:hover {
    background: ${blue};
    color: ${white};
  }
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
    & .aside-card h2 {
      margin: 0;
    }
    & > .aside-card:nth-child(2) {
      padding: 25px 15px 25px 28px;
    }

    & .aside-card button:not(:last-of-type) {
      margin: 0 8px 12px 0;
    }
    & > div:first-of-type {
      background: url(${backgroundTablet.src});
      background-size: cover;
    }
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    & > div:first-of-type {
      background: url(${backgroundMobile.src});
      background-size: cover;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      min-height: auto;
      border-radius: 0;
      margin: 0;
      padding: 15px 22px;
      z-index: 1050;
      & > div h2 {
        font-size: ${textBody2};
        line-height: 22px;
      }
      & > div p {
        font-size: ${textBody3};
      }
    }
    & > div:not(:first-of-type) {
      display: none;
    }
  }
`;

export default function Aside({ suggestions, categories, getValue, active }) {
  const getStatus = (status) => {
    return suggestions.filter((suggestion) => suggestion.status === status)
      .length;
  };

  const cards = (
    <>
      <Card className="aside-card">
        <Button
          className={active === "all" && "active-button"}
          key="all"
          onClick={() => {
            getValue("all");
          }}
        >
          All
        </Button>
        {categories.map((category) => {
          const currentCategory = category.toLocaleLowerCase();
          return (
            <Button
              className={active === currentCategory && "active-button"}
              key={category}
              onClick={() => {
                getValue(currentCategory);
              }}
            >
              {category}
            </Button>
          );
        })}
      </Card>
      <Card className="aside-card">
        <CardHeader>
          <Title fontSize={h3} textColor={darkBlue2}>
            Roadmap
          </Title>
          <Link href="/roadmap">View</Link>
        </CardHeader>
        <Spacer height="18px" />
        <List>
          <ListItem color={orange}>
            Planned <Text textColor={gray3}>{getStatus("planned")}</Text>
          </ListItem>
          <ListItem color={purple}>
            In-Progress{" "}
            <Text textColor={gray3}>{getStatus("in-progress")}</Text>
          </ListItem>
          <ListItem color={lightBlue}>
            Live <Text textColor={gray3}>{getStatus("live")}</Text>
          </ListItem>
        </List>
      </Card>
    </>
  );

  return (
    <Container>
      <Card display="flex" background={background.src} justifyContent={flexEnd}>
        <div>
          <Title>Frontend Mentor</Title>
          <Text>Feedback Board</Text>
        </div>
        <NavButton>{cards}</NavButton>
      </Card>
      {cards}
    </Container>
  );
}
