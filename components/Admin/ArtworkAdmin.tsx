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

interface workType {
  id: number;
  work: string;
}

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function ArtworkAdmin() {
  const [artists, setArtists] = useState<Array<Artist>>();
  const [artistId, setArtistId] = useState<number>();
  const [artworks, setArtworks] = useState<Array<workType>>();
  const [imgFile, setImgFile] = useState<File>();

  const getArtist = () => {
    axios
      .get("https://www.ablind.co.kr/artist", {
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

  const getArtistDetail = () => {
    axios
      .get(`https://www.ablind.co.kr/artist/${artistId}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setArtworks(res.data.works);
      })
      .catch((err) => {
        alert("작가 받아오기 실패");
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
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const deleteArtwork = (id: number) => {
    console.log(id);
    if (confirm("진짜 삭제하시겠습니까?")) {
      Api.delete(`https://www.ablind.co.kr/admin/artist/work/delete`, {
        headers: {
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
        data: {
          id: id,
        },
      })
        .then((res) => {
          alert("작품 삭제완료");
          getArtistDetail();
        })
        .catch((res) => {
          alert("작품 삭제 실패...");
          console.log(res);
        });
    }
  };

  const uploadWorks = () => {
    if (imgFile && artistId) {
      const workForm = {
        artistId: artistId,
      };
      const blob = new Blob([JSON.stringify(workForm)], {
        type: "application/json",
      });
      const multipartFile = new FormData();
      multipartFile.append("work", imgFile);
      multipartFile.append("artistDetailDto", blob);
      multipartFile.append("itemDto", blob);
      Api.post(
        "https://www.ablind.co.kr/admin/artist/work/add",
        multipartFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          alert("작품 업로드 성공");
          getArtistDetail();
        })
        .catch((error) => {
          console.log(error);
          alert("작품 업로드 실패...");
        });
    } else {
      alert("입력 안한거 있슴다.");
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  useEffect(() => {
    if (artistId) {
      getArtistDetail();
    }
  }, [artistId]);

  return (
    <div className="container">
      <span>
        작가님을 선택하고, 작품을 추가해주세요. 작품 삭제는 작품 클릭하면
        됩니다.
      </span>
      <select onChange={(e) => setArtistId(Number(e.target.value))}>
        <option>작가선택</option>
        {artists ? (
          artists.map((artist) => (
            <option key={artist.artistId} value={artist.artistId}>
              {artist.name}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
      <div>
        <label htmlFor="file" className="basic-btn">
          작품 등록
        </label>
        <input
          name="file"
          type="file"
          id="file"
          accept="image/*"
          onChange={handleOnImg}
        />
      </div>
      <button onClick={() => uploadWorks()}>작품등록</button>
      <div className="artwork-box">
        {artworks ? (
          artworks.map((artwork, index) => (
            <div
              className="img-box"
              key={artwork.id}
              onClick={() => deleteArtwork(artwork.id)}
            >
              <Image src={artwork.work} layout="fill" objectFit="cover" />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }
        .artwork-box {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 10px;
        }
        .img-box {
          width: 150px;
          height: 200px;
          cursor: pointer;
          position: relative;
        }
      `}</style>
    </div>
  );
}
