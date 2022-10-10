interface aboutProps {
  title: string;
}

export default function AboutLayout(props: aboutProps) {
  const { title } = props;
  return (
    <div className="container">
      <span>{title}</span>
      <style jsx>{`
        .container {
          display: flex;
          width: 100vw;
          height: 100vh;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          white-space: pre-line;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
