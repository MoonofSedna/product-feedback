import { atom } from "recoil";
import DataJSON from "../public/data.json";

export const feedbacks = atom({
  key: "feedbacks",
  default: DataJSON.productRequests,
});
