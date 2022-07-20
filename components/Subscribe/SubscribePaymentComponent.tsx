import PaymentBox from "./PamentBox";
import { useState, useEffect } from "react";

export default function SubscribePaymentComponent() {
  const [selected, setSelected] = useState(1);
  const selectStage = (stage: number) => {
    setSelected(stage);
  };
  return (
    <div className="container">
      <PaymentBox stage={0} selectStage={selectStage} selected={selected} />
      <PaymentBox stage={1} selectStage={selectStage} selected={selected} />
      <PaymentBox stage={2} selectStage={selectStage} selected={selected} />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          gap: 60px;
        }
      `}</style>
    </div>
  );
}
