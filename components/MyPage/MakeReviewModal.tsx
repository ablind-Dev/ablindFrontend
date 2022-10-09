import {
  Dispatch,
  SetStateAction,
  ComponentProps,
  DOMAttributes,
  useState,
  useEffect,
} from "react";
import starEmpty from "../../public/images/stars_empty.png";
import starFill from "../../public/images/stars_fill.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface reviewProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  rate: number;
  setRate: Dispatch<SetStateAction<number>>;
  attachment: string;
  reviewImg: string;
  handleOnChange: Event<"input", "onChange">;
}

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function MakeReviewModal(props: reviewProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    rate,
    setRate,
    attachment,
    reviewImg,
    handleOnChange,
  } = props;
  const [calRate, setCalRate] = useState("120px"); //별점 기본사이즈

  useEffect(() => {
    setCalRate(`${120 * (rate / 5)}px`);
  }, [rate]);
  return (
    <div className="container">
      <span className="title">리뷰 작성은 Ablind에게 큰 힘이 됩니다.</span>
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
          value={reviewImg}
        />
      </div>
      <div className="rate-box">
        <span>평점</span>
        <div className="stars">
          <Image src={starEmpty} layout="fill" objectFit="cover" />
          <div className="stars-fill">
            <Image
              src={starFill}
              layout="fill"
              objectFit="cover"
              objectPosition="left"
            />
          </div>
        </div>
        <span>{rate.toFixed(1)}</span>
        <div className="btns">
          <button
            onClick={() => setRate((prev) => (prev > 1 ? prev - 0.5 : prev))}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <button
            onClick={() => setRate((prev) => (prev < 5 ? prev + 0.5 : prev))}
          >
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
        </div>
      </div>
      <div className="content-box">
        <label htmlFor="review-title">리뷰 제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="리뷰 제목을 입력해주세요."
          id="review-title"
        />
        <label htmlFor="review-content">리뷰 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="리뷰를 입력해주세요."
          id="review-content"
        />
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .title {
          font-size: 20px;
          font-weight: 800;
        }
        .rate-box {
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          gap: 10px;
        }
        .rate-box span {
          font-weight: 700;
          color: #6e6e6e;
        }
        .stars {
          position: relative;
          width: 120px;
          height: 24.8px;
        }
        .stars-fill {
          position: relative;
          width: ${calRate};
          height: 24.8px;
          transition: all 0.15s;
        }
        .attachment {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .img-box {
          position: relative;
          width: 220px;
          height: 190px;
          border-radius: 10px;
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
        .content-box {
          width: 90%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: flex-start;
        }
        .content-box label {
          font-weight: 700;
          color: #6e6e6e;
        }
        .content-box input,
        textarea {
          width: 92%;
          border: 1px solid black;
          border-radius: 5px;
          padding: 5px 10px;
        }
        textarea {
          height: 150px;
          font-family: "Pretendard Variable";
        }
        .btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .btns button {
          width: 20px;
          height: 20px;
          border: none;
          background-color: #979797;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btns button:hover {
          background-color: #6e6e6e;
        }
      `}</style>
    </div>
  );
}
