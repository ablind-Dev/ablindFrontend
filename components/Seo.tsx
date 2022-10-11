import Head from "next/head";

interface headProps {
  title: string;
}
export default function Seo(props: headProps) {
  const { title } = props;
  return (
    <Head>
      <title>{title} | 특별한 예술가들의 모임, Ablind | 에이블라인드</title>
      <link rel="shortcut icon" href="/images/favicon/color.png" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
    </Head>
  );
}
