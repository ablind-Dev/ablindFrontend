interface contentProps {
  detailImg: string;
}

export default function Content(props: contentProps) {
  const { detailImg } = props;
  return (
    <>
      <img src={detailImg} />
    </>
  );
}
