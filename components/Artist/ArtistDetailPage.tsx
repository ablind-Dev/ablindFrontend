import { useState, useEffect } from "react";
import Image from "next/image";
import totop from "../../public/images/caret-up.png";
import totopWhite from "../../public/images/caret-up-white.png";
import ArtistDetailUpperComponent from "./ArtistDetailUpperComponent";
import ArtistDetailContentComponent from "./ArtistDetailContentComponent";
import ArtistDetailArtworksComponent from "./ArtistDetailArtworksComponent";
import ArtistDetailCommentComponent from "./ArtistDetailCommentComponent";

interface serverSideProps {
  artistId: number;
  title: string;
  subtitle: string;
  content: string;
  profile: string; //이미지 url
  background: string; //이미지 url
  youtube: string;
  detail: string; //이미지 url
  artworks: Array<string>;
}

export default function ArtistDetailPage(props: serverSideProps) {
  const {
    artistId,
    title,
    subtitle,
    content,
    profile,
    background,
    youtube,
    detail,
    artworks,
  } = props;
  const moveToTop = () => (document.documentElement.scrollTop = 0);
  return (
    <div>
      <div className="toTop">
        <button onClick={() => moveToTop()} className="scrollBtn">
          <div className="white">
            <Image src={totopWhite} />
          </div>
          <div className="black">
            <Image src={totop} />
          </div>
        </button>
      </div>
      <ArtistDetailUpperComponent
        title={title}
        subtitle={subtitle}
        content={content}
        profile={profile}
        background={background}
      />
      <ArtistDetailContentComponent youtube={youtube} detail={detail} />
      <div className="artwork-cover-box">
        <div className="artwork-box">
          <ArtistDetailArtworksComponent artworks={artworks} />
        </div>
      </div>
      <div className="btn-box">
        <button>구독하고 굿즈받기</button>
        <button>다른 작가 보러가기</button>
      </div>
      <hr />
      <div className="comment-box">
        <ArtistDetailCommentComponent artistId={artistId} />
      </div>
      <style jsx>{`
        .toTop {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 5;
        }
        .scrollBtn {
          background-color: #434343;
          width: 35px;
          height: 35px;
          padding: 8px;
          border: none;
          border-radius: 100%;
          position: relative;
          cursor: pointer;
          transition: all 0.15s;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .white {
          opacity: 1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.15s;
        }
        .black {
          opacity: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.15s;
        }
        .scrollBtn:hover {
          background-color: #76ba99;
        }
        .scrollBtn:hover .white {
          opacity: 0;
        }
        .scrollBtn:hover .black {
          opacity: 1;
        }
        .artwork-cover-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .artwork-box {
          width: 1180px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 40px;
          padding: 100px 0px 100px 0px;
        }
        .btn-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 20px;
        }
        .btn-box button {
          background-color: #00ff0000;
          padding: 10px 15px 10px 15px;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: 3px solid #76ba99;
          color: #76ba99;
          transition: all 0.25s;
        }
        .btn-box button:hover {
          border: 3px solid #76ba99;
          background-color: #76ba99;
          color: white;
        }
        hr {
          width: 90%;
          margin-top: 90px;
          height: 1px;
          background-color: black;
          border: none;
          border-radius: 3px;
        }
        .comment-box {
          width: 80%;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
