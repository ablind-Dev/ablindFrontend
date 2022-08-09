import { useRecoilState } from "recoil";
import { recoilCategoryState } from "../../states/recoilCategoryState";

interface categoryProps {
  artists: Array<string>;
}

interface CategoryState {
  category: string;
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
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilCategoryState);
  const defaultState: CategoryState = { ...recoilInfo };

  const categoryClickHandler = (value: string) => {
    defaultState.category = value;
    setRecoilInfo(defaultState);
  };

  return (
    <div className="container">
      <div className="category-box">
        <span className="title">CATEGORIES</span>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => categoryClickHandler(category)}
              className={defaultState.category === category ? "selected" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="artist-box">
        <span className="title">ARTISTS</span>
        <ul>
          {artists.map((artist, index) => (
            <li
              key={index}
              onClick={() => categoryClickHandler(artist)}
              className={defaultState.category === artist ? "selected" : ""}
            >
              {artist}
            </li>
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
        .selected {
          font-weight: 700;
          color: #76ba99;
        }
        li:hover {
          font-weight: 500;
          color: #76ba99;
        }
      `}</style>
    </div>
  );
}
