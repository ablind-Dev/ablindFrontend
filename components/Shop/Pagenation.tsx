import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

//prop로 받아야할 것 => 전체 페이지 수, 페이지에 따라서 아이템 세팅되는 setState
interface pageProps {
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagenation(props: pageProps) {
  const { pages, setPage } = props;
  const [curPage, setCurPage] = useState(0);
  return (
    <div>
      <FontAwesomeIcon icon={faChevronLeft} />
      <ul></ul>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}
