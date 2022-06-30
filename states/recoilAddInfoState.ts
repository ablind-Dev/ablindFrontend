import { atom, selector } from "recoil";

export interface AddInfoState {
  phoneNum: string;
  bank: string;
  account: string;
  address: string;
}

const initialState: AddInfoState = {
  phoneNum: "",
  bank: "",
  account: "",
  address: "",
};

export const recoilAddInfoState = atom({
  key: "recoilAddInfoState",
  default: initialState,
});
