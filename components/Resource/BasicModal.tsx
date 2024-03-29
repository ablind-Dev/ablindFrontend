import React, { useState, useEffect } from "react";

interface modalState {
  open: boolean;
  close: () => void;
  save: () => void;
  header: string;
  children: React.ReactNode;
}

export default function BasicModal(props: modalState) {
  const { open, close, save, header } = props;
  const [saveButton, setSaveButton] = useState("저장");
  useEffect(() => {
    if (header === "작가 구독하기") setSaveButton("결제");
  }, []);
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={save}>
              {saveButton}
            </button>
          </footer>
        </section>
      ) : null}
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .modal button {
          outline: none;
          cursor: pointer;
          border: 0;
        }
        .modal > section {
          width: 90%;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 0.3rem;
          background-color: #fff;
          animation: modal-show 0.3s;
          overflow: hidden;
        }
        .modal > section > header {
          position: relative;
          padding: 16px 64px 16px 16px;
          background-color: #f1f1f1;
          font-weight: 700;
        }
        .modal > section > header button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          color: #999;
          background-color: transparent;
        }
        .modal > section > main {
          padding: 16px;
          border-bottom: 1px solid #dee2e6;
          border-top: 1px solid #dee2e6;
        }
        .modal > section > footer {
          padding: 12px 16px;
          text-align: right;
        }
        .modal > section > footer button {
          padding: 6px 12px;
          color: #fff;
          background-color: #6c757d;
          border-radius: 5px;
          font-size: 13px;
        }
        .modal.openModal {
          display: flex;
          align-items: center;
          animation: modal-bg-show 0.3s;
        }
        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }
        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
