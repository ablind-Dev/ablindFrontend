import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";
import Seo from "../components/Seo";

interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

export default function About() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  return (
    <>
      <Seo title="About" />
    </>
  );
}
