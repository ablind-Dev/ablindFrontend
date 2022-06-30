import SignInImageCarousel from "../components/SignInImageCarousel";
import LoginForm from "../components/LoginForm";
import ButtonsForm from "../components/ButtonsForm";
import SignUpForm from "../components/SignUpForm";
import AddInfo from "../components/AddInfo";
import { useState } from "react";

export default function SignIn() {
  const [state, setState] = useState("login");
  const loginFormChange = () => {
    setState("login");
  };
  const buttonsFormChange = () => {
    setState("buttons");
  };
  const signupFormChange = () => {
    setState("signup");
  };
  const addInfoChange = () => {
    setState("addinfo");
  };

  return (
    <div className="container">
      <SignInImageCarousel />
      {state === "login" ? (
        <LoginForm onChagne={buttonsFormChange} />
      ) : state === "buttons" ? (
        <ButtonsForm backLogin={loginFormChange} goSignup={signupFormChange} />
      ) : state === "signup" ? (
        <SignUpForm backLogin={loginFormChange} goNext={addInfoChange} />
      ) : (
        <AddInfo backLogin={loginFormChange} backpage={signupFormChange} />
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          padding: 50px 0px 150px 0px;
        }
      `}</style>
    </div>
  );
}
