"use client";
import { getParentsAccounts } from "@/src/apis/parents";
import { useCreateMission } from "@/src/query/missionQuery";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import InputDateBox from "@/src/ui/components/atoms/InputDateBox";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MissionConfirmModal from "../MissionConfirmModal";
import ButtonGroup from "./ButtonGroup";

export default function MissionAddComponent({ setIsModalOpen }) {
  const [child, setChild] = useState([]);
  const [childlist, setChildList] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState(""); // 실제 저장값 (2000)
  const [formattedAmount, setFormattedAmount] = useState(""); // 화면 표시값 (2,000)
  const [deadline, setDeadLine] = useState("");
  const [checked, setChecked] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { mutate, isLoading: isUpdating } = useCreateMission();

  useEffect(() => {
    console.log(child);
    console.log(category);
    console.log(title);
    console.log(content);
    console.log(amount);
    console.log(deadline);
    if (child.length && category && title && content && amount && deadline) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [child, category, title, content, amount, deadline]);

  useEffect(() => {
    const getParentsAccount = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const data = await getParentsAccounts();
        setChildList(data.children);
      } catch (err) {
        setError(err.message); // 에러 처리
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    getParentsAccount();
  }, []);

  // 금액 포맷팅 함수
  const formatReward = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, ""); // 숫자만 추출
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 쉼표 추가
  };

  const handleRewardChange = (e) => {
    const inputValue = e.target.value;

    // 쉼표를 제거한 숫자 값
    const numericValue = inputValue.replace(/,/g, "");

    // 숫자 값만 포맷팅
    const formattedValue = formatReward(numericValue);

    // 화면에 보여줄 값은 포맷팅된 값, 실제 저장할 값은 숫자 형태로 저장
    setAmount(numericValue); // 실제 저장 (2000)
    setFormattedAmount(formattedValue); // 화면 표시용 (2,000)
  };

  const handleCancel = () => {
    if (child.length || category || title || amount || amount || deadline) {
      setConfirmModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const AddAndCloseModal = () => {
    if (checked) {
      const apiCalls = child.map((childId) =>
        mutate(
          {
            childId: childId,
            title: title,
            content: content,
            deadline: deadline,
            amount: amount,
            category: category,
          }, // 각 childId로 API 호출
          {
            onSuccess: () => {
              console.log(`성공! Child ID: ${childId}`);
            },
            onError: (error) => {
              console.error(
                `실패! Child ID: ${childId}, Error: ${error.message}`,
              );
            },
          },
        ),
      );

      // 모든 호출이 완료된 후 처리
      Promise.all(apiCalls)
        .then(() => {
          console.log("모든 API 호출이 완료되었습니다!");
        })
        .catch((error) => {
          console.error("하나 이상의 API 호출이 실패했습니다:", error);
        });
      setIsModalOpen(false);
    } else {
      toast("빈칸을 모두 채워주세요!");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      <Toaster />
      <p className="text-B-18 mb-5 px-7 pt-10">미션 등록하기</p>
      <div className="w-full overflow-y-auto gap-3 h-full mb-1 px-7 pb-10">
        <div className="flex flex-col gap-1">
          <ButtonGroup
            childrenData={childlist}
            setTopButtonChecked={setChild}
            setBottomButtonChecked={setCategory}
          />
          <div className="flex flex-col gap-1 mb-5 mt-5">
            <p className="text-R-10 text-sub02">미션명</p>
            <div
              className={`${title != "" ? "bg-main02/20" : "bg-gray01/20"} rounded-lg text-R-12 shadow-md text-black/80`}
            >
              <textarea
                className="w-full h-8 bg-transparent rounded-md resize-none outline-none p-2"
                placeholder="미션명을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <p className="text-R-10 text-sub02">미션 완료 방법</p>
          <div
            className={`${content != "" ? "bg-main02/20" : "bg-grey01/20"} rounded-lg text-R-12 shadow-md text-black/80`}
          >
            <textarea
              className="w-full h-32 bg-transparent rounded-md resize-none outline-none p-2"
              placeholder="아이가 미션을 완료할 수 있게 설명을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <p className="text-R-10 text-sub02">미션 완료 시 수령 금액</p>
          <div
            className={`${amount != "" ? "bg-main02/20" : "bg-grey01/20"} rounded-lg text-R-12 shadow-md text-black/80`}
          >
            <input
              type="text"
              className="w-full h-8 bg-transparent rounded-md outline-none p-2"
              placeholder="미션 완료 시 아이가 수령할 금액을 입력해주세요."
              value={formattedAmount} // 화면에 표시될 값
              onChange={handleRewardChange} // 값 변경 핸들러
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <InputDateBox
            value={deadline}
            onChange={(value) => setDeadLine(value)}
            label="미션 만료일"
            className={`${deadline != "" ? "bg-main02/20" : "bg-grey01/20"}`}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-row gap-4 w-full justify-between h-[40px] mt-9">
            <div className="flex flex-col w-full">
              <CustomButton
                size="mediumLarge"
                rounded={true}
                onClick={handleCancel}
                className="flex bg-stone-300 hover:bg-neutral-400 text-R-15 w-full"
              >
                취 소
              </CustomButton>
            </div>
            <div className="flex flex-col w-full">
              <CustomButton
                size="mediumLarge"
                rounded={true}
                onClick={AddAndCloseModal}
                className={` ${!checked ? "bg-stone-300 hover:bg-neutral-400" : "bg-main03 hover:bg-main01"} text-R-15 w-full`}
              >
                미 션 등 록
              </CustomButton>
              {isConfirmModalOpen && (
                <MissionConfirmModal
                  setParentOpen={setIsModalOpen}
                  setOpen={setConfirmModalOpen}
                  text={`작성중인 미션이 있습니다. <br/> 그래도 나가시겠습니까?`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
