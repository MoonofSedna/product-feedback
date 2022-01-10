import React, { useContext, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// components
import { Card, CardHeader } from "../../components/card";
import { Button, TextButton } from "../../components/button";
import { Title, SubTitle, Text } from "../../components/text";
import Spacer from "../../components/spacer";
import FeedbackCard from "../../components/feedback-card";
import { TextArea } from "../../components/form";
import FeedbackNotFound from "../../components/feedback-not-found";
// icons
import ArrowLeft from "../../public/images/icon-arrow-left.svg";
// utils
import { StyleSheet } from "../../utils/style-sheet";
import addVote from "../../utils/addVote";
// context
import UserContext from "../../context";
// atoms
import { feedbacks as feedbackList } from "../../recoil/atoms";

const {
  darkBlue,
  darkBlue2,
  blue2,
  gray3,
  purple,
  purple2,
  white,
  blue,
  lineColor,
  regular,
  semibold,
  bold,
  h3,
  h4,
  textBody3,
  withoutBackground,
  borderRadius,
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
  }
  @media (max-width: 340px) {
    padding: 25px 10px;
  }
`;

const CommentsContainer = styled.div`
  padding: 32px 32px 5px 32px;
  min-height: 100px;
  background-color: ${white};
  border-radius: ${borderRadius};
  > div:last-of-type > div {
    padding: 28px 0 0 0;
  }

  > div:last-of-type > div:not(:last-of-type) {
    border-bottom: 1px solid ${lineColor};
  }

  @media (max-width: 767px) {
    padding: 22px;
    min-height: 70px;
  }
`;

const Replies = styled.div`
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
      line-height: 15px;
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
  const [feedbacks, setFeedbacks] = useRecoilState(feedbackList);

  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState({ show: false, id: null });
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [message, setMessage] = useState({});
  const [characters, setCharacters] = useState(0);

  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { user } = useContext(UserContext);

  const addToLocalStorage = (comment) => {
    const data = [...feedbacks];
    const newFeedback = {
      ...currentFeedback,
      comments: comment,
    };
    setCurrentFeedback(newFeedback);
    data[data.findIndex((feedback) => feedback.id === newFeedback.id)] =
      newFeedback;
    setFeedbacks(data);
    window.localStorage.setItem("feedbacks", JSON.stringify(data));
    setMessage({});
    setCharacters(0);
  };

  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      content: message.comment,
      id: `comment-${currentFeedback.comments.length + 1}`,
      user: user,
    };
    if (!message.comment) {
      return;
    }
    const comment = [...currentFeedback.comments, newComment];
    addToLocalStorage(comment);
    e.target.reset();
  };

  const addReply = (e) => {
    e.preventDefault();
    if (!message.reply) {
      return;
    }
    const newReply = {
      content: message.reply,
      replyingTo: replyingTo,
      user: user,
      id: `reply-${currentComment?.replies?.length + 1}`,
    };
    const reply = currentComment.replies
      ? [...currentComment.replies, newReply]
      : [newReply];
    const newComments = { ...currentComment, replies: reply };
    const comment = [...currentFeedback.comments];
    comment[comment.findIndex((feedback) => feedback.id === newComments.id)] =
      newComments;
    setCurrentComment(newComments);
    addToLocalStorage(comment);
    e.target.reset();
  };

  const getFeedback = () => {
    const feedback = feedbacks.find((feedback) => feedback.id === parseInt(id));
    setCurrentFeedback(feedback);
    setLoading(false);
  };

  useEffect(() => {
    if (showForm) {
      setShowForm((p) => ({ ...showForm, show: true }));
    }
    setMessage({});
  }, [showForm.id]);

  useEffect(() => {
    id && getFeedback();
  }, [id, feedbacks]);

  const handleChange = (e, type) => {
    setMessage({ [e.target.name]: e.target.value });
    type === "comment" && setCharacters(e.target.value.length);
  };

  const commentForm = ({ typeComment }) => (
    <form onSubmit={(e) => (typeComment ? addComment(e) : addReply(e))}>
      <TextArea
        height="80px"
        autoFocus={typeComment ? false : true}
        name={typeComment ? "comment" : "reply"}
        onChange={(e) => handleChange(e, typeComment ? "comment" : "reply")}
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
        {!loading && currentFeedback && (
          <>
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
              <Link href={`${id}/edit-feedback`} passHref>
                <Button
                  className="color-button"
                  backgroundColor={blue}
                  hoverBackgroundColor={blue2}
                >
                  Edit Feedback
                </Button>
              </Link>
            </CardHeader>

            <FeedbackCard
              data={currentFeedback}
              vote={() => addVote(currentFeedback, feedbacks, setFeedbacks)}
            />
            <Spacer height="20px" />
            <CommentsContainer>
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
                      <Replies>
                        {comment.replies.map((reply) =>
                          replyCard(reply, comment)
                        )}
                      </Replies>
                    )}
                    {showForm.show &&
                      showForm.id === comment.id &&
                      commentForm({ currentComment: comment })}
                  </CommentCard>
                ))}
              </div>
            </CommentsContainer>
            <Card className="add-comment">
              <CardHeader backgroundColor={withoutBackground}>
                <Title textColor={darkBlue}>Add Comment</Title>
              </CardHeader>
              {commentForm({ typeComment: true })}
            </Card>
          </>
        )}
        {!loading && !currentFeedback && (
          <Layout>
            <FeedbackNotFound
              title="This feedback does not exist"
              description=" Go back and try again"
              buttonText="Go Back"
              goBack
            />
          </Layout>
        )}
      </Container>
    </Layout>
  );
}
