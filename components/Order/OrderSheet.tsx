import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Api from "../../components/Auth/CustomApi";
import BasicModal from "../Resource/BasicModal";
import EditAddressModal from "../MyPage/EditAddressModal";
import { useRecoilState } from "recoil";
import { recoilOrderState, OrderState } from "../../states/recoilOrderState";
import axios from "axios";

interface checkProps {
  setStep: Dispatch<SetStateAction<number>>;
  allPrice: number;
  setOrderer: Dispatch<SetStateAction<Orderer | undefined>>;
  setReceiver: Dispatch<SetStateAction<Receiver | undefined>>;
  setOrderDate: Dispatch<SetStateAction<string>>;
}

interface basicInfo {
  image: string; //프사
  email: string;
  phoneNumber: string;
  name: string;
  role: string; //회원인지 예술가인지 관리자인지
  address: string; //&로 분류
  account: string; //은행
  account_name: string; //계좌번호
}

interface itemDto {
  id: number;
}

interface Orderer {
  name: string;
  number: string;
  bank: string;
  account: string;
}

interface Receiver {
  name: string;
  number: string;
  addr: string;
  detail: string;
}

const initData: basicInfo = {
  image: "",
  email: "",
  phoneNumber: "",
  name: "",
  role: "",
  address: "",
  account: "",
  account_name: "",
};

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

