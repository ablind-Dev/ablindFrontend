import Api from "../Auth/CustomApi";
import axios from "axios";
import { useState, useEffect, ComponentProps, DOMAttributes } from "react";
import Image from "next/image";

interface Artist {
  artistId: number;
  name: string;
  profile: string;
  intro: string;
}

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function ArtistAdmin() {
  const [artists, setArtists] = useState<Array<Artist>>();
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [youtube, setYoutube] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<File>();
  const [background, setBackground] = useState<File>();
  const [detail, setDetail] = useState<File>();

  const getArtist = () => {
    axios
      .get("http://www.ablind.co.kr/artist", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnImg: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setProfile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const handleOnBack: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setBackground(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const handleOnDetail: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setDetail(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const artistSaveHandler = () => {
    if (
      name !== "" &&
      intro !== "" &&
      content !== "" &&
      subtitle !== "" &&
      youtube !== "" &&
      email !== "" &&
      profile &&
      background &&
      detail
    ) {
      const artistForm = {
        name: name,
        intro: intro,
        content: content,
        subTitle: subtitle,
        youtube: youtube,
        email: email,
      };
      const blob = new Blob([JSON.stringify(artistForm)], {
        type: "application/json",
      });
      const multipartFile = new FormData();
      multipartFile.append("profile", profile);
      multipartFile.append("backGround", background);
      multipartFile.append("detail", detail);
      multipartFile.append("artistDetailDto", blob);
      Api.post("http://www.ablind.co.kr/admin/artist/add", multipartFile, {
        headers: {
          "Content-Type": "multipart/form-data",
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          alert("작가 업로드 성공-> 아티스트 페이지 가보세요");
        })
        .catch((error) => {
          console.log(error);
          alert("작가 업로드 실패...");
        });
    } else {
      alert("모든 정보 입력해주세요.");
    }
  };

  const deleteArtist = (id: number) => {
    if (confirm("진짜 삭제하시겠습니까?")) {
      Api.delete(`http://www.ablind.co.kr/admin/artist/delete`, {
        headers: {
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
        data: {
          artistId: id,
        },
      })
        .then((res) => {
          alert("작가 삭제완료 -> 작가 페이지 확인하세요");
        })
        .catch((res) => {
          alert("작가 삭제 실패...");
          console.log(res);
        });
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div className="container">
      <span>작가 등록하기</span>
      <div className="info-box">
        <label htmlFor="name">작가 이름 입력</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="등록할 작가 이름 입력"
        />
        <label htmlFor="intro">
          타이틀. 두줄 이내로 짧고 간결하게 써주세요.
        </label>
        <textarea
          id="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="ex) 캠퍼스 라이프, 컨버스 앰버서더."
        />
        <label htmlFor="subtitle">
          서브타이틀. 한줄로 작가를 소개해주세요.
        </label>
        <input
          id="subtitle"
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="ex) 캠퍼스 여신 - 컨버스 앰버서더 강슬기"
        />
        <label htmlFor="content">
          작가 설명. 너무 길게만 안쓰시면 될거예요...
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="작가 설명 써주세용"
        />
        <label htmlFor="youtube">유튜브 링크. 없어도 넣어주세요.</label>
        <input
          id="youtube"
          type="text"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          placeholder="유튜브 링크. 자동재생되니까 넣을거없으면 BGM이라도.."
        />
        <label htmlFor="email">작가 이메일</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="구독자에게만 공개되는 이메일입니다."
        />
        <div>
          <label htmlFor="file" className="basic-btn">
            작가 프로필 등록 - 작가님 대표할 사진 한 장
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleOnImg}
          />
        </div>
        <div>
          <label htmlFor="file" className="basic-btn">
            작가 배경사진 등록 - 상세페이지에서 흐릿하게 배경이 될 사진 한 장
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleOnBack}
          />
        </div>
        <div>
          <label htmlFor="file" className="basic-btn">
            작가 상세정보 사진 등록 - 밑에 길게 뻗어질 사진 한 장
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleOnDetail}
          />
        </div>
        <button onClick={() => artistSaveHandler()}>작가 등록</button>
      </div>
      <div>
        <span>작가 삭제하기... 삭제하려는 작가 클릭하세요.</span>
        <div className="img-cover-box">
          {artists ? (
            artists.map((artist, index) => (
              <div
                className="img-box"
                key={`${artist.name}-${index}`}
                onClick={() => deleteArtist(artist.artistId)}
              >
                <Image src={artist.profile} layout="fill" objectFit="cover" />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <style jsx>{`
        .cotainer,
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 90vw;
          gap: 5px;
        }
        input,
        textarea {
          width: 100%;
        }
        .img-cover-box {
          display: flex;
          flex-direction: row;
          gap: 20px;
          flex-wrap: wrap;
        }
        .img-box {
          width: 200px;
          height: 300px;
          position: relative;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
