import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Image from "next/image";
// components
import { Card, CardHeader } from "../components/card";
import { Button } from "../components/button";
import { Title } from "../components/text";
import Spacer from "../components/spacer";
import { Form, TextArea } from "../components/form";
import { TextButton } from "../components/button";
// images
import ArrowLeft from "../public/images/icon-arrow-left.svg";
import NewFeedback from "../public/images/icon-new-feedback.svg";
import EditFeedBack from "../public/images/icon-edit-feedback.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";
import DropdownMenu from "../components/dropdown";
import { itemCategories, itemStatus } from "../utils";

const {
  darkBlue2,
  darlBlue3,
  gray3,
  purple,
  purple2,
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

export default function FeedbackForm({
  feedback,
  values,
  errors,
  handleChange,
  handleSubmit,
  getCategory,
  getStatus,
  deleteFeedback,
}) {
  const router = useRouter();

  return (
    <Container>
      <CardHeader backgroundColor={withoutBackground}>
        <TextButton
          fontSize={h4}
          fontWeight={bold}
          textColor={gray3}
          onClick={() => router.back()}
          icon={ArrowLeft.src}
        >
          Go Back
        </TextButton>
      </CardHeader>
      <Image
        src={feedback ? EditFeedBack : NewFeedback}
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
        <Title>
          {feedback ? `Editing ${feedback.title}` : "Create a New Feedback"}
        </Title>

        <Form onSubmit={handleSubmit} defaultValue={feedback}>
          <div>
            <label>Feedback title</label>
            <small>Add a short, descriptive headline</small>
            <Spacer height="12px" />
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className={errors.title && "error"}
              defaultValue={feedback && values?.title}
            />
            {errors.title && <small data-cy="form-error">{errors.title}</small>}
          </div>
          <Spacer height="25px" />
          <div data-cy="category">
            <label>Category</label>
            <small>Choose a category for your feedback</small>
            <Spacer height="12px" />
            <DropdownMenu
              items={itemCategories}
              getValue={getCategory}
              defaultValue={feedback && values?.category}
              data="category"
            />
          </div>

          {feedback && (
            <div data-cy="status">
              <Spacer height="25px" />
              <label>Update Status</label>
              <small>Change feature state</small>
              <Spacer height="12px" />
              <DropdownMenu
                items={itemStatus}
                getValue={getStatus}
                defaultValue={feedback && values?.status}
                data="status"
              />
            </div>
          )}
          <Spacer height="25px" />
          <div>
            <label>Feedback Detail</label>
            <small>
              Include any specific comments on what should be improved, added,
              etc.
            </small>
            <Spacer height="12px" />
            <TextArea
              maxLength={120}
              padding="15px 22px"
              height="100px"
              name="description"
              onChange={handleChange}
              className={errors.description && "error"}
              defaultValue={feedback && values?.description}
            />
            {errors.description && (
              <small data-cy="form-error">{errors.description}</small>
            )}
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
                  onClick={deleteFeedback}
                  type="button"
                  data-cy="delete-feedback"
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
              data-cy="submit-feedback"
            >
              {feedback ? "Save Changes" : "Add Feedback"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
