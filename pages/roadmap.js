import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// components
import { Card, CardHeader } from "../components/card";
import { Button, TextButton } from "../components/button";
import { Text, Title } from "../components/text";
import Tag from "../components/tag";
import Layout from "../components/layout";
// utils
import { StyleSheet } from "../utils/style-sheet";
import addVote from "../utils/addVote";
// icons
import Plus from "../public/images/icon-plus.svg";
import ArrowLeft from "../public/images/white-arrow-left-icon.svg";
import ArrowUpIcon from "../public/images/icon-arrow-up.svg";
import ArrowUpIconHover from "../public/images/ArrowWhite.svg";
import CommentIcon from "../public/images/icon-comments.svg";
// atoms
import { feedbacks as feedbackList } from "../recoil/atoms";
// hooks
import useScreenSize from "../hooks/useScreenSize";

const {
  darkBlue,
  darkBlue2,
  gray3,
  purple,
  purple2,
  white,
  orange,
  lightBlue,
  lineColor,
  bold,
  h3,
  h4,
  blue,
  textBody3,
  textBody,
  withoutBackground,
} = StyleSheet;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  & .card-header-cs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  @media (max-width: 1024px) {
    padding: 0 0 30px 0;
  }
  @media (max-width: 767px) {
    & .card-header-cs {
      border-radius: 0;
      padding: 20px;
    }
  }
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: flex-start;
  & .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 30px;
    border-radius: 5px;
    :not(:last-of-type) {
      margin-bottom: 20px;
    }
    h2 {
      cursor: pointer;
      line-height: 20px;
      :hover {
        color: ${blue};
      }
    }
    h2,
    > div > p {
      margin-bottom: 10px;
    }
    > div:first-of-type p:first-of-type {
      color: ${gray3};
      text-transform: capitalize;
      ::before {
        content: "\u25CF";
        padding-right: 20px;
      }
    }
    > div:last-of-type {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 5px 0;
      > button {
        flex-direction: row;
        padding: 8px 18px;
        color: ${darkBlue2};
        :focus,
        :active {
          color: ${white};
        }
        ::before {
          margin-right: 8px;
        }
      }
    }
  }
  & .planned {
    border-top: 5px solid ${orange};
    p:before {
      color: ${orange};
    }
  }
  & .in-progress {
    border-top: 5px solid ${purple};
    p:before {
      color: ${purple};
    }
  }
  & .live {
    border-top: 5px solid ${lightBlue};
    p:before {
      color: ${lightBlue};
    }
  }
  @media (max-width: 1024px) {
    & .card-content:not(:last-of-type) {
      margin-bottom: 15px;
    }
    & .card-content h2,
    & .card-content p {
      font-size: ${textBody3};
      line-height: 15px;
    }
    &.card-content {
      div:first-of-type p:first-of-type {
        &::before {
          padding-right: 10px;
        }
      }
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media (max-width: 1024px) {
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
    > div:first-of-type {
      margin-bottom: 20px;
      h2 {
        color: ${darkBlue2};
        font-size: ${h3};
      }
      p {
        color: ${gray3};
        font-size: ${textBody3};
      }
    }
  }
`;

const CardStatusHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 45px 0 35px 0;
  background: ${withoutBackground};
  > div {
    h2 {
      color: ${darkBlue2};
      font-size: ${h3};
    }
    p {
      color: ${gray3};
      font-size: ${textBody};
    }
  }
  @media (max-width: 1024px) {
    > div > h2,
    > div > p {
      font-size: ${h4};
    }
  }
  @media (max-width: 767px) {
    border-bottom: 1px solid ${lineColor};
    padding: 0 20px;
    grid-column-gap: 10px;
    margin-bottom: 25px;
    > div {
      height: 100%;
      h2 {
        text-align: center;
        cursor: pointer;
        padding: 15px 0 12px 0;
      }
      p {
        display: none;
      }
    }
    .in-progress {
      border-bottom: 3px solid ${purple};
    }
    .planned {
      border-bottom: 3px solid ${orange};
    }
    .live {
      border-bottom: 3px solid ${lightBlue};
    }
  }
`;

export default function Roadmap() {
  const [feedbacks, setFeedbacks] = useRecoilState(feedbackList);

  const [feedbackType, setFeedbackType] = useState({});
  const [currentStatus, setCurrentStatus] = useState(null);

  const router = useRouter();

  const mobile = useScreenSize({ size: "767px" });

  const feedbackLength = (value) => {
    return feedbacks.filter((item) => item.status === value);
  };

  useEffect(() => {
    setFeedbackType({
      planned: {
        title: "Planned",
        description: "Ideas prioritized for research",
        data: feedbackLength("planned"),
      },
      "in-progress": {
        title: "In-Progress",
        description: "Currently being developed",
        data: feedbackLength("in-progress"),
      },
      live: {
        title: "Live",
        description: "Released features",
        data: feedbackLength("live"),
      },
    });
  }, [feedbacks]);

  useEffect(() => {
    if (feedbackType) {
      mobile && setCurrentStatus(feedbackType["in-progress"]);
    }
  }, [feedbackType, mobile]);

  const card = (item) => (
    <Card
      className={`card-content ${item.status}`}
      key={item.id}
      backgroundColor={white}
    >
      <div>
        <Text>{item.status}</Text>
        <Link href={`/feedback/${item.id}`} passHref>
          <Title fontSize={h3} textColor={darkBlue2}>
            {item.title}
          </Title>
        </Link>

        <Text textColor={gray3}>{item.description}</Text>
        <Tag
          margin="10px 0"
          textTransform={
            item.category === "ux" || item.category === "ui"
              ? "uppercase"
              : "capitalize"
          }
        >
          {item.category}
        </Tag>
      </div>
      <div>
        <Button
          display="flex"
          padding="12px"
          minWidth="45px"
          icon={ArrowUpIcon.src}
          iconHover={ArrowUpIconHover.src}
          onClick={() => addVote(item, feedbacks, setFeedbacks)}
        >
          {item.upvotes}
        </Button>
        <CardHeader>
          <Image
            src={CommentIcon}
            alt={"comment"}
            className="comment-icon"
            priority={true}
          />
          <Text textColor={darkBlue2} fontWeight={bold} icon={CommentIcon.src}>
            {item.comments.length}
          </Text>
        </CardHeader>
      </div>
    </Card>
  );

  return (
    <Layout>
      <Container>
        <Card padding="0" backgroundColor={withoutBackground}>
          <CardHeader
            padding="25px"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            backgroundColor={darkBlue}
            className="card-header-cs"
          >
            <CardHeader backgroundColor={darkBlue}>
              <TextButton
                textColor={white}
                icon={ArrowLeft.src}
                fontSize={h4}
                onClick={() => router.back()}
              >
                Go Back
              </TextButton>
              <Title>Roadmap</Title>
            </CardHeader>

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
          <CardStatusHeader>
            {Object.keys(feedbackType).map((status) => {
              const data = feedbackType[status];
              return (
                <div
                  key={status}
                  className={
                    mobile && currentStatus?.title.toLowerCase() === status
                      ? `${status}`
                      : ""
                  }
                >
                  <Title
                    onClick={() => {
                      mobile && setCurrentStatus(data);
                    }}
                  >
                    {data.title} ({feedbackLength(status).length})
                  </Title>
                  <Text>{data.description}</Text>
                </div>
              );
            })}
          </CardStatusHeader>

          <CardsContainer backgroundColor={withoutBackground} padding="0">
            {mobile ? (
              <>
                <div>
                  <Title>{`${currentStatus?.title} (${currentStatus?.data.length})`}</Title>
                  <Text>{currentStatus?.description}</Text>
                </div>
                <CardGrid
                  key={currentStatus}
                  backgroundColor={withoutBackground}
                >
                  {currentStatus?.data.map((item) => card(item))}
                </CardGrid>
              </>
            ) : (
              Object.keys(feedbackType).map((status) => {
                const data = feedbackType[status].data;
                return (
                  <CardGrid key={status} backgroundColor={withoutBackground}>
                    {data.map((item) => card(item))}
                  </CardGrid>
                );
              })
            )}
          </CardsContainer>
        </Card>
      </Container>
    </Layout>
  );
}
