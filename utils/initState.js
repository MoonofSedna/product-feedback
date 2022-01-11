import { feedbacks } from "../recoil/atoms";

export const keysAbleToSave = ["feedbacks"];

const atomsToSave = [
  {
    key: "feedbacks",
    atom: feedbacks,
  },
];

export const initRecoilState = ({ set }) => {
  let localStorageLength;
  if (typeof window !== "undefined") {
    localStorageLength = localStorage.length;
  }
  for (let i = 0; i < localStorageLength; i++) {
    const localStorageKey = localStorage.key(i);
    const indexOfKey = keysAbleToSave.indexOf(localStorageKey);
    if (indexOfKey !== -1) {
      const atom = atomsToSave[indexOfKey].atom;
      const atomData = JSON.parse(localStorage.getItem(localStorageKey));
      set(atom, atomData);
    }
  }
};
