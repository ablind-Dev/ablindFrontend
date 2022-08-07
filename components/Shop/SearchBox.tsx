import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface searchProps {
  advertise: string;
}

export default function SearchBox(props: searchProps) {
  const { advertise } = props;
  const searchHandler = () => {};
  return (
    <div className="container">
      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}
      >
        <input type="text" placeholder="굿즈 / 작가 / 작품명을 검색해주세요." />
        <div className="magnify" onClick={() => searchHandler()}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </form>
      <span>{advertise}</span>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: end;
        }
        .search-box {
          padding: 5px 10px;
          border: 1px solid black;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          width: 400px;
          border-radius: 10px;
          transition: all 0.15s;
        }
        .search-box input {
          width: 88%;
          height: 30px;
          border: none;
          font-size: 16px;
          padding: 0px 5px;
        }
        .search-box input:focus {
          outline: none;
        }
        .magnify {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
