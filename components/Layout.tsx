import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout(props: any) {
  return (
    <>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </>
  );
}
