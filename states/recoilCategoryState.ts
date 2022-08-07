import { atom } from "recoil";

export interface CategoryState {
  category: string;
}

const initialState: CategoryState = {
  category: "전체",
};

export const recoilCategoryState = atom({
  key: "recoilCategoryState",
  default: initialState,
});
