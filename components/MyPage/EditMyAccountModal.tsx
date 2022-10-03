import { Dispatch, SetStateAction } from "react";

interface editAccountProps {
  bank: string;
  setBank: Dispatch<SetStateAction<string>>;
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}

const banks = [
  "은행을 선택해주세요",
  "NH농협",
  "카카오뱅크",
  "KB국민",
  "우리",
  "부산은행",
  "신한은행",
  "BNK경남은행",
  "케이뱅크",
  "DGB대구",
  "광주은행",
  "KDB산업",
  "SC재일",
  "IBK기업",
  "하나",
  "전북은행",
  "Sh수협",
  "제주은행",
];

export default function EditMyAccountModal(props: editAccountProps) {
  const { bank, setBank, account, setAccount } = props;
  return (
    <div className="modal">
      은행
      <select
        onChange={(e) => setBank(e.target.value)}
        value={bank}
        className="bank-selector"
      >
        {banks.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor="account">계좌번호</label>
      <input
        type="text"
        name="account"
        placeholder="'-'를 제외한 숫자만 입력해주세요."
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        className="account-input"
      />
      <style jsx>{`
        .modal {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bank-selector {
          height: 30px;
          padding: 0px 5px 0px 5px;
        }
        .modal input {
          height: 30px;
          padding: 0px 5px 0px 5px;
        }
      `}</style>
    </div>
  );
}
