"use client";

import { deleteMission, showMissionDetail } from "@/src/apis/mission";
import { getParentsAccounts } from "@/src/apis/parents";
import { urlPath } from "@/src/constants/common";
import missionCategories from "@/src/constants/mission";
import { useMissionIDStore } from "@/src/stores/missionFilterStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import Profile from "@/src/ui/components/atoms/Profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MissionConfirmModal from "../MissionConfirmModal";
import { characterInfoMap } from "@/src/constants/common";

const MissionAcceptComponent = ({ setIsModalOpen, missionId }) => {
  const [amount, setAmount] = useState(0); // 초기값을 0으로 설정
  const [deadline, setDeadline] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("아이가 메시지를 작성하지 않았습니다.");
  const [image, setImage] = useState(null);
  const [state, setState] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [denied, setDenied] = useState(false);
  const [iconSrc, setIconSrc] = useState("/images/trashImg.svg");
  const [childProfile, setChildProfile] = useState("");
  const router = useRouter();
  const { setMissionId } = useMissionIDStore();
  const deadlineDate = deadline ? new Date(deadline) : null;

  const formattedDeadline = deadlineDate
    ? `${deadlineDate.getFullYear()}년 ${
        deadlineDate.getMonth() + 1
      }월 ${deadlineDate.getDate()}일`
    : "";

  useEffect(() => {
    const fetchMissionDetail = async () => {
      try {
        const missionDetail = await showMissionDetail({ missionId });
        setCategory(missionDetail.category);
        setAmount(missionDetail.amount); // 기본값을 0으로 설정
        setTitle(missionDetail.title);
        setContent(missionDetail.content);
        setDeadline(missionDetail.deadline || null); // 기본값을 null로 설정
        setMissionId(missionDetail.missionId);
        setImage(missionDetail.image);
        setState(missionDetail.state || null);
        setChildProfile(missionDetail.childProfile);
        missionDetail.memo ? setMemo(missionDetail.memo) : "";
        const categoryData = missionCategories.find(
          (cat) => cat.id === (missionDetail.category || "HOUSE_WORK"),
        );
        setIconSrc(categoryData ? categoryData.icon : "/images/trashImg.svg");
      } catch (error) {
        console.error("Failed to fetch mission details:", error);
      }
    };

    fetchMissionDetail();
  }, [missionId, setMissionId]);

  const AddAndCloseModal = (type) => {
    if (type == "accept") {
      if (state != "SUBMIT") {
        setText(`아이가 미션을 완료하지 않았습니다.\n 승인하시겠습니까?`);
        setConfirmModalOpen(true);
      } else if (state == "SUBMIT") {
        router.push(urlPath.MISSION_TRANSFER);
      }
      setDenied(false); // 승인 상태
    } else if (type == "denied") {
      setText(`반려 버튼을 누르셨습니다.\n 정말 반려하시겠습니까?`);
      setDenied(true); // 반려 상태
      setConfirmModalOpen(true);
    }
  };

  const handleModalConfirm = async () => {
    if (denied) {
      // 반려 상태에서 미션 삭제 로직 처리
      try {
        await deleteMission({ missionId });
        alert("미션이 성공적으로 반려되었습니다.");
      } catch (error) {
        console.error("미션 반려 실패:", error);
        alert("미션 반려 중 오류가 발생했습니다.");
      }
    } else {
      // 승인 상태에서 페이지 이동
      try {
        const data = await getParentsAccounts();
        if (data && data.parent.balance <= amount) {
          alert("미션 금액이 보유하신 잔액보다 커요.");
          router.push(urlPath.HOME);
        } else {
          router.push(urlPath.MISSION_TRANSFER);
        }
      } catch (error) {
        console.error("실패:", error);
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      <div className="flex flex-row gap-3 mb-2 w-full pt-10 px-7">
        <div className="flex flex-row text-B-22 mb-1">
          <Profile
            width="w-[56px]"
            height="h-[56px]"
            profile={childProfile && characterInfoMap[childProfile].imagePath}
          />
        </div>
        <div className="text-sub02 text-B-18 gap-2 items-center flex flex-row">
          {title}
          <Image src={iconSrc} width={19} height={19} alt="delete icon" />
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 mb-3 pt-1 px-7 pb-1 overflow-auto">
        <div className="text-R-14 text-sub02">미션 완료 방법</div>
        <div className="p-3 bg-main02/20 border rounded-lg text-R-12 shadow-md text-sub02/60">
          {content}
        </div>
        <div className="p-3 text-center bg-main02/20 border rounded-lg text-R-12 shadow-md text-sub02/60">
          미션 성공 시 총{" "}
          <span className="text-sub02">
            {amount ? amount.toLocaleString() : "0"}
          </span>{" "}
          원을 받을 수 있어요
        </div>
        <div className="p-3 text-center bg-main02/20 border rounded-lg text-R-12 shadow-md text-sub02/60">
          🍪{" "}
          <span className="text-sub02">
            {formattedDeadline || "알 수 없음"}
          </span>{" "}
          까지 완료할 수 있어요
        </div>

        <div className="text-R-14 mt-6 text-sub02">미션 완료 인증하기</div>
        <div className="flex flex-row justify-center py-3 px-7 bg-main02/20 w-full h-32 border shadow-md rounded-lg">
          <div
            className={`flex flex-row bg-${image ? "white" : "transparent"}`}
          >
            {image ? (
              <Image src={image} alt="Example Image" width={100} height={100} />
            ) : (
              <Image
                src="/icons/favicon.svg"
                alt="Logo Image"
                width={100}
                height={100}
                className="opacity-25"
              />
            )}
          </div>
        </div>
        <div className="text-R-14 mt-6 text-sub02">자녀가 작성한 메시지</div>
        <div className="p-3 bg-main02/20 border rounded-lg text-R-12 shadow-md text-black/60">
          {memo}
        </div>
      </div>
      {state == "CANCEL" || state == "ACCEPT" ? (
        <></>
      ) : (
        <div className="flex flex-row gap-4 w-full px-7 pb-1 justify-between h-[40px]">
          <div className="flex flex-col w-full">
            <CustomButton
              size="mediumLarge"
              rounded={true}
              onClick={() => AddAndCloseModal("accept")}
              className="text-R-15 bg-main02 w-full"
            >
              승인
            </CustomButton>
            {isConfirmModalOpen && (
              <MissionConfirmModal
                setParentOpen={setIsModalOpen}
                setOpen={setConfirmModalOpen}
                text={text}
                missionId={missionId}
                denied={denied}
                onConfirm={handleModalConfirm}
              />
            )}
          </div>
          <div className="flex flex-col w-full">
            <CustomButton
              size="mediumLarge"
              rounded={true}
              onClick={() => AddAndCloseModal("denied")}
              className="flex text-R-15 bg-red01 hover:bg-redHover w-full"
            >
              취소
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionAcceptComponent;
