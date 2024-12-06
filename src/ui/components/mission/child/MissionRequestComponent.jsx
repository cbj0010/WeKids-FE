import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../atoms/CustomButton";
import { missionAuth, showMissionDetail } from "@/src/apis/mission";

const MissionRequestComponent = ({ setIsModalOpen, missionId }) => {
  const [previewURL, setPreviewURL] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const [deadline, setDeadline] = useState(new Date());
  const [memo, setMemo] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [mission, setMission] = useState(null);
  const [state, setState] = useState("");

  const compressAndSetFile = async (file) => {
    if (file) {
      const options = {
        maxSizeMB: 1, // 최대 1MB로 압축
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewURL(reader.result);
        };
        reader.readAsDataURL(compressedFile);

        setFile(compressedFile);
      } catch (error) {
        console.error("업로드에 실패했습니다");
      }
    }
  };

  useEffect(() => {
    const fetchMissionDetail = async () => {
      try {
        const missionDetail = await showMissionDetail({ missionId });
        if (missionDetail) {
          setMission(missionDetail);
          setDeadline(new Date(missionDetail.deadline));
          setMemo(missionDetail.memo || "");
          setPreviewURL(missionDetail.image || "");
          setState(missionDetail.state);
        }
        if (missionDetail.image) {
          const response = await fetch(missionDetail.image);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: blob.type });
          setFile(file);
        }
      } catch (error) {
        console.error("가져오기에 실패했습니다");
      }
    };

    fetchMissionDetail();
  }, []);

  const handleFileOnChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    await compressAndSetFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    await compressAndSetFile(file);
  };

  const handleDeleteFile = () => {
    setPreviewURL("");
    setFile(null);
    setIsDragging(false);
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  const handleMissionSubmit = async () => {
    try {
      console.log("Submitting mission with:", {
        missionId,
        memo: memo,
        image: file,
      });

      await missionAuth({
        missionId: missionId,
        memo: memo || "",
        image: file || null,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("서버 오류!");

      if (error instanceof TypeError) {
        console.error("타입 에러!");
      } else if (error.response) {
        console.error("서버 오류!");
      } else {
        console.error("기타 오류!");
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      <div className="gap-1 mb-5 pt-10 px-7 w-full text-sub02 text-R-15">
        {mission?.title}
      </div>
      <div className="flex flex-col pb-10 px-7 w-full gap-2 mb-3 overflow-auto">
        <p className="text-R-10 text-sub02">미션 완료 방법</p>
        <div className="p-3 bg-main02/20 border rounded-lg text-R-12 shadow-md text-sub02/60">
          {mission?.content}
        </div>
        <p className="p-3 text-center bg-main02/20 border rounded-lg text-R-12 shadow-md text-sub02/60">
          미션 성공 시 총{" "}
          <span className="text-sub02">{mission?.amount.toLocaleString()}</span>{" "}
          원을 받을 수 있어요
        </p>
        <p className="p-3 text-center bg-main02/20 border rounded-lg text-R-12 shadow-md text-sub02/60">
          🍪{" "}
          <span className="text-sub02">
            {deadline
              ? `${deadline.getFullYear()}년 ${deadline.getMonth() + 1}월 ${deadline.getDate()}일`
              : ""}
          </span>{" "}
          까지 완료할 수 있어요
        </p>

        <p className="text-R-10 mt-6 text-sub02">미션 완료 인증하기</p>
        <div
          className={`flex flex-col items-center justify-center p-3 mb-6 ${
            isDragging ? "bg-white" : "bg-main02/20"
          } w-full h-32 border shadow-md rounded-lg`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {previewURL ? (
            <div className="flex flex-row gap-2 justify-between w-full h-28">
              <Image
                src={previewURL}
                alt="Uploaded Preview"
                width={100}
                height={100}
                className="rounded-md object-contain bg-white w-4/5 h-auto"
              />
              <button
                className="w-1/5 h-28 flex flex-col items-center justify-center bg-black/10 hover:bg-black/40 rounded-md"
                onClick={handleDeleteFile}
              >
                <Image
                  src="/images/trashImg.svg"
                  alt="delete image"
                  width={25}
                  height={25}
                />
                <p className="text-R-10">삭제</p>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                className="w-12 h-12 items-center justify-center bg-transparent rounded-full"
                onClick={handleFileButtonClick}
              >
                <Image
                  src="/images/backupImg.svg"
                  alt="upload image"
                  width={50}
                  height={50}
                  className="bg-transparent"
                />
              </button>
              <input
                ref={fileRef}
                hidden={true}
                id="file"
                type="file"
                onChange={handleFileOnChange}
              />
              <p className="text-R-10 text-black/40 mt-2">
                드래그하거나 파일을 업로드하세요.
              </p>
            </div>
          )}
        </div>
        <p className="text-R-10 text-sub02">부모님께 보낼 메시지</p>
        <div
          className={`${
            memo ? "bg-main02/20" : "bg-gray01/20"
          } rounded-lg text-R-12 shadow-md`}
        >
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full h-8 bg-transparent rounded-md resize-none outline-none p-2 text-black/80"
          ></textarea>
        </div>
        {state == "CANCEL" || state == "ACCEPT" ? (
          <></>
        ) : (
          <div className="flex flex-col h-[40px] px-10 mt-9 items-center">
            <CustomButton
              size="mediumLarge"
              rounded={true}
              onClick={handleMissionSubmit} // 버튼 클릭 시 API 호출
              className="text-R-20 bg-main02 w-full"
            >
              미 션 완 료
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionRequestComponent;
