export default function SubscribeCircleComponent() {
  const explanation = [
    "작품 선공개",
    "매달 받는 굿즈",
    "전시회 선예매",
    "Ablind 이벤트",
  ];
  return (
    <div className="container">
      {explanation.map((explain, index) => (
        <div key={index} className="circle">
          {explain}
        </div>
      ))}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          gap: 50px;
        }
        .circle {
          background-color: #d9d9d9;
          width: 150px;
          height: 150px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
