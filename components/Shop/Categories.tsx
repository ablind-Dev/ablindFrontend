interface categoryProps {
  artists: Array<string>;
}

export default function Categories(props: categoryProps) {
  const { artists } = props;
  const categories = [
    "전체",
    "일상 소품",
    "작품 단독",
    "액세서리",
    "엽서",
    "폰케이스 / 그립톡",
  ];
  return (
    <div className="container">
      <div className="category-box">
        <span className="title">CATEGORIES</span>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
      <div className="artist-box">
        <span className="title">ARTISTS</span>
        <ul>
          {artists.map((artist) => (
            <li key={artist}>{artist}</li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: #303030;
        }
        ul {
          list-style: none;
          padding-left: 0px;
          font-size: 18px;
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 13px;
        }
        .title {
          font-size: 24px;
          font-weight: 600;
          cursor: pointer;
        }
        li {
          transition: all 0.15s;
          cursor: pointer;
        }
        li:hover {
          font-weight: 500;
          color: #76ba99;
        }
      `}</style>
    </div>
  );
}
