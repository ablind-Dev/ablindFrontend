import SignInImageCarousel from "../components/SignInImageCarousel";
import LoginForm from "../components/LoginForm";
import ButtonsForm from "../components/ButtonsForm";
import SignUpForm from "../components/SignUpForm";
import { useState, useEffect } from "react";

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
  return (
    <div className="container">
      <SignInImageCarousel />
      {state === "login" ? (
        <LoginForm onChagne={buttonsFormChange} />
      ) : state === "buttons" ? (
        <ButtonsForm backLogin={loginFormChange} goSignup={signupFormChange} />
      ) : (
        <SignUpForm />
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
