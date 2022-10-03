import Image from "next/image";
import basicProfile from "../../public/images/basic_profile.png";
import {
  useState,
  useEffect,
  ComponentProps,
  DOMAttributes,
  useCallback,
} from "react";
import Api from "../Auth/CustomApi";
import BasicModal from "../Resource/BasicModal";
import EditAddressModal from "./EditAddressModal";
import EditMyAccountModal from "./EditMyAccountModal";
import FormData from "form-data";
import Router from "next/router";

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

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function EditMyProfile() {
  const [info, setInfo] = useState<basicInfo>();
  const [editInfo, setEditInfo] = useState<basicInfo>();
  const [openPass, setOpenPass] = useState(true);
  const [openBank, setOpenBank] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isPass, setIsPass] = useState(true);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState("");
  const [imgFile, setImgFile] = useState<File>();
  const [phone, setPhone] = useState("");
  const [regMsg, setRegMsg] = useState("");
  const infoArr = [
    name,
    pass,
    passCheck,
    address,
    detailAddress,
    bank,
    account,
    phone,
  ];
  const category = [
    "이름",
    "비밀번호",
    "비밀번호 확인",
    "주소",
    "상세 주소",
    "은행",
    "계좌번호",
    "전화번호",
  ];
  const router = Router;

  const getMyProfile = () => {
    Api.get("http://www.ablind.co.kr/mypage", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setInfo(res.data);
        setEditInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editInfoHandler = (index: number, value: string) => {
    switch (index) {
      case 0:
        onChangeName(value);
        break;
      case 1:
        passRegCheck(value);
        break;
      case 2:
        setPassCheck(value);
        break;
      case 6:
        setAccount(value);
        break;
      case 7:
        telCheck(value);
        break;
      default:
        break;
    }
  };

  const onChangeName = useCallback((value: string) => {
    setName(value);
    if (value.length < 2 || value.length > 5) {
      setRegMsg("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setRegMsg("");
      setIsName(true);
    }
  }, []);

  const telCheck = useCallback((value: string) => {
    const regex = /^[0-9\b -]{0,11}$/;
    if (regex.test(value)) {
      setPhone(value);
    }
  }, []);

  const passRegCheck = useCallback((value: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = value;
    setPass(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setRegMsg(
        "비밀번호는 숫자와 영어를 포함하여 8자리 이상으로 입력해주세요!"
      );
      setIsPass(false);
    } else {
      setRegMsg("");
      setIsPass(true);
    }

    if (passwordCurrent === "") {
      setRegMsg("");
      setIsPass(true);
    }
  }, []);

  const passEqualCheck = () => {
    if (!openPass) {
      if (pass === passCheck && isPass) {
        setOpenPass((prev) => !prev);
      } else {
        alert("패스워드가 올바르지 않습니다. 다시 확인해주세요.");
      }
    } else {
      setOpenPass((prev) => !prev);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (info) {
      const customAddress = info.address.split("_");
      setName(info.name);
      setAddress(customAddress[0]);
      setDetailAddress(customAddress[1]);
      setBank(info.account_name);
      setAccount(info.account);
      setPhone(info.phoneNumber);
    }
  }, [info]);

  //프로필 사진 수정 관련
  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        setProfile(value);
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setAttachment(result);
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  //주소 입력 관련
  const [addressModalOpen, setAddressModal] = useState(false);
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isDetailAddress, setIsDetailAddress] = useState("");

  const openAddressModal = () => setAddressModal(true);
  const closeAddressModal = () => {
    setAddress(isAddress);
    setDetailAddress(isDetailAddress);
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

  //계좌 수정 관련
  const [accountModalOpen, setAccountModal] = useState(false);
  const [accountState, setAccountState] = useState(false);
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

  // 저장 관련
  // 프로필 이미지 저장
  const profileSave = () => {
    if (attachment !== "") profileImgSave();
    profileInfoSave();
  };

  const profileImgSave = () => {
    const multipartFile = new FormData();
    multipartFile.append("file", imgFile);
    Api.put("http://www.ablind.co.kr/mypage/profile/update", multipartFile, {
      headers: {
        "Content-Type": "multipart/form-data",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  // 프로필 정보 저장
  const profileInfoSave = () => {
    //체크해야하는 요소 : 비밀번호 닫혔는지 / 은행 닫혔는지 / 이름 다 적혀있는지
    if (!openPass) {
      alert("패스워드 변경을 완료해주세요.");
    } else if (!openBank) {
      alert("계좌 정보 변경을 완료해주세요.");
    } else if (
      name === "" &&
      address === "" &&
      detailAddress === "" &&
      phone === "" &&
      !isName &&
      !isPass
    ) {
      alert(
        "올바르게 입력되지 않은 정보가 있습니다.\n 수정 후 다시 시도해주세요."
      );
    } else {
      putObject();
    }
  };

  const putObject = () => {
    if (pass !== "" && passCheck !== "") {
      Api.put(
        "http://www.ablind.co.kr/mypage/info/update",
        {
          name: name,
          address: `${address}_${detailAddress}`,
          phoneNumber: phone,
          account: account,
          account_name: bank,
          pass: pass,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          alert("프로필 정보 수정이 완료되었습니다.");
          router.replace("/MyPage");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Api.put(
        "http://www.ablind.co.kr/mypage/info/update",
        {
          name: name,
          address: `${address}_${detailAddress}`,
          phoneNumber: phone,
          account: account,
          account_name: bank,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          alert("프로필 정보 수정이 완료되었습니다.");
          router.replace("/MyPage");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      {info && infoArr ? (
        <>
          <div className="img-box">
            {attachment !== "" ? (
              <img src={attachment} className="attachment" />
            ) : (
              <Image
                src={info.image ? info.image : basicProfile}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          <label htmlFor="file" className="basic-btn">
            이미지 수정
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleOnChange}
            value={profile}
          />
          <div className="box">
            <ul>
              {category.map((menu, index) => (
                <div className="info-box">
                  <li className="info-menu">{menu}</li>
                  <li
                    className={
                      index === 1 || index === 5 ? "private-li" : "input-li"
                    }
                  >
                    <input
                      type={index === 1 || index === 2 ? "password" : "text"}
                      onChange={(e) => editInfoHandler(index, e.target.value)}
                      value={infoArr[index]}
                      disabled={
                        index === 1 || index === 2
                          ? openPass
                          : index === 5
                          ? openBank
                          : index === 4 || index === 6
                          ? true
                          : false
                      }
                      className={
                        index === 1 || index === 5
                          ? "private-input"
                          : "info-input"
                      }
                      onClick={() =>
                        index === 3
                          ? openAddressModal()
                          : index === 5
                          ? openAccountModal()
                          : null
                      }
                      placeholder={
                        index === 1 ? "패스워드가 변경되지 않습니다." : ""
                      }
                    />
                    {index === 1 || index === 5 ? (
                      <button
                        className="edit-btn"
                        onClick={() =>
                          index === 1
                            ? passEqualCheck()
                            : setOpenBank((prev) => !prev)
                        }
                      >
                        {index === 1
                          ? openPass
                            ? "수정"
                            : "완료"
                          : openBank
                          ? "수정"
                          : "완료"}
                      </button>
                    ) : (
                      <></>
                    )}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
      {regMsg === "" ? <></> : <span className="reg">{regMsg}</span>}
      <span>{`Ablind는 잘못된 정보를 입력하여 발생하는 모든 문제에 대해 책임지지 않습니다.`}</span>
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
      <BasicModal
        open={accountModalOpen}
        close={closeAccountModal}
        save={saveAccountInfo}
        header="환불계좌 등록"
      >
        <EditMyAccountModal
          bank={bank}
          setBank={setBank}
          account={account}
          setAccount={setAccount}
        />
      </BasicModal>
      <div className="btns">
        <button className="cancel-btn">취소</button>
        <button className="basic-btn" onClick={() => profileSave()}>
          저장
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }
        .img-box {
          position: relative;
          width: 250px;
          height: 250px;
          border-radius: 100%;
          overflow: hidden;
        }
        input[type="file"] {
          /* 파일 필드 숨기기 */
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: start;
          justify-content: center;
          gap: 20px;
        }
        .btns {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        .info-box {
          width: 80%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          align-items: center;
          justify-content: center;
          column-gap: 20px;
        }
        ul {
          list-style-type: none;
          margin: 0px;
          padding: 0px;
          width: 50%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        li {
          display: flex;
          flex-direction: row;
        }
        .input-li {
          justify-content: flex-start;
        }
        .private-li {
          justify-content: space-between;
        }
        .private-input,
        .info-input {
          height: 25px;
          padding: 0px 5px;
        }
        .private-input {
          width: 75%;
        }
        .info-input {
          width: 100%;
        }
        .info-menu {
          font-size: 18px;
          font-weight: 500;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
        .edit-btn {
          width: 17%;
          background-color: #949494;
          border: none;
          border-radius: 2px;
          padding: 0px 2px;
          cursor: pointer;
          color: white;
        }
        .basic-btn,
        .cancel-btn {
          border: none;
          border-radius: 7px;
          padding: 10px 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .cancel-btn {
          background-color: #646464;
        }
        .basic-btn {
          background-color: #76ba99;
        }
        .basic-btn:hover,
        .cancel-btn:hover {
          transform: scale(1.05);
        }
        .basic-btn:active,
        .cancel-btn:active {
          transform: scale(0.95);
        }
        .attachment {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .reg {
          font-size: 14px;
          color: red;
        }
      `}</style>
    </div>
  );
}
