import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";

export default function MyPage() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  return <>마이페이지</>;
}
