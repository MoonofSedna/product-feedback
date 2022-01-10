import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
// components
import FeedbackCard from "./feedback-card";
// utils
import addVote from "../utils/addVote";
import { StyleSheet } from "../utils/style-sheet";
// atoms
import { feedbacks } from "../recoil/atoms";

const { blue } = StyleSheet;

const Container = styled.div`
  & > div {
    margin: 20px 0;
    h2 {
      cursor: pointer;
      :hover {
        color: ${blue};
      }
    }
  }
  @media (max-width: 767px) {
    padding: 22px;
    & > div {
      margin: 12px 0;
    }
    & > div {
      margin: 15px 0;
    }
    & > div {
      margin-bottom: 15px;
    }
  }
`;

export default function Suggestions({ data }) {
  const [suggestions, setSuggestions] = useRecoilState(feedbacks);
  return (
    <Container>
      {data.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          data={feedback}
          hoverCard
          withLink
          vote={() => addVote(feedback, suggestions, setSuggestions)}
        />
      ))}
    </Container>
  );
}
