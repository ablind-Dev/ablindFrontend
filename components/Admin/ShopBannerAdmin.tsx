import Image from "next/image";
import Api from "../../components/Auth/CustomApi";
import axios from "axios";
import { useState, useEffect, ComponentProps, DOMAttributes } from "react";

interface bannerItem {
  content: string;
  id: number;
  image: string;
  link: string;
}

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function ShopBannerAdmin() {
  const [banners, setBanners] = useState<Array<bannerItem>>([]);
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [attachment, setAttachment] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [imgFile, setImgFile] = useState<File>();

  const getBanner = () => {
    axios
      .get("https://www.ablind.co.kr/shop/banner", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setBanners(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        setBannerImg(value);
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setAttachment(result);
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const uploadBanner = () => {
    if (imgFile && content !== "" && link !== "") {
      const bannerForm = {
        content: content,
        link: link,
      };
      const blob = new Blob([JSON.stringify(bannerForm)], {
        type: "application/json",
      });
      const multipartFile = new FormData();
      multipartFile.append("file", imgFile);
      multipartFile.append("ShopBannerDto", blob);
      Api.post("https://www.ablind.co.kr/admin/add/shopbanner", multipartFile, {
        headers: {
          "Content-Type": "multipart/form-data",
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          alert("배너 업로드 성공->메인가보세요");
        })
        .catch((error) => {
          console.log(error);
          alert("배너 업로드 실패...");
        });
    } else {
      alert("입력 안한거 있슴다.");
    }
  };

  const deleteBanner = (id: number) => {
    Api.delete(`https://www.ablind.co.kr/admin/delete/shopbanner`, {
      data: {
        id: id,
      },
    })
      .then((res) => {
        alert("배너 삭제완료 -> shop 페이지 확인하세요");
        console.log(res);
      })
      .catch((res) => {
        alert("배너 삭제 실패...");
        console.log(res);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div className="container">
      <div className="add-banner">
        <span>배너 추가</span>
        <div className="img-cover-box">
          <div className="img-box">
            {attachment !== "" ? (
              <img src={attachment} className="attachment" />
            ) : (
              <div className="no-img" />
            )}
          </div>
          <label htmlFor="file" className="basic-btn">
            이미지 수정
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleOnChange}
            value={bannerImg}
          />
        </div>
        <label htmlFor="content">배너에 들어갈 내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="배너에 들어갈 내용을 입력해주세요. 줄 띄워쓰기 예쁘게 해주셔야합니다."
        />
        <label htmlFor="link">배너에 들어갈 링크</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="배너에 들어갈 링크를 넣어주세요. 링크 넣을만한게 없어도 넣어야합니다."
        />
        <button onClick={() => uploadBanner()}>추가하기</button>
      </div>
      <div>
        <span>배너 삭제 - 클릭하세요</span>
        {banners.map((banner) => (
          <div
            className="banner-box"
            onClick={() => {
              if (confirm("진짜 이 배너를 삭제하실겁니까? 복구 안됨요"))
                deleteBanner(banner.id);
            }}
            key={banner.id}
          >
            <Image src={banner.image} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <style jsx>{`
        .attachment {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .img-box {
          position: relative;
          width: 98vw;
          height: 30vw;
          overflow: hidden;
        }
        input[type="file"] {
          /* 파일 필드 숨기기 */
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .no-img {
          width: 100%;
          height: 100%;
          background-color: #6e6e6e;
        }
        .img-cover-box {
          position: relative;
        }
        .basic-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 10px 15px;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.25s;
          opacity: 0.5;
          cursor: pointer;
        }
        .img-cover-box:hover .basic-btn:hover {
          opacity: 1;
        }
        .add-banner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        input {
          width: 100%;
        }
        textarea {
          width: 100%;
          height: 300px;
        }
        .banner-box {
          width: 300px;
          height: 100px;
          cursor: pointer;
          position: relative;
        }
      `}</style>
    </div>
  );
}
