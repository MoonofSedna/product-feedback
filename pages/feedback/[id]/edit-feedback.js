import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
// components
import Layout from "../../../components/layout";
import FeedbackForm from "../../../components/feedback-form";
import ValidateForm from "../../../utils/validate-form";
import FeedbackNotFound from "../../../components/feedback-not-found";
// hooks
import useValidation from "../../../hooks/useValidation";
// atoms
import { feedbacks as feedbackList } from "../../../recoil/atoms";

export default function EditFeedBack() {
  const [feedbacks, setFeedbacks] = useRecoilState(feedbackList);

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const {
    query: { id },
  } = router;

  const editFeedBack = () => {
    const newFeedback = {
      title: values.title,
      category: category.toLowerCase(),
      description: values.description,
      status: status.toLocaleLowerCase(),
      id: currentFeedback.id,
      upvotes: currentFeedback.upvotes,
      comments: currentFeedback.comments,
    };
    const feedbacksCopy = [...feedbacks];
    feedbacksCopy[
      feedbacksCopy.findIndex((feedback) => feedback.id === currentFeedback.id)
    ] = newFeedback;
    setFeedbacks(feedbacksCopy);
    window.localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    router.back();
  };

  const deleteFeedback = () => {
    setLoading(true);
    const feedbacksCopy = [...feedbacks];
    const index = feedbacksCopy.findIndex(
      (feedback) => feedback.id === currentFeedback.id
    );
    feedbacksCopy.splice(index, 1);
    setFeedbacks(feedbacksCopy);
    window.localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    router.push("/");
  };

  const getFeedback = () => {
    const feedback = feedbacks.find((feedback) => feedback.id === parseInt(id));
    setCurrentFeedback(feedback);
    setCategory(feedback?.category);
    setStatus(feedback?.status);
    setLoading(false);
  };

  useEffect(() => {
    id && getFeedback();
  }, [id, feedbacks]);

  const { values, errors, handleChange, handleSubmit } = useValidation(
    currentFeedback,
    ValidateForm,
    editFeedBack,
    currentFeedback
  );

  const formProps = { values, errors, handleChange, handleSubmit };

  return (
    <Layout>
      {!loading && currentFeedback && (
        <FeedbackForm
          {...formProps}
          feedback={currentFeedback}
          getCategory={setCategory}
          getStatus={setStatus}
          deleteFeedback={() => deleteFeedback()}
        />
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
    </Layout>
  );
}
