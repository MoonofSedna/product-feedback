import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

import Image from "next/image";
// components
import { Card, CardBody, CardHeader } from "../../components/card";
import { Button, TextButton } from "../../components/button";
import { Title, SubTitle, Text } from "../../components/text";
import Spacer from "../../components/spacer";
import FeedbackCard from "../../components/feedback-card";
import { Form, TextArea } from "../../components/form";
// icons
import ArrowLeft from "../../public/images/icon-arrow-left.svg";
// utils
import { StyleSheet } from "../../utils/style-sheet";
import UserContext from "../../context";
import ValidateComment from "../../utils/validate-comment";
// hooks
import useValidation from "../../hooks/useValidation";

const {
  darkBlue,
  darkBlue2,
  darkBlue3,
  blue2,
  gray,
  gray3,
  purple,
  purple2,
  orange,
  orange2,
  white,
  red,
  lineColor,
  regular,
  semibold,
  bold,
  h1,
  h3,
  h4,
  blue,
  textBody2,
  textBody3,
  borderRadius,
  withoutBackground,
  boxShadow,
} = StyleSheet;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 40px;
  & > span {
    position: relative;
    top: 36px;
    z-index: 1;
    left: 32px;
  }
  & > div:first-of-type {
    margin-bottom: 30px;
  }

  & > .comments-container {
    padding: 32px 32px 5px 32px;
    > div:last-of-type > div {
      padding: 28px 0 0 0;
    }

    > div:last-of-type > div:not(:last-of-type) {
      border-bottom: 1px solid ${lineColor};
    }
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
  & > .add-comment {
    margin-top: 20px;
    padding: 30px 32px 30px 32px;
    p {
      padding: 15px 0;
    }
    h2 {
      padding-bottom: 20px;
    }
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      margin-top: 5px;
    }
  }
  @media (min-width: 767px) {
    & > .suggetions-container {
      padding: 30px 28px 20px 28px;
    }
  }
  @media (max-width: 1024px) {
    h2 {
      font-size: ${h3};
    }
    p {
      font-size: ${h4};
    }
  }
  @media (max-width: 767px) {
    padding: 25px 20px;
    max-width: 520px;
    & > .comments-container {
      padding: 22px;
    }
  }
  @media (max-width: 340px) {
    padding: 25px 10px;
  }
