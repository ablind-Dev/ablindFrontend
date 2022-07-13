import ReactPlayer from "react-player";

interface contentProps {
  youtube: string;
  detail: string;
}
export default function ArtistDetailContentComponent(props: contentProps) {
  const { youtube, detail } = props;
  return (
    <div className="container">
      <ReactPlayer url={youtube} controls playing={true} />
      <img src={detail} />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 100px;
          padding-top: 100px;
        }
        img {
          max-width: 880px;
        }
      `}</style>
    </div>
  );
}
