import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
// components
import Layout from "../components/layout";
import { Card, CardHeader } from "../components/card";
import { Button } from "../components/button";
import { Title, SubTitle } from "../components/text";
import Spacer from "../components/spacer";
import { Form, TextArea } from "../components/form";
// images
import ArrowLeft from "../public/images/icon-arrow-left.svg";
import NewFeedback from "../public/images/icon-new-feedback.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";
import DropdownMenu from "../components/dropdown";
import ValidateForm from "../utils/validate-form";
import { itemCategories, itemStatus } from "../utils";
// hooks
import useValidation from "../hooks/useValidation";
import UserContext from "../context";

const {
  darkBlue2,
  darlBlue3,
  gray,
  gray3,
  purple,
  purple2,
  orange,
  orange2,
  white,
  red,
  bold,
  h1,
  h3,
  h4,
  textBody3,
  withoutBackground,
} = StyleSheet;

const Container = styled.div`
  width: 100%;
  max-width: 620px;
  padding: 0 40px;
  & > span {
    position: relative;
    top: 36px;
    z-index: 1;
    left: 32px;
  }
  & div > h2 {
    font-size: ${h1};
    color: ${darkBlue2};
    margin-bottom: 35px;
  }

  & .button-container {
    display: grid;
    justify-content: flex-end;
    align-items: center;
    grid-template-columns: 1fr repeat(2, auto);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    & > div:first-of-type {
      justify-content: flex-center;
    }
    & button {
      font-size: ${h4};
    }
  }

  @media screen and (max-width: 767px) {
    padding: 25px 20px;
    max-width: 420px;
    & > span {
      position: relative;
      top: 36px;
      z-index: 1;
      left: 25px;
      top: 30px;
      width: 20px;
      & span img {
        width: 40px !important;
        height: 40px !important;
      }
    }
    & > div:last-of-type {
      padding: 50px 25px 20px 25px !important;
    }
    & div > h2 {
      font-size: ${h3};
      margin-bottom: 20px;
    }
    & .button-container {
      display: flex;

      flex-direction: column-reverse;
      grid-row-gap: 12px;
      & > div:first-of-type {
        width: 100%;
      }
      & button {
        font-size: ${textBody3};
        width: 100%;
      }
    }
  }
`;

export default function AddFeedBack({ feedback }) {
  const [category, setCategory] = useState("all");

  const router = useRouter();

  const { feedbacks } = useContext(UserContext);

  const initialState = {
    title: "",
    category: "",
    description: "",
  };

  const addSuggestion = () => {
    const newFeedback = {
      title: values.title,
      category: category.toLowerCase(),
      description: values.description,
      status: "suggestion",
      id: feedbacks.length + 1,
      upvotes: 0,
      comments: [],
    };
    feedbacks.push(newFeedback);
    window.localStorage.setItem("newData", JSON.stringify(feedbacks));
    router.push("/");
  };

  const { values, errors, handleChange, handleSubmit } = useValidation(
    initialState,
    ValidateForm,
    addSuggestion
  );

  return (
    <Layout>
      <Container>
        <CardHeader backgroundColor={withoutBackground}>
          <SubTitle
            display="flex"
            fontSize={h4}
            fontWeight={bold}
            textColor={gray3}
            cursor="pointer"
            decoration="underline"
            onClick={() => router.back()}
          >
            <Image
              src={ArrowLeft}
              width={8}
              height={8}
              objectFit="contain"
              alt="arrow"
            />
            <Spacer width="10px" />
            Go Back
          </SubTitle>
        </CardHeader>
        <Image
          src={NewFeedback}
          alt="comment"
          width="56px"
          height="56px"
          objectFit="contain"
        />
        <Card
          display="flex"
          justifyContent="center"
          padding="50px 40px 40px 40px"
        >
          <Title>Create a New Feedback</Title>

          <Form onSubmit={handleSubmit}>
            <div>
              <label>Feedback title</label>
              <small>Add a short descriptive headline</small>
              <Spacer height="12px" />
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                className={errors.title && "error"}
              />
              {errors.title && <small>{errors.title}</small>}
            </div>
            <Spacer height="25px" />
            <div>
              <label>Category</label>
              <small>Choose a category for your feedback</small>
              <Spacer height="12px" />
              <DropdownMenu items={itemCategories} getValue={setCategory} />
            </div>

            {feedback && (
              <div>
                <Spacer height="25px" />
                <label>Update Status</label>
                <small>Change feature state</small>
                <Spacer height="12px" />
                <DropdownMenu items={itemStatus} />
              </div>
            )}
            <Spacer height="25px" />
            <div>
              <label>Feedbgack Detail</label>
              <small>
                Include any specific comments on what should be improved, added,
                etc.
              </small>
              <Spacer height="12px" />
              <TextArea
                height="100px"
                name="description"
                value={values.description}
                onChange={handleChange}
                className={errors.description && "error"}
              />
              {errors.description && <small>{errors.description}</small>}
            </div>
            <Spacer height="40px" />

            <div className="button-container">
              <div>
                {feedback && (
                  <Button
                    backgroundColor={red}
                    hoverBackgroundColor={orange2}
                    textColor={white}
                    fontSize={h4}
                    className="color-button"
                  >
                    Delete
                  </Button>
                )}
              </div>

              <Button
                backgroundColor={darkBlue2}
                hoverBackgroundColor={darlBlue3}
                textColor={white}
                fontSize={h4}
                className="color-button"
                onClick={() => router.back()}
                type="button"
              >
                Cancel
              </Button>
              <Button
                backgroundColor={purple}
                hoverBackgroundColor={purple2}
                className="color-button"
                type="submit"
              >
                Add Feedback
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
}
