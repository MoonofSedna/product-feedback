export default function addVote(currentFeedback, feedbacks, fetchData) {
  const { upvotes } = currentFeedback;
  const newFeedback = { ...currentFeedback, upvotes: upvotes + 1 };
  const feedbacksCopy = [...feedbacks];
  feedbacksCopy[
    feedbacksCopy.findIndex((feedback) => feedback.id === newFeedback.id)
  ] = newFeedback;
  fetchData(feedbacksCopy);
  window.localStorage.setItem("feedbacks", JSON.stringify(feedbacksCopy));
}
