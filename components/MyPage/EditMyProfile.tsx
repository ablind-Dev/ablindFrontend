import Image from "next/image";
import basicProfile from "../../public/images/basic_profile.png";
import { useState, useEffect } from "react";
import Api from "../Auth/CustomApi";

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

export default function EditMyProfile() {
  const [info, setInfo] = useState<basicInfo>();
  const [address, setAddress] = useState<Array<string>>();
  const category = [
    "이름",
    "비밀번호",
    "비밀번호 확인",
    "주소",
    "상세 주소",
    "은행",
    "계좌번호",
  ];

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

  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (info) {
      const customAddress = info.address.split("_");
      setAddress(customAddress);
    }
  }, [info]);

  return (
    <div className="container">
      {info && address ? (
        <>
          <div className="img-box">
            <Image
              src={info.image ? info.image : basicProfile}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <button>이미지 수정</button>
          <div className="box">
            <ul>
              {category.map((menu) => (
                <li>{menu}</li>
              ))}
            </ul>
            <ul>
              <li>
                <input type="text" value={info.name} />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="숫자 영어 특수문자 포함 8글자 이상"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="숫자 영어 특수문자 포함 8글자 이상"
                />
              </li>
              <li>
                <input type="text" value={address[0]} />
              </li>
              <li>
                <input type="text" value={address[1]} />
              </li>
              <li>
                <input type="text" value={info.account_name} />
              </li>
              <li>
                <input type="text" value={info.account} />
              </li>
            </ul>
            <ul>
              <li></li>
              <li>
                <button>수정</button>
              </li>
              <li></li>
              <li>
                <button>수정</button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="btns">
        <button>취소</button>
        <button>저장</button>
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
        .box {
          display: flex;
          flex-direction: row;
          align-items: start;
          gap: 20px;
        }
        .btns {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        ul {
          list-style-type: none;
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </div>
  );
}
