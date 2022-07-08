import { atom, selector } from "recoil";

export interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

const initialState: ThemeState = {
  theme: true,
};

export const recoilThemeState = atom({
  key: "recoilThemeState",
  default: initialState,
});
