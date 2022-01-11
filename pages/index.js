import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
// components
import Layout from "../components/layout";
import { Card, CardHeader } from "../components/card";
import { Button } from "../components/button";
import { Title } from "../components/text";
import Aside from "../components/aside";
import Suggestions from "../components/suggetions";
import DropdownButton from "../components/dropdown";
import FeedbackNotFound from "../components/feedback-not-found";
// images
import SuggestionsIcon from "../public/images/icon-suggestions.svg";
import Plus from "../public/images/icon-plus.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";
import { itemOrder, itemCategories } from "../utils";
// atoms
import { feedbacks } from "../recoil/atoms";

const { darkBlue, purple, purple2, white, h3, h4, withoutBackground } =
  StyleSheet;

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
  const [suggestions, setSuggestions] = useRecoilState(feedbacks);

  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState(Object.keys(itemOrder)[0]);
  const [filteredData, setFilteredData] = useState([]);

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
    setFilteredData(filterData);
  };

  useEffect(() => {
    filterSuggestions();
  }, [sortBy, filterBy, suggestions]);

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
              data="sort-by"
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
          {filteredData.length > 0 ? (
            <Suggestions
              data={filteredData}
              feedbacks={suggestions}
              setFeedbacks={setSuggestions}
            />
          ) : (
            <FeedbackNotFound
              title="There is no feedback yet."
              description={
                <>
                  <p>
                    Got a suggestion? Found a bug that needs to be squashed?
                  </p>
                  <p> We love hearing about new ideas to improve our app.</p>
                </>
              }
              buttonText="Add Feedback"
              buttonIcon={Plus}
              backgroundColor={white}
            />
          )}
        </Card>
      </Container>
    </Layout>
  );
}
