import moment from "moment";
import { useState, useEffect, Dispatch, SetStateAction} from "react";
import InquireBoardContent from "./InquireBoardContent";
import Pagenation from "../../Shop/Pagenation";

interface boardProps {
  title: string;
  contentNum: number;
  contentArray: Array<boardContent>;
  setStep:Dispatch<SetStateAction<number>>;
}

interface boardContent {
  createdAt: string;
  id: number; //주문내역 고유 아이디
  orderItems: Array<goods>; //주문 상품
  orderStatus: string; //배송 상태
  price: number; //총 가격
}

interface goods {
  count: number;
  id: number;
  itemName: string; //상품 이름
  itemOption: string; //옵션 이름
  orderPrice: number; //해당 상품 -> 옵션 -> 가격
}

export default function InquireBoard(props: boardProps) {
  const { title, contentNum, contentArray, setStep } = props;

  const [viewInquire, setViewInquire] =
    useState<Array<boardContent>>(contentArray);

  useEffect(() => {
    setViewInquire(contentArray);
  }, [contentArray]);

  //페이지네이션 관련 -> 18개씩
  const [qnaListInPage, setQnaListPage] =
    useState<Array<Array<boardContent>>>();
  const [allPage, setAllPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const inquireSlice = (page: number) => {
    let tmpQnas = [];
    if (viewInquire) {
      for (let i = 0; i < page; i++) {
        tmpQnas.push(viewInquire.splice(0, 18));
      }
      setQnaListPage(tmpQnas);
    }
  };

  useEffect(() => {
    if (viewInquire && viewInquire.length > 18) {
      let allPages;
      if (viewInquire.length % 18 === 0) {
        allPages = Math.floor(viewInquire.length / 18);
      } else {
        allPages = Math.floor(viewInquire.length / 18) + 1;
      }
      setAllPage(allPages);
      inquireSlice(allPages);
    } else if (viewInquire && viewInquire.length <= 18) {
      setQnaListPage([viewInquire]);
    }
  }, [viewInquire]);

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">{title}</span>
        <span>{contentNum}</span>
      </div>
      <table>
        <thead>
          <tr className="first-row">
            <th className="first-col">배송 상태</th>
            <th className="second-col">{}</th>
            <th className="third-col">주문 금액</th>
            <th className="fourth-col">주문 일자</th>
          </tr>
        </thead>
        <tbody>
          {qnaListInPage ? (
            qnaListInPage[curPage - 1].map((content, index) => (
              <InquireBoardContent
                index={index}
                shopId={content.id}
                shipping={content.orderStatus}
                goods={content.orderItems}
                priceSum={content.price}
                createdAt={content.createdAt}
                setStep={setStep}
              />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <Pagenation pages={allPage} setPage={setCurPage} />
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: start;
        }
        .title-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          color: #bebebe;
          font-size: 28px;
          font-weight: 700;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
        }
        table {
          width: 100%;
          border-bottom: 3px solid #bebebe;
          border-collapse: collapse;
        }
        th {
          height: 50px;
          background-color: #bebebe;
        }

        .first-col {
          width: 16%;
        }
        .second-col {
          width: 50%;
        }
        .third-col {
          width: 17%;
        }
        .fourth-col {
          width: 17%;
        }
        .down-box {
          width: 100%;
          display: flex;
          justify-content: end;
        }
        .down-box button {
          width: 120px;
          background-color: #646464;
          border-radius: 5px;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
        }
        .pagination {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
