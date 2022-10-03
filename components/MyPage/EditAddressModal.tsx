import { Dispatch, SetStateAction } from "react";
import DaumPostcode from "react-daum-postcode";

interface editAddrProps {
  isAddress: string;
  setIsAddress: Dispatch<SetStateAction<string>>;
  isPostOpen: boolean;
  setIsPostOpen: Dispatch<SetStateAction<boolean>>;
  isZoneCode: string;
  handleComplete: (data: any) => void;
  detailAddress: string;
  setIsDetailAddress: Dispatch<SetStateAction<string>>;
}

export default function EditAddressModal(props: editAddrProps) {
  const {
    isAddress,
    setIsAddress,
    isPostOpen,
    setIsPostOpen,
    isZoneCode,
    handleComplete,
    detailAddress,
    setIsDetailAddress,
  } = props;
  return (
    <div className="modal">
      주소
      <div className="modal-firstbox">
        <div className="modal-firstbox-inner">
          <input
            type="text"
            placeholder="주소를 입력해주세요."
            disabled
            value={isAddress}
          />
          <button onClick={() => setIsPostOpen(true)}>주소찾기</button>
        </div>
        <input
          type="text"
          placeholder="우편번호를 입력해주세요."
          disabled
          value={isZoneCode}
        />
        <div>
          {isPostOpen ? (
            <div>
              <DaumPostcode
                className="postCodeStyle"
                onComplete={handleComplete}
                autoClose={false}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      상세주소
      <div className="modal-secondbox">
        <input
          type="text"
          placeholder="굿즈를 받아볼 상세주소를 입력해주세요."
          value={detailAddress}
          onChange={(e) => setIsDetailAddress(e.target.value)}
        />
      </div>
      <style jsx>{`
        .modal {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .modal input {
          height: 30px;
          padding: 0px 5px 0px 5px;
        }
        .modal-firstbox {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .modal-secondbox {
          display: flex;
          flex-direction: column;
        }
        .modal-firstbox-inner {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        .modal-firstbox-inner input {
          width: 100%;
        }

        .modal-firstbox-inner button {
          width: 80px;
          border: none;
          border-radius: 5px;
          background-color: #646464;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
