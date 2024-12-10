"use client";
import { fetchChildAccounts } from "@/src/apis/account";
import { getMissionList } from "@/src/apis/mission";
import { useMissionFilterStore } from "@/src/stores/missionFilterStore";
import Modal from "@/src/ui/components/atoms/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import CategoryBadge from "./CategoryBadge";

export const MissionFilterModal = ({ isOpen, onClose }) => {
  const {
    selectedChild,
    setSelectedChild,
    selectedCategory,
    setSelectedCategory,
  } = useMissionFilterStore();

  const [children, setChildren] = useState([]);
  const [tempSelectedChild, setTempSelectedChild] = useState(selectedChild);
  const [tempSelectedCategory, setTempSelectedCategory] =
    useState(selectedCategory);

  useEffect(() => {
    const loadChildAccounts = async () => {
      try {
        const accounts = await fetchChildAccounts();
        setChildren(accounts);
      } catch (error) {
        console.error("Failed to fetch child accounts:", error);
      }
    };

    loadChildAccounts();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedChild(selectedChild);
      setTempSelectedCategory(selectedCategory);
    }
  }, [isOpen, selectedChild, selectedCategory]);

  const handleConfirm = async () => {
    try {
      // 1. 선택한 필터로 먼저 조회
      const selectedParams = {
        child: tempSelectedChild?.accountId || "",
        category: tempSelectedCategory || "",
      };
      const filteredResult = await getMissionList(selectedParams);

      if (filteredResult && filteredResult.length > 0) {
        // 선택한 필터로 결과가 있는 경우
        setSelectedChild(tempSelectedChild);
        setSelectedCategory(tempSelectedCategory);
      } else if (tempSelectedChild) {
        // 2. 결과가 없고 자녀가 선택된 경우, 해당 자녀의 전체 미션 조회
        const childOnlyParams = {
          child: tempSelectedChild.accountId,
          category: "",
        };
        const childMissions = await getMissionList(childOnlyParams);

        if (childMissions && childMissions.length > 0) {
          // 3. 자녀의 전체 미션이 있는 경우
          setSelectedChild(tempSelectedChild);
          setSelectedCategory(null);
        } else {
          // 4. 자녀의 전체 미션도 없는 경우
          setSelectedChild(null);
          setSelectedCategory(null);
        }
      } else {
        // 자녀가 선택되지 않은 경우 모든 필터 초기화
        setSelectedChild(null);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error("Failed to fetch missions:", error);
      // 에러 발생 시 모든 필터 초기화
      setSelectedChild(null);
      setSelectedCategory(null);
    } finally {
      setTempSelectedChild(null);
      setTempSelectedCategory(null);
      onClose();
    }
  };

  const handleClose = () => {
    // Modal을 닫을 때 임시 상태를 초기화
    setTempSelectedChild(null);
    setTempSelectedCategory(null);
    onClose();
  };

  const categories = [
    { type: "HOUSE_WORK" },
    { type: "SELF_DEVELOPMENT" },
    { type: "LIFESTYLE_HABITS" },
    { type: "ETC" },
  ];

  return (
    <Modal isOpen={isOpen} modalHandler={handleClose}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <button onClick={handleClose}>
            <Image src="/images/cross.svg" alt="닫기" width={24} height={24} />
          </button>
          <button onClick={handleConfirm} className="text-B-16">
            확인
          </button>
        </div>

        {/* 자녀 필터 */}
        <div className="mt-8">
          <h3 className="text-B-16 text-sub01">자녀</h3>
          <div className="border-t border-gray01/10 mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setTempSelectedChild(null)}
                className={`px-4 py-2 rounded-lg ${
                  tempSelectedChild === null
                    ? "bg-main02 text-white"
                    : "bg-gray01/10 text-sub02"
                }`}
              >
                All
              </button>

              {children.map((child) => (
                <button
                  key={child.accountId}
                  onClick={() => setTempSelectedChild(child)}
                  className={`px-4 py-2 rounded-lg ${
                    tempSelectedChild?.accountId === child.accountId
                      ? "bg-main02 text-white"
                      : "bg-gray01/10 text-sub02"
                  }`}
                >
                  {child.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 미션 필터 */}
        <div className="mt-8">
          <h3 className="text-B-16 text-sub01">미션</h3>
          <div className="border-t border-gray01/10 mt-4">
            <div className="flex flex-wrap gap-2 justify-between">
              {categories.map((category) => (
                <CategoryBadge
                  key={category.type}
                  missionType={category.type}
                  isButton={true}
                  height="h-[40px]"
                  textSize="text-R-14"
                  onClick={() => setTempSelectedCategory(category.type)}
                  selected={tempSelectedCategory === category.type}
                  className="flex-grow text-center py-5"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
