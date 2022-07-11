import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";
import Seo from "../components/Seo";
export default function Shop() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  return (
    <>
      <Seo title="Shop" />
    </>
  );
}
