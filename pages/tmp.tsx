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

  const getArtist = async () => {
    try {
      const res = await axios.get("http://www.ablind.co.kr/artist", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.status === 200) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goAdmin = () => {
    axios
      .get("http://www.ablind.co.kr/admin", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTmp = () => {
    console.log(`${localStorage.getItem("accessToken")}`);
    axios
      .get("http://www.ablind.co.kr/user", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const subscribeAllow = () => {
    axios
      .post(
        "http://www.ablind.co.kr/artist/4/follow/3000",
        {
          email: "abcd1234@naver.com",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const getSubscribed = () => {
    axios
      .post(
        "http://www.ablind.co.kr/artist/4/follow",
        {
          email: "abcd1234@naver.com",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleted = () => {
    axios
      .delete(`http://www.ablind.co.kr/artist/4/unfollow`, {
        data: {
          email: "abcd1234@naver.com",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <button onClick={() => getArtistList()}>작가리스트받아오기</button>
      <button onClick={() => getArtistDetail()}>특정작가정보받아오기</button>
      <button onClick={() => getComment()}>응원글받아오기</button>
      <button onClick={() => writeComment()}>응원글작성</button>
      <button onClick={() => getArtist()}>작가받아오기</button>
      <button onClick={() => goAdmin()}>어드민검사</button>
      <button onClick={() => getTmp()}>이게뭐지?</button>
      <button onClick={() => subscribeAllow()}>구독승인</button>
      <button onClick={() => getSubscribed()}>구독확인</button>
      <button onClick={() => deleted()}>구독취소</button>
    </>
  );
}
