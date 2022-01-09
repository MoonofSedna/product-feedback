import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// components
import { Card, CardHeader, CardBody } from "../components/card";
import styled from "@emotion/styled";
import Button from "../components/button";
import { Title, Text } from "../components/text";
import Tag from "../components/tag";
import FeedbackCard from "./feedback-card";
// images
import ArrowUpIcon from "../public/images/icon-arrow-up.svg";
import ArrowUpIconHover from "../public/images/ArrowWhite.svg";
import CommentIcon from "../public/images/icon-comments.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";

const Container = styled.div`
  & > a > div {
    margin: 20px 0;
  }
  @media (max-width: 767px) {
    padding: 22px;
    & > div {
      margin: 12px 0;
    }
    & > a:not(:first-of-type) > div {
      margin: 15px 0;
    }
  }
`;

export default function Suggestions({ data }) {
  return (
    <Container>
      {data?.map((data) => (
        <Link href={`suggestion/${data.id}`} key={data.id} passHref>
          <a>
            <FeedbackCard data={data} hoverCard />
          </a>
        </Link>
      ))}
    </Container>
  );
}
