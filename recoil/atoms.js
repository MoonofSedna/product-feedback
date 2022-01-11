import { atom } from "recoil";
import DataJSON from "../utils/data.json";

export const feedbacks = atom({
  key: "feedbacks",
  default: DataJSON.productRequests,
});
