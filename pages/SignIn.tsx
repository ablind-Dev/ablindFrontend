import SignInImageCarousel from "../components/Resource/SignInImageCarousel";
import LoginForm from "../components/Sign/LoginForm";
import ButtonsForm from "../components/Sign/ButtonsForm";
import SignUpForm from "../components/Sign/SignUpForm";
import AddInfo from "../components/Sign/AddInfo";
import { useState, useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import Seo from "../components/Seo";

export default function SignIn() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);

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
      <Seo title="Sign In" />
      <SignInImageCarousel />
      {state === "login" ? (
        <LoginForm onChagne={buttonsFormChange} />
      ) : state === "buttons" ? (
        <ButtonsForm backLogin={loginFormChange} goSignup={signupFormChange} />
      ) : state === "signup" ? (
        <SignUpForm backLogin={loginFormChange} goNext={addInfoChange} />
      ) : (
        <AddInfo backLogin={loginFormChange} backpage={loginFormChange} />
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          padding: 30px 0px 150px 0px;
        }
      `}</style>
    </div>
  );
}
