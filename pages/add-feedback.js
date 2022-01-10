import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
// components
import Layout from "../components/layout";
import FeedbackForm from "../components/feedback-form";
// utils
import ValidateForm from "../utils/validate-form";
// hooks
import useValidation from "../hooks/useValidation";
import { feedbacks as feedbackList } from "../recoil/atoms";

export default function AddFeedBack() {
  const [category, setCategory] = useState("ui");

  const router = useRouter();

  const [feedbacks, setFeedbacks] = useRecoilState(feedbackList);

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
    const newFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(newFeedbacks);
    window.localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));
    router.push("/");
  };

  const { values, errors, handleChange, handleSubmit } = useValidation(
    initialState,
    ValidateForm,
    addSuggestion
  );

  const formProps = { values, errors, handleChange, handleSubmit };
  return (
    <Layout>
      <FeedbackForm {...formProps} getCategory={setCategory} />
    </Layout>
  );
}
