const itemOrder = {
  "Most Upvotes": { data: "upvotes", order: "desc" },
  "Least Upvotes": { data: "upvotes", order: "asc" },
  "Most Comments": { data: "comments", order: "desc" },
  "Least Comments": { data: "comments", order: "asc" },
};
const itemCategories = ["UI", "UX", "Enhancement", "Bug", "Feature"];

const itemStatus = ["Suggestion", "Planned", "In Progress", "Live"];

export { itemOrder, itemCategories, itemStatus };
