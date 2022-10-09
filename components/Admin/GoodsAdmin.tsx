import Api from "../../components/Auth/CustomApi";
import axios from "axios";
import { useState, useEffect, ComponentProps, DOMAttributes } from "react";

interface Option {
  itemOption: string;
}

interface Artist {
  artistId: number;
  name: string;
  profile: string;
  intro: string;
}

const categories = [
  "전체",
  "일상 소품",
  "작품 단독",
  "액세서리",
  "엽서",
  "폰케이스 / 그립톡",
];

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function GoodsAdmin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [author, setAuthor] = useState("Ablind");
  const [options, setOptions] = useState<Array<Option>>([]);
  const [opt, setOpt] = useState("");
  const [imgFile, setImgFile] = useState<Array<File>>();
  const [detailFile, setDetailFile] = useState<File>();

  const [artist, setArtists] = useState<Array<Artist>>();

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
          setImgFile((prev) => (prev ? [...prev, theFile] : [theFile]));
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
          setDetailFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const uploadGoods = () => {
    if (
      imgFile &&
      name !== "" &&
      category !== "" &&
      price !== 0 &&
      author !== "" &&
      options.length > 0 &&
      detailFile
    ) {
      const goodsForm = {
        name: name,
        category: category,
        price: price,
        author: author,
        options: options,
      };
      const blob = new Blob([JSON.stringify(goodsForm)], {
        type: "application/json",
      });
      const multipartFile = new FormData();
      imgFile.map((img) => multipartFile.append("img", img));
      multipartFile.append("detail", detailFile);
      multipartFile.append("itemDto", blob);
      Api.post("http://www.ablind.co.kr/admin/add/item", multipartFile, {
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
      const goodsForm = {
        name: name,
        category: category,
        price: price,
        author: author,
        options: options,
      };
      console.log(goodsForm);
    }
  };

  const deleteArray = (ind: number) => {
    const newArr = options.filter((option, index) => index !== ind);
    setOptions(newArr);
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div className="container">
      <span>
        상품 삭제는 해당 상품 들어가서 삭제버튼 누르세요! 관리자 계정에서만 버튼
        나오고, 관리자 계정에서만 삭제 가능합니다. 안되면 연락하세용
      </span>
      <div>
        <span>상품 등록</span>
        <label htmlFor="name">상품이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품 이름 너무 길게입력x"
        />
        <label htmlFor="category">카테고리</label>
        <select
          id="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        <label htmlFor="price">상품가격 - 숫자만 입력하세요</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label htmlFor="author">작가</label>
        <select
          id="author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        >
          {artist ? (
            artist.map((art, index) => (
              <option value={art.name} key={`${art.name}-${index}`}>
                {art.name}
              </option>
            ))
          ) : (
            <></>
          )}
          <option value={"Ablind"}>Ablind</option>
        </select>
        <div>
          <span>옵션추가. 삭제하려면 해당 옵션 클릭하세욤</span>
          <input
            type="text"
            value={opt}
            onChange={(e) => setOpt(e.target.value)}
          />
          <button
            onClick={() =>
              setOptions((prev) =>
                prev ? [...prev, { itemOption: opt }] : [{ itemOption: opt }]
              )
            }
          >
            추가
          </button>
          <ul>
            {options ? (
              options.map((option, index) => (
                <li
                  key={`${option} - ${index}`}
                  onClick={() => deleteArray(index)}
                >
                  {option.itemOption}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div>
          <label htmlFor="file" className="basic-btn">
            상품 이미지 등록 - 여러개 넣을거면 그냥 계속 파일 선택해주시면 돼요.
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
            상품 설명 이미지 등록 - 한 장만 넣을 수 있슴니다.
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleOnDetail}
          />
        </div>
      </div>
      <button
        onClick={() =>
          confirm("진짜 등록하시겠습니까?") ? uploadGoods() : null
        }
      >
        상품등록
      </button>
    </div>
  );
}
