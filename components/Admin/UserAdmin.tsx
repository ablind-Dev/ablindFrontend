import Api from "../../components/Auth/CustomApi";
import { useState, useEffect } from "react";
import moment from "moment";

interface User {
  account: string;
  account_name: string;
  address: string;
  email: string;
  id: number;
  image: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export default function UserAdmin() {
  const [users, setUsers] = useState<Array<User>>();
  const getAllUsers = () => {
    Api.get("https://www.ablind.co.kr/admin/member/list", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id: number) => {
    if (confirm("진짜 강퇴하시겠습니까?")) {
      Api.delete(`https://www.ablind.co.kr/admin/member/delete`, {
        headers: {
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
        data: {
          id: id,
        },
      })
        .then((res) => {
          alert("해당 회원 강퇴완료");
        })
        .catch((res) => {
          alert("강퇴실패...");
          console.log(res);
        });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>고유아이디</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>은행-계좌</th>
            <th>권한</th>
            <th>강퇴</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>
                  {user.account_name}-{user.account}
                </td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>강퇴</button>
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
