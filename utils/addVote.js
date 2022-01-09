const addVote = (currentFeedback, feedbacks, fetchData) => {
  const { upvotes } = currentFeedback;
  currentFeedback.upvotes = upvotes + 1;
  feedbacks[
    feedbacks.findIndex((feedback) => feedback.id === currentFeedback.id)
  ] = currentFeedback;
  fetchData(feedbacks);
  window.localStorage.setItem("newData", JSON.stringify(feedbacks));
};

export default addVote;
