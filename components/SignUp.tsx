import { useState, useEffect } from "react";
import axios from "axios";

export default function SignUp() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");

  const onChangeHandler = (type: string, value: string) => {
    switch (type) {
      case "id":
        setId(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "pwd":
        setPwd(value);
        break;
      case "name":
        setName(value);
        break;
      case "account":
        setAccount(value);
        break;
      case "accountName":
        setAccountName(value);
        break;
      case "phoneNum":
        setPhoneNum(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const signUp = () => {
    console.log(
      `아이디 : ${id}, 비밀번호 : ${pwd}, 이름 : ${name}, 계좌번호 : ${account}, 은행 : ${accountName}, 전화번호 : ${phoneNum}, 이메일 : ${email}`
    );

    axios
      .post(
        "localhost/members/new",
        {
          member_id: id,
          name: name,
          email: email,
          address: address,
          password: pwd,
          account: account,
          account_name: accountName,
          phone_number: phoneNum,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={id}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="text"
          name="pwd"
          placeholder="비밀번호"
          value={pwd}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={name}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="text"
          name="account"
          placeholder="계좌번호"
          value={account}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="text"
          name="accountName"
          placeholder="은행"
          value={accountName}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="text"
          name="phoneNum"
          placeholder="전화번호"
          value={phoneNum}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="주소"
          value={address}
          onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        />
        <br />
        <button onClick={() => signUp()}>회원가입</button>
      </form>
    </>
  );
}
