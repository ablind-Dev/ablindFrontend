import { atom, selector } from "recoil";

export interface AuthState {
  state: boolean;
}

const initialState: AuthState = {
  state: false,
};

export const recoilAuthState = atom({
  key: "recoilAuthState",
  default: initialState,
});
