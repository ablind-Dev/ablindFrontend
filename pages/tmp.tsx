import axios from "axios";

export default function tmp() {
  const getArtistList = () => {
    axios
      .get("http://www.ablind.co.kr/artist", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getArtistDetail = () => {
    axios
      .get("http://www.ablind.co.kr/artist/1", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getComment = () => {
    axios
      .get("http://www.ablind.co.kr/artist/4/board", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const writeComment = () => {
    //작성할 때 Api 컴포넌트 이용하기
    axios
      .post(
        "http://www.ablind.co.kr/artist/1/board",
        {
          title: "와 진짜 멋져요...",
          content:
            "피고, 거선의 광야에서 가지에 사랑의 품었기 그러므로 설산에서 스며들어 피다.",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            // Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  return (
    <>
      <button onClick={() => getArtistList()}>작가리스트받아오기</button>
      <button onClick={() => getArtistDetail()}>특정작가정보받아오기</button>
      <button onClick={() => getComment()}>응원글받아오기</button>
      <button onClick={() => writeComment()}>응원글작성</button>
    </>
  );
}
