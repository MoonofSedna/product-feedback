import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
// components
import Layout from "../components/layout";
import { Card, CardHeader, CardBody } from "../components/card";
import { Button } from "../components/button";
import { Title, SubTitle } from "../components/text";
import Aside from "../components/aside";
import Suggestions from "../components/suggetions";
import Spacer from "../components/spacer";
import DropdownButton from "../components/dropdown";
// images
import SuggestionsIcon from "../public/images/icon-suggestions.svg";
import Plus from "../public/images/icon-plus.svg";
import Empty from "../public/images/illustration-empty.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";
import { itemOrder, itemCategories } from "../utils";
// context
import UserContext from "../context";

const {
  darkBlue,
  darkBlue2,
  gray3,
  purple,
  purple2,
  white,
  regular,
  h1,
  h3,
  h4,
  textBody,
  withoutBackground,
} = StyleSheet;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 255px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
  & .card-header-cs > div:first-of-type {
    margin-right: 40px;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 750px;
    div .card-header-cs {
      margin-top: 20px;
    }
    div .card-header-cs h2 {
      font-size: ${h3};
    }
  }
  @media (max-width: 767px) {
    div .card-header-cs {
      display: flex;
      border-radius: 0px;
      padding: 10px 20px 10px 18px;
      margin: 0;
    }
    & > div > .card-header-cs > div:first-of-type {
      display: none;
    }
  }
`;

export default function Home() {
  const { feedbacks } = useContext(UserContext);

  const [suggestions, setSuggestions] = useState(feedbacks);
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState(Object.keys(itemOrder)[0]);

  const suggestionsLength = suggestions.filter(
    (item) => item.status === "suggestion"
  );

  const filterSuggestions = () => {
    const orderKey = itemOrder[sortBy];

    const sortData = suggestionsLength.sort(function (a, b) {
      if (orderKey.order === "desc") {
        if (orderKey.data === "comments") {
          return b[orderKey.data].length - a[orderKey.data].length;
        } else {
          return b[orderKey.data] - a[orderKey.data];
        }
      } else {
        if (orderKey.data === "comments") {
          return a[orderKey.data].length - b[orderKey.data].length;
        } else {
          return a[orderKey.data] - b[orderKey.data];
        }
      }
    });

    const filterData = sortData.filter((item) => {
      if (filterBy === "all") {
        return sortData;
      } else {
        return item.category === filterBy;
      }
    });

    return filterData;
  };

  return (
    <Layout>
      <Container>
        <Aside
          active={filterBy}
          suggestions={suggestions}
          categories={itemCategories}
          getValue={(value) => setFilterBy(value)}
        />
        <Card minHeight="100%" padding="0" backgroundColor={withoutBackground}>
          <CardHeader
            padding="25px"
            display="grid"
            gridTemplateColumns="auto 1fr auto"
            backgroundColor={darkBlue}
            className="card-header-cs"
          >
            <CardHeader backgroundColor={darkBlue}>
              <Image
                objectFit="contain"
                src={SuggestionsIcon}
                className="suggestion-icon"
                alt="suggestions"
              />
              <Title>{suggestionsLength.length} Suggestions</Title>
            </CardHeader>
            <DropdownButton
              title="Sort by:"
              items={itemOrder}
              getValue={(value) => setSortBy(value)}
              objectWithKey
            />
            <Link href="/add-feedback" passHref>
              <Button
                backgroundColor={purple}
                hoverBackgroundColor={purple2}
                textColor={white}
                fontSize={h4}
                icon={Plus.src}
                className="color-button"
              >
                Add Feedback
              </Button>
            </Link>
          </CardHeader>
          {filterSuggestions().length > 0 ? (
            <Suggestions data={filterSuggestions()} />
          ) : (
            <Card
              margin="20px 0"
              minHeight="100%"
              display="flex"
              justifyContent="center"
              alingItem="center"
            >
              <Image
                src={Empty}
                alt="comment"
                width="130px"
                height="137px"
                objectFit="contain"
              />
              <Spacer height="40px" />
              <Title align="center" textColor={darkBlue2} fontSize={h1}>
                There is no feedback yet.
              </Title>
              <Spacer height="20px" />
              <SubTitle
                textColor={gray3}
                align="center"
                fontWeight={regular}
                fontSize={textBody}
              >
                Got a suggestion? Found a bug that needs to be squashed?
                <br></br>
                We love hearing about new ideas to improve our app.
              </SubTitle>
              <Spacer height="20px" />
              <Link href="/add-feedback" passHref>
                <Button
                  backgroundColor={purple}
                  hoverBackgroundColor={purple2}
                  textColor={white}
                  fontSize={h4}
                  icon={Plus.src}
                  className="color-button"
                >
                  Add Feedback
                </Button>
              </Link>
            </Card>
          )}
        </Card>
      </Container>
    </Layout>
  );
}
