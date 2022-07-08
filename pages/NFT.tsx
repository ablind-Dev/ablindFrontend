import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";
export default function NFT() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  return <></>;
}
