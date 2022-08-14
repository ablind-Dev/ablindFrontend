import axios from "axios";
import { useState, useEffect } from "react";
import ReviewBox from "./ReviewBox";

interface pageProps {
  goodsId: number;
}

interface ReviewInfo {
  title: string;
  content: string;
  image: string;
  rate: number;
  reviewBoardId: number;
}

export default function Review(props: pageProps) {
  const { goodsId } = props;
  const [reviewArray, setReviewArray] = useState<Array<ReviewInfo>>();

  const getReiview = () => {
    axios
      .get(`http://www.ablind.co.kr/shop/${5}/review`, {
        //5부분에 goodsId넣어줘야함.
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setReviewArray(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReiview();
  }, []);

  return (
    <div className="container">
      {reviewArray ? (
        reviewArray.map((review, index) => (
          <ReviewBox
            key={review.reviewBoardId}
            title={review.title}
            content={review.content}
            image={review.image}
            rate={review.rate}
            reviewBoardId={review.reviewBoardId}
          />
        ))
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 70px;
          width: 70%;
        }
      `}</style>
    </div>
  );
}
