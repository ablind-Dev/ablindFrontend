import { NextPage } from "next";
import { useCallback, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recoilSignUpState } from "../states/recoilSignUpState";
import BasicModal from "./BasicModal";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

interface SignUpState {
  name: string;
  id: string;
  pwd: string;
}

interface InfoInterface {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  account: string;
  account_name: string;
}

const AddInfo: NextPage<{ backLogin: () => void; backpage: () => void }> = (
  props
) => {
  //상태관리
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilSignUpState);
  const resetRecoil = useResetRecoilState(recoilSignUpState);
  const defaultState: SignUpState = { ...recoilInfo };
  const [completeInfo, setCompleteInfo] = useState<InfoInterface>();

  //전화번호 입력 관련
  const [phoneNum, setPhoneNum] = useState("");
  const [errorMsg, setError] = useState("");

  const phoneNumberCheck = () => {
    if (
      phoneNum.substring(0, 3) !== "010" &&
      phoneNum.substring(0, 3) !== "011" &&
      phoneNum.substring(0, 3) !== "016" &&
      phoneNum.substring(0, 3) !== "017" &&
      phoneNum.substring(0, 3) !== "018" &&
      phoneNum.substring(0, 3) !== "019"
    )
      setError("전화번호 입력 형식을 확인해주세요.");
    else {
      setError("");
    }
  };

  const phoneNumberInput = (typing: string) => {
    setPhoneNum(typing.replace(/[^0-9]/g, ""));
    phoneNumberCheck();
  };

  //계좌 입력 관련
  const [accountModalOpen, setAccountModal] = useState(false);
  const [accountState, setAccountState] = useState(false);
  const [bank, setBank] = useState("");
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
  const [account, setAccount] = useState("");
  const bankHandler = (bank: string) => {
    setBank(bank);
  };
  const accountInput = (typing: string) => {
    setAccount(typing.replace(/[^0-9]/g, ""));
  };
  const openAccountModal = () => setAccountModal(true);
  const closeAccountModal = () => setAccountModal(false);

  const saveAccountInfo = () => {
    if (bank !== "" && account !== "") {
      setAccountState(true);
      closeAccountModal();
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };
  const deleteAccountInfo = () => {
    setAccountState(false);
    setBank("");
    setAccount("");
  };

  //주소 입력 관련
  const [addressModalOpen, setAddressModal] = useState(false);
  const [addressState, setAddressState] = useState(false);
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [detailAddress, setDetailAddress] = useState("");

  const openAddressModal = () => setAddressModal(true);
  const closeAddressModal = () => setAddressModal(false);

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

  const inputDetailAddress = (typing: string) => {
    setDetailAddress(typing);
  };

  const saveAddressInfo = () => {
    if (isAddress !== "" && isZoneCode !== "" && detailAddress !== "") {
      setAddressState(true);
      closeAddressModal();
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  const deleteAddressInfo = () => {
    setAddressState(false);
    setIsAddress("");
    setIsZoneCode("");
    setDetailAddress("");
  };

  const backBtn = () => {
    if (
      confirm(
        "작성한 정보는 저장되지 않습니다.\n정말 처음화면으로 돌아가시겠습니까?"
      )
    ) {
      props.backLogin();
      resetRecoil;
    }
  };

  //약관 관련
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [usePolicy, setUsePolicy] = useState(false);

  //회원가입 완료
  const complteBtnClickHandler = () => {
    if (phoneNum === "") setError("전화번호를 입력해주세요.");
    else if (!accountState) setError("환불계좌 정보를 입력해주세요.");
    else if (!addressState) setError("주소 정보를 입력해주세요.");
    else if (!privacyPolicy || !usePolicy)
      setError("동의하지 않은 약관이 있습니다.");
    else {
      setError("");
      saveState();
    }
  };

  const saveState = () => {
    axios
      .post(
        "http://www.ablind.co.kr/members/new",
        {
          name: defaultState.name,
          email: defaultState.id,
          pass: defaultState.pwd,
          phoneNumber: phoneNum,
          address: `${isAddress}(${isZoneCode})_${detailAddress}`,
          account: account,
          account_name: bank,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (confirm("회원가입이 완료되었습니다.\n로그인해주세요!")) {
          props.backpage();
        } else {
          props.backpage();
        }
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="number">전화번호</label>
        <input
          id="number"
          type="text"
          placeholder="'-'은 제외하고 입력해주세요. ex) 01000000000"
          className="input-text"
          value={phoneNum}
          onChange={(e) => phoneNumberInput(e.target.value)}
          maxLength={11}
        />
      </form>
      <div className="label">환불계좌</div>
      {accountState ? (
        <div className="account-box">
          {bank} | {account}
          <div className="hover-account">
            <button onClick={() => deleteAccountInfo()}>계좌 삭제하기</button>
          </div>
        </div>
      ) : (
        <div className="account-box">
          환불 계좌를 등록해주세요.
          <div className="hover-account">
            <button onClick={() => openAccountModal()}>계좌 등록하기</button>
          </div>
        </div>
      )}
      <BasicModal
        open={accountModalOpen}
        close={closeAccountModal}
        save={saveAccountInfo}
        header="환불계좌 등록"
      >
        <div className="modal">
          은행
          <select
            onChange={(e) => bankHandler(e.target.value)}
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
            onChange={(e) => accountInput(e.target.value)}
            className="account-input"
          />
        </div>
      </BasicModal>
      <div className="label">주소</div>
      {addressState ? (
        <div className="address-box">
          {isAddress} | {detailAddress}
          <div className="hover-address">
            <button className="hover-btn" onClick={() => deleteAddressInfo()}>
              주소 삭제하기
            </button>
          </div>
        </div>
      ) : (
        <div className="address-box">
          굿즈를 받아볼 주소를 등록해주세요.
          <div className="hover-address">
            <button className="hover-btn" onClick={() => openAddressModal()}>
              주소 등록하기
            </button>
          </div>
        </div>
      )}
      <BasicModal
        open={addressModalOpen}
        close={closeAddressModal}
        save={saveAddressInfo}
        header="주소 등록"
      >
        <div className="modal">
          주소
          <div className="modal-firstbox">
            <div className="modal-firstbox-inner">
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                disabled
                value={isAddress}
              />
              <button onClick={() => setIsPostOpen(true)}>주소찾기</button>
            </div>
            <input
              type="text"
              placeholder="우편번호를 입력해주세요."
              disabled
              value={isZoneCode}
            />
            <div>
              {isPostOpen ? (
                <div>
                  <DaumPostcode
                    className="postCodeStyle"
                    onComplete={handleComplete}
                    autoClose={false}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          상세주소
          <div className="modal-secondbox">
            <input
              type="text"
              placeholder="굿즈를 받아볼 상세주소를 입력해주세요."
              value={detailAddress}
              onChange={(e) => inputDetailAddress(e.target.value)}
            />
          </div>
        </div>
      </BasicModal>
      <form className="agree-box" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="checkbox"
            id="privacy"
            className="checkbox"
            checked={privacyPolicy}
            onChange={(e) => setPrivacyPolicy(e.target.checked)}
          />
          <label htmlFor="privacy">
            <a href="#" target="_blank">
              개인정보 처리방침
            </a>
            을 확인하였으며, 이에 동의합니다.
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="rule"
            className="checkbox"
            checked={usePolicy}
            onChange={(e) => setUsePolicy(e.target.checked)}
          />
          <label htmlFor="rule">
            <a href="#" target="_blank">
              이용약관
            </a>
            을 확인하였으며, 이에 동의합니다.
          </label>
        </div>
      </form>
      <div>{errorMsg}</div>
      <div className="btns-box">
        <button
          onClick={() => {
            backBtn();
          }}
          className="back"
        >
          처음화면으로
        </button>
        <button className="complete" onClick={() => complteBtnClickHandler()}>
          가입완료
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 445.35px;
          gap: 5px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        label {
          font-size: 18px;
          color: #646464;
          letter-spacing: -0.02;
        }
        .label {
          font-size: 18px;
          color: #646464;
          letter-spacing: -0.02;
        }
        .input-text {
          border: none;
          background-color: #afafaf;
          border-radius: 5px;
          height: 40px;
          font-size: 16px;
          padding: 0px 10px 0px 10px;
          color: white;
          font-weight: 200;
        }
        .btns-box {
          padding-top: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .btns-box button {
          border: none;
          height: 50px;
          width: 210px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          border-radius: 5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }
        .back {
          background-color: #646464;
        }
        .complete {
          background-color: #76ba99;
        }

        .account-box,
        .address-box {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 40px;
          background-color: #76ba99;
          border-radius: 5px;
          color: white;
          font-weight: 300;
          cursor: default;
        }

        .hover-account,
        .hover-address {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border-radius: 2px;
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }

        .hover-account button,
        .hover-address button {
          padding: 2px 20px 2px 20px;
          border-radius: 0.5rem;
          border: 2px solid black;
          background-color: #00ff0000;
          color: black;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }

        .account-box:hover .hover-account,
        .address-box:hover .hover-address {
          opacity: 1;
        }

        .hover-account button:hover,
        .hover-address button:hover {
          background-color: black;
          color: white;
          border: 2px solid black;
        }

        .agree-box {
          padding-top: 20px;
        }
        .checkbox {
          width: 18px;
          height: 18px;
          accent-color: #76ba99;
        }
        .agree-box div {
          display: flex;
          align-items: center;
        }
        a {
          font-weight: bold;
        }
        a:visited {
          color: black;
        }
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
        .modal-firstbox {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .modal-secondbox {
          display: flex;
          flex-direction: column;
        }
        .modal-firstbox-inner {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        .modal-firstbox-inner input {
          width: 100%;
        }

        .modal-firstbox-inner button {
          width: 80px;
          border: none;
          border-radius: 5px;
          background-color: #646464;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AddInfo;
