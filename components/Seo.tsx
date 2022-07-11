import Head from "next/head";

interface headProps {
  title: string;
}
export default function Seo(props: headProps) {
  const { title } = props;
  return (
    <Head>
      <title>{title} | 특별한 예술가들의 모임, Ablind</title>
    </Head>
  );
}
