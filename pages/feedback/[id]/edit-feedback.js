import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
// components
import Layout from "../../../components/layout";
import FeedbackForm from "../../../components/feedback-form";
import ValidateForm from "../../../utils/validate-form";
// hooks
import useValidation from "../../../hooks/useValidation";
import UserContext from "../../../context";

export default function EditFeedBack() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { feedbacks } = useContext(UserContext);

  const addSuggestion = () => {
    const newFeedback = {
      title: values.title,
      category: category.toLowerCase(),
      description: values.description,
      status: status.toLocaleLowerCase(),
      id: currentFeedback.id,
      upvotes: currentFeedback.upvotes,
      comments: currentFeedback.comments,
    };
    feedbacks[
      feedbacks.findIndex((feedback) => feedback.id === currentFeedback.id)
    ] = newFeedback;
    window.localStorage.setItem("newData", JSON.stringify(feedbacks));
    router.push("/");
  };

  const getFeedback = () => {
    const feedback = feedbacks.find((feedback) => feedback.id === parseInt(id));
    setCurrentFeedback(feedback);
    setCategory(feedback.category);
    setStatus(feedback.status);
  };

  useEffect(() => {
    id && getFeedback();
    currentFeedback && setLoading(false);
  }, [id, currentFeedback]);

  const { values, errors, handleChange, handleSubmit } = useValidation(
    currentFeedback,
    ValidateForm,
    addSuggestion,
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
        />
      )}
    </Layout>
  );
}
