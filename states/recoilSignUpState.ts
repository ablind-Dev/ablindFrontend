import { atom, selector } from "recoil";

export interface SignUpState {
  name: string;
  id: string;
  pwd: string;
}

const initialState: SignUpState = {
  name: "",
  id: "",
  pwd: "",
};

export const recoilSignUpState = atom({
  key: "recoilSignUpState",
  default: initialState,
});
