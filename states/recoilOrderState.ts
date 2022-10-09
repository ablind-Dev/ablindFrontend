import { atom } from "recoil";

interface itemInterface {
  itemImage: string; //상품 이미지
  itemName: string; //상품 이름
  itemOption: string; //선택한 옵션 이름
  itemId: number;
  count: number; //개수
  price: number;
  id: number; //장바구니 아이디
}

export interface OrderState {
  ordering: boolean; //주문 상태 - 주문 중 : true | 주문 완료이거나 하는 중 아님 : false
  items: Array<itemInterface>;
}

const initialState: OrderState = {
  ordering: false,
  items: [],
};

export const recoilOrderState = atom({
  key: "recoilOrderState",
  default: initialState,
});