`;

const CommentCard = styled.div`
  display: grid;
  grid-template-columns: auto repeat(3, 1fr) auto;
  grid-template-rows: auto auto auto auto;
  grid-column-gap: 15px;
  & > div:first-of-type {
    width: 55px;
    & > span {
      grid-area: 1 / 1 / 2 / 2;
      & img {
        clip-path: circle();
      }
    }
  }
  > .card-content {
    grid-area: 1 / 2 / 2 / 4;
    width: 100%;
    padding-top: 5px;
    & > h3 {
      font-size: ${h4};
      font-weight: ${bold};
      line-height: 18px;
      color: ${darkBlue2};
    }
    & > small {
      font-size: ${h4};
      font-weight: ${regular};
      margin: 0;
      color: ${gray3};
    }
  }
  > .reply-button {
    grid-area: 1 / 5 / 2 / 6;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  > p {
    grid-area: 2 / 2 / 3 / 6;
    padding: 8px 0 25px 0;
    > span {
      color: ${purple};
      font-weight: ${bold};
    }
  }
  & .replies {
    grid-area: 3 / 1 / 4 / 6;
    margin-left: 19px;
    & > div {
      padding: 0 0 5px 22px;
      border-left: 1px solid ${lineColor};
    }
    p {
      padding: 8px 0 25px 0;
    }
    & > div:last-of-type {
      border: none;
      padding: 0 0 0 22px;
    }
    & > div:last-of-type > div:first-of-type {
      :before {
        content: "";
        position: relative;
        left: -11px;
        top: -12px;
        border-left: 1px solid ${lineColor};
        width: 20px;
      }
    }
  }
  & > form {
    grid-area: 4 / 2 / 5 / 6;
    display: grid;
    grid-template-columns: repeat(3, 1fr) auto;
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    padding: 0 0 30px 0;
    & > textarea {
      grid-area: 1 / 1 / 2 / 4;
    }
    & > button {
      grid-area: 1 / 4 / 2 / 5;
    }
  }
  @media (max-width: 767px) {
    & > p {
      grid-area: 2 / 1 / 3 / 6;
    }
    & .replies {
      margin: 0;
    }
    & > form {
      grid-area: 4 / 1 / 5 / 6;
    }
  }
  @media (max-width: 500px) {
    & > form {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      & > div {
        width: 100%;
        margin-top: 15px;
      }
      & > div button {
        width: 100%;
      }
    }
  }
`;

const RepliesLine = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  border-right: 1px solid ${lineColor};
  width: 20px;
  margin-top: 5px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export default function Suggestion() {
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState({ show: false, id: null });
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [isAComment, setIsAComment] = useState(false);

  const initialState = {
    comment: "",
    reply: "",
  };

  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { feedbacks, user } = useContext(UserContext);

  const addtoLocalStorage = () => {
    if (currentComment) {
      currentFeedback.comments[
        currentFeedback.comments.findIndex(
          (comment) => comment.id === currentComment.id
        )
      ] = currentComment;
    }
    feedbacks[feedbacks.findIndex((feedback) => feedback.id === id)] =
      currentFeedback;
    window.localStorage.setItem("newData", JSON.stringify(feedbacks));
  };

  const addComment = () => {
    const newComment = {
      content: values.comment,
      id: `comment-${currentFeedback.comments.length + 1}`,
      user: user,
    };

    const newReply = {
      content: values.reply,
      replyingTo: replyingTo,
      user: user,
      id: `reply-${currentComment?.replies?.length + 1}`,
    };

    if (isAComment) {
      currentFeedback.comments.push(newComment);
      addtoLocalStorage();
      setIsAComment(false);
    } else {
      if (currentComment.replies) {
        currentComment.replies?.push(newReply);
        addtoLocalStorage();
      } else {
        currentComment.replies = [newReply];
        addtoLocalStorage();
      }
    }
  };

  const { values, errors, characters, handleChange, handleSubmit } =
    useValidation(initialState, ValidateComment, addComment);

  const getFeedback = () => {
    const feedback = feedbacks.find((feedback) => feedback.id === parseInt(id));
    setCurrentFeedback(feedback);
    feedback && setLoading(false);
  };

  useEffect(() => {
    if (showForm) {
      setShowForm((p) => ({ ...showForm, show: true }));
    }
  }, [showForm.id]);

  useEffect(() => {
    id && getFeedback();
  }, [id]);

  const commentForm = ({ typeComment }) => (
    <form onSubmit={handleSubmit}>
      <TextArea
        height="80px"
        autoFocus={typeComment ? false : true}
        name={typeComment ? "comment" : "reply"}
        onChange={handleChange}
        maxLength={250}
      />
      <div>
        {typeComment && (
          <Text textColor={gray3}>{250 - characters} characters left</Text>
        )}
        <Button
          backgroundColor={purple}
          hoverBackgroundColor={purple2}
          textColor={white}
          fontSize={h4}
          className="color-button"
          type="submit"
          onClick={() => typeComment && setIsAComment(true)}
        >
          Post {typeComment ? "Comment" : "Reply"}
        </Button>
      </div>
    </form>
  );

  const replyCard = (reply, comment) => {
    return (
      <CommentCard key={reply.id}>
        <div>
          <Image
            src={reply.user.image}
            width={40}
            height={40}
            alt={reply.user.name}
            objectFit="contain"
          />
        </div>

        <div className="card-content">
          <SubTitle textColor={darkBlue}>{reply.user.name}</SubTitle>
          <small>@{reply.user.username}</small>
        </div>
        <div className="reply-button">
          <TextButton
            padding="0"
            fontSize={textBody3}
            fontWeight={semibold}
            textColor={blue}
            onClick={() => {
              setShowForm((p) => ({
                show: !showForm.show,
                id: `comment${comment.id}-${reply.id}`,
              }));
              setReplyingTo(reply.user.username);
              setCurrentComment(comment);
            }}
          >
            Reply
          </TextButton>
        </div>
        <Text textColor={gray3}>
          <span>@{reply.replyingTo} </span>
          {reply.content}
        </Text>
        {showForm.show &&
          showForm.id === `comment${comment.id}-${reply.id}` &&
          commentForm({ currentComment: comment })}
      </CommentCard>
    );
  };

  return (
    <Layout>
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
          <Button
            className="color-button"
            backgroundColor={blue}
            hoverBackgroundColor={blue2}
          >
            Edit Feedback
          </Button>
        </CardHeader>
        {!loading && (
          <>
            <FeedbackCard data={currentFeedback} />
            <Spacer height="20px" />
            <Card className="comments-container">
              <CardHeader backgroundColor={withoutBackground}>
                <Title
                  textColor={darkBlue}
                >{`${currentFeedback?.comments.length} Comments`}</Title>
              </CardHeader>
              <div>
                {currentFeedback?.comments.map((comment) => (
                  <CommentCard key={comment.id}>
                    <div>
                      <Image
                        src={comment.user.image}
                        width={40}
                        height={40}
                        alt={comment.user.name}
                        objectFit="contain"
                      />
                    </div>

                    <div className="card-content">
                      <SubTitle
                        textColor={darkBlue}
                      >{`${comment.user.name}`}</SubTitle>
                      <small>@{comment.user.username}</small>
                    </div>

                    <div className="reply-button">
                      <TextButton
                        padding="0"
                        fontSize={textBody3}
                        fontWeight={semibold}
                        textColor={blue}
                        onClick={() => {
                          setShowForm((p) => ({
                            show: !showForm.show,
                            id: comment.id,
                          }));
                          setReplyingTo(comment.user.username);
                          setCurrentComment(comment);
                        }}
                      >
                        Reply
                      </TextButton>
                    </div>
                    {comment.replies?.length > 0 && <RepliesLine />}
                    <Text textColor={gray3}>{`${comment.content}`}</Text>
                    {comment.replies?.length > 0 && (
                      <div className="replies">
                        {comment.replies.map((reply) =>
                          replyCard(reply, comment)
                        )}
                      </div>
                    )}
                    {showForm.show &&
                      showForm.id === comment.id &&
                      commentForm({ currentComment: comment })}
                  </CommentCard>
                ))}
              </div>
            </Card>
            <Card className="add-comment">
              <CardHeader backgroundColor={withoutBackground}>
                <Title textColor={darkBlue}>Add Comment</Title>
              </CardHeader>
              {commentForm({ typeComment: true })}
            </Card>
          </>
        )}
      </Container>
    </Layout>
  );
}
