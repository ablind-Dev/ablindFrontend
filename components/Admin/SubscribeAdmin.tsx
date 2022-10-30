import Api from "../../components/Auth/CustomApi";
import { useState, useEffect } from "react";
import moment from "moment";
import { MoneyWonReg } from "../Resource/MoneyWonReg";

interface Subscribe {
  approve: boolean;
  artist: string;
  createdAt: string;
  id: number;
  name: string;
  price: number;
  updatedAt: string;
}

const state = ["선택하세요", "수락", "거절"];

export default function SubscribeAdmin() {
  const [sub, setSub] = useState<Array<Subscribe>>();
  const getAllSubscribe = () => {
    Api.get("https://www.ablind.co.kr/admin/artist/follow/list", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setSub(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateState = (state: string, id: number) => {
    if (state === "수락") {
      Api.post(
        "https://www.ablind.co.kr/admin/artist/follow/approve",
        {
          id: id,
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
          alert("구독 승인 성공");
        })
        .catch((error) => {
          alert("구독 승인 실패");
        });
    } else if (state === "거절") {
      Api.post(
        "https://www.ablind.co.kr/admin/artist/follow/delete",
        {
          id: id,
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
          alert("구독 거절 성공");
        })
        .catch((error) => {
          alert("구독 거절 실패");
        });
    }
  };

  useEffect(() => {
    getAllSubscribe();
  }, []);
  return (
    <div className="container">
      <span>
        승인상태 그냥 클릭하면 바로 적용됩니다. 물론 계속 변경할 수 있으나
        사용자를 위해 유의해서 사용해주세용
      </span>
      <table>
        <thead>
          <tr>
            <th>작가 이름</th>
            <th>구독신청날짜</th>
            <th>신청 업데이트 날짜</th>
            <th>고유아이디</th>
            <th>신청자 이름</th>
            <th>가격(등급)</th>
            <th>승인상태</th>
            <th>승인상태변경</th>
          </tr>
        </thead>
        <tbody>
          {sub ? (
            sub.map((info, index) => (
              <tr key={info.id}>
                <td>{info.artist}</td>
                <td>
                  {moment(info.createdAt)
                    .add(9, "h")
                    .format("YYYY-MM-DD HH:MM:SS")}
                </td>
                <td>
                  {moment(info.updatedAt)
                    .add(9, "h")
                    .format("YYYY-MM-DD HH:MM:SS")}
                </td>
                <td>{info.id}</td>
                <td>{info.name}</td>
                <td>{MoneyWonReg(info.price)}</td>
                <td>{info.approve ? "수락됨" : "거절됨"}</td>
                <td>
                  <select
                    onChange={(e) => updateState(e.target.value, info.id)}
                  >
                    {state.map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <style jsx>{`
        table,
        tr,
        th,
        td {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
}
