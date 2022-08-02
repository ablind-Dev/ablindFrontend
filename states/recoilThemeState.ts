import { atom, selector } from "recoil";

export interface ThemeState {
  theme: string; //"white" | "black" | "mix"
}

const initialState: ThemeState = {
  theme: "white",
};

export const recoilThemeState = atom({
  key: "recoilThemeState",
  default: initialState,
});