export default function OrderSheet(props: checkProps) {
  const { setStep, allPrice, setOrderer, setReceiver, setOrderDate } = props;
  const [orderState, setOrderState] = useRecoilState(recoilOrderState);
  const defaultState: OrderState = { ...orderState };
  const [items, setItems] = useState<Array<itemDto>>();

  const [info, setInfo] = useState<basicInfo>(initData);
  const [oName, setOName] = useState<string>();
  const [oNumber, setONumber] = useState<string>();
  const [oBank, setOBank] = useState<string>();
  const [oAccount, setOAccount] = useState<string>();
  const [rName, setRName] = useState("");
  const [rNumber, setRNumber] = useState("");
  const [addr, setAddr] = useState("");
  const [addrDetail, setAddrDetail] = useState("");

  const [errState, setErrState] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const getMyItem = () => {
    let items: Array<itemDto> = [];
    defaultState.items.map((item) => items.push({ id: item.id }));
    setItems(items);
  };

  const getMyProfile = () => {
    Api.get("http://www.ablind.co.kr/mypage", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterMyProfile = () => {
    setOName(info.name);
    setONumber(regNumber(info.phoneNumber));
    setOBank(info.account_name);
    setOAccount(info.account);
  };

  const regNumber = (val: string) => {
    const regVal = val
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    return regVal;
  };

  const equalOR = (checked: boolean) => {
    if (checked) {
      const customAddress = info.address.split("_");
      setRName(info.name);
      setRNumber(info.phoneNumber);
      setAddr(customAddress[0]);
      setAddrDetail(customAddress[1]);
    } else {
      setRName("");
      setRNumber("");
      setAddr("");
      setAddrDetail("");
    }
  };

  //주소 입력 관련
  const [addressModalOpen, setAddressModal] = useState(false);
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isDetailAddress, setIsDetailAddress] = useState("");

  const closeAddressModal = () => {
    setAddr(isAddress);
    setAddrDetail(isDetailAddress);
    setAddressModal(false);
  };

  const handleComplete = (data: any) => {
    //데이터 형식 수정해야됨
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };

  const saveAddressInfo = () => {
    if (isAddress !== "" && isZoneCode !== "" && isDetailAddress !== "") {
      closeAddressModal();
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  const setErr = (value: string, state: boolean) => {
    setErrMsg(value);
    setErrState(state);
  };

  const setData = () => {
    if (
      oName &&
      oNumber &&
      oBank &&
      oAccount &&
      rName &&
      rNumber &&
      addr &&
      addrDetail
    ) {
      const orderer: Orderer = {
        name: oName,
        number: oNumber,
        bank: oBank,
        account: oAccount,
      };
      const receiver: Receiver = {
        name: rName,
        number: rNumber,
        addr: addr,
        detail: addrDetail,
      };
      setOrderer(orderer);
      setReceiver(receiver);
    }
  };

  const removeItemInBasket = (id: number) => {
    axios
      .delete(`http://www.ablind.co.kr/mypage/cart/delete`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const orderHandler = () => {
    if (errState) {
      Api.post(
        "http://www.ablind.co.kr/shop/order",
        {
          ordererDto: {
            name: oName,
            phoneNumber: oNumber,
            account_name: oBank,
            account: oAccount,
          },
          recipientDto: {
            name: rName,
            phoneNumber: rNumber,
            address: `${addr}_${addrDetail}`,
          },
          orderItemDtoList: items,
          price: `${allPrice}`,
        },
        {
          headers: {
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          items?.map((item) => {
            removeItemInBasket(item.id);
          });
          setData();
          setOrderDate(`${new Date()}`);
          setStep(2);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("주문서 작성이 완료되지 않았어요!");
    }
  };

  useEffect(() => {
    getMyItem();
    getMyProfile();
  }, []);

  useEffect(() => {
    filterMyProfile();
  }, [info]);

  useEffect(() => {
    oName === ""
      ? setErr("주문자 이름을 입력해주세요.", false)
      : oNumber === ""
      ? setErr("주문자 전화번호를 입력해주세요.", false)
      : oBank === "" || oAccount === ""
      ? setErr("주문자 계좌 정보를 모두 입력해주세요.", false)
      : rName === ""
      ? setErr("수령인 이름을 입력해주세요.", false)
      : rNumber === ""
      ? setErr("수령인 전화번호를 입력해주세요.", false)
      : addr === "" || addrDetail === ""
      ? setErr("수령지 주소를 정확하게 입력해주세요.", false)
      : setErr("모든 정보의 입력이 완료되었습니다 :)", true);
  }, [oName, oNumber, oBank, oAccount, rName, rNumber, addr, addrDetail]);

  return (
    <div className="container">
      <span className="title">주문서 작성</span>
      <form className="orderer-box" onSubmit={(e) => e.preventDefault()}>
        <div className="input-div">
          <label htmlFor="orderer-name">주문자</label>
          <input
            type="text"
            id="orderer-name"
            placeholder="주문자 이름을 입력해주세요."
            onChange={(e) => setOName(e.target.value)}
            value={oName}
          />
        </div>
        <div className="input-div">
          <label htmlFor="orderer-number">주문자 전화번호</label>
          <input
            type="text"
            id="orderer-number"
            placeholder="주문자 전화번호를 입력해주세요."
            onChange={(e) => setONumber(regNumber(e.target.value))}
            value={oNumber}
            maxLength={13}
          />
        </div>
        <div className="input-div">
          <label htmlFor="orderer-account">주문자 계좌정보</label>
          <select
            onChange={(e) => setOBank(e.target.value)}
            value={oBank}
            className="bank-selector"
          >
            {banks.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="주문자 계좌번호를 입력해주세요."
            onChange={(e) => setOAccount(e.target.value.replace(/[^0-9]/g, ""))}
            value={oAccount}
          />
        </div>
      </form>
      <form className="receiver-box" onSubmit={(e) => e.preventDefault()}>
        <div className="input-div">
          <label htmlFor="receiver-name">수령인</label>
          <div className="equal-recv-box">
            <input
              type="checkbox"
              id="equal-recv"
              onChange={(e) => equalOR(e.target.checked)}
            />
            <label htmlFor="equal-recv" className="equal-recv">
              내 정보와 동일합니다.
            </label>
          </div>
          <input
            type="text"
            id="receiver-name"
            placeholder="수령인 이름을 입력해주세요."
            value={rName}
          />
        </div>
        <div className="input-div">
          <label htmlFor="receiver-number">수령인 전화번호</label>
          <input
            type="text"
            id="receiver-number"
            placeholder="수령인 전화번호를 입력해주세요."
            value={regNumber(rNumber)}
          />
        </div>
        <div className="input-div">
          <label htmlFor="receiver-account">수령지 주소</label>
          <input
            type="text"
            id="receiver-account"
            placeholder="수령지를 설정해주세요."
            value={addr}
            onClick={() => setAddressModal(true)}
            readOnly={true}
          />
          <input
            type="text"
            placeholder="상세 주소를 작성해주세요."
            readOnly={true}
            value={addrDetail}
          />
        </div>
        <span className="err-msg">{errMsg}</span>
      </form>
      <button
        onClick={() => {
          orderHandler();
        }}
      >
        주문 완료
      </button>
      <BasicModal
        open={addressModalOpen}
        close={closeAddressModal}
        save={saveAddressInfo}
        header="주소 등록"
      >
        <EditAddressModal
          isAddress={isAddress}
          setIsAddress={setIsAddress}
          isPostOpen={isPostOpen}
          setIsPostOpen={setIsPostOpen}
          isZoneCode={isZoneCode}
          handleComplete={handleComplete}
          detailAddress={isDetailAddress}
          setIsDetailAddress={setIsDetailAddress}
        />
      </BasicModal>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 80px 50px;
        }
        .title {
          font-size: 22px;
          font-weight: 700;
          color: #578a71;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .input-div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .input-div label:not(.equal-recv) {
          font-size: 18px;
          font-weight: 700;
          color: black;
        }
        .input-div input:not(#equal-recv),
        select {
          height: 30px;
          padding: 0px 10px;
          border-radius: 5px;
          border: 0.7px solid black;
        }
        .equal-recv-box {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .equal-recv {
          font-size: 14px;
          color: #363636;
        }
        #equal-recv {
          width: 16px;
          height: 16px;
          accent-color: #76ba99;
        }
        .err-msg {
          color: ${errState ? "#48735e" : "red"};
        }
        button {
          align-self: center;
          border: solid 2px black;
          background: none;
          border-radius: 10px;
          padding: 10px 15px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          margin-top: 15px;
        }
        button:hover {
          border: solid 2px #76ba99;
          background-color: #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
