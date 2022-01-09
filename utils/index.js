const itemOrder = {
  "most upvotes": { data: "upvotes", order: "desc" },
  "least upvotes": { data: "upvotes", order: "asc" },
  "most momments": { data: "comments", order: "desc" },
  "least comments": { data: "comments", order: "asc" },
};
const itemCategories = ["UI", "UX", "enhancement", "bug", "feature"];

const itemStatus = ["Suggestion", "Planned", "In-Progress", "Live"];

export { itemOrder, itemCategories, itemStatus };
