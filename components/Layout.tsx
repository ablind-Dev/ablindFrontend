import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props: any) {
  return (
    <>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </>
  );
}
