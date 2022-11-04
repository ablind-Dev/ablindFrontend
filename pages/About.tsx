import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";
import Seo from "../components/Seo";
import { GetServerSideProps } from "next";
import AboutLayout from "../components/About/AboutLayout";

interface serversideProps {
  title: string;
}

export default function About(props: serversideProps) {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);

  const { title } = props;

  return (
    <>
      <Seo title="About" />
      <AboutLayout />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const title =
      "ablind\n장애 예술가 아트쉐어 플랫폼 '에이블라인드'\n에이블라인드는 그동안 감춰져 있었던(blind)\n예술에 재능이 있는(able) 장애인이 세상에 드러날 수\n있도록 아트쉐어 플랫폼을 제공합니다.\n장애 예술가 전시회, 아트콜라보레이션 제품 제작, 팝업스토어, 크라우드 펀딩, 교육, SNS 인식개선 캠페인 등 장애 예술가의 다양한 활동을 함께 합니다.\n뛰어난 재능 뿐만 아니라 마음을 사로잡는 장애 예술가의 도전 이야기에 귀를 기울여보세요.\n하루를 살아낼 용기를 얻을 수 있을 거예요.";
    return { props: { title: title } };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
