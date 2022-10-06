import { useResetRecoilState, useRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { recoilOrderState, OrderState } from "../states/recoilOrderState";
import { useEffect } from "react";
import Seo from "../components/Seo";
import NoOrder from "../components/Order/NoOrder";
import OrderLayout from "../components/Order/OrderLayout";

export default function Order() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  const [orderState, setOrderState] = useRecoilState(recoilOrderState);
  const defaultState: OrderState = { ...orderState };

  useEffect(() => {
    resetTheme();
  }, []);

  return (
    <>
      <Seo title="상품 주문하기" />
      {defaultState.ordering ? (
        <OrderLayout/>
      ) : (
        <NoOrder />
      )}
    </>
  );
}
