import PaymentBox from "./PamentBox";
import { useState, Dispatch, SetStateAction } from "react";

interface selectProps {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

export default function SubscribePaymentComponent(props: selectProps) {
  const { selected, setSelected } = props;
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
