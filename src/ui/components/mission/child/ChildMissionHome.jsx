"use client";
import { useEffect, useState } from "react";
import ChildMissionHeader from "./ChildMissionHeader";
import ChildMissionList from "./ChildMissionList";
import { ChildNoMissionCard } from "./ChildNoMissionCard";
import MissionRequestComponent from "./MissionRequestComponent";
import MissionModal from "../../atoms/MissionModal";

export const ChildMissionHome = ({ initialData }) => {
  const [selectedStates, setSelectedStates] = useState([]); // 선택된 상태 배열
  const [updateData, setData] = useState(initialData || []);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMissionId, setOpenMissionId] = useState(null);

  useEffect(() => {
    const filterMissions = () => {
      const filtered =
        selectedStates.length > 0
          ? updateData.filter((mission) =>
              selectedStates.includes(mission.state),
            ) // 선택된 상태 중 하나라도 포함
          : updateData; // 선택된 상태가 없으면 전체 데이터
      setFilteredData(filtered);
    };

    filterMissions();
  }, [selectedStates, updateData]);

  const toggleState = (state) => {
    setSelectedStates(
      (prevStates) =>
        prevStates.includes(state)
          ? prevStates.filter((s) => s !== state) // 이미 선택된 상태는 제거
          : [...prevStates, state], // 새로운 상태는 추가
    );
  };
  const openModal = (missionId) => {
    setOpenMissionId(missionId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="overflow-hidden mt-10">
      {updateData.length === 0 ? (
        <ChildNoMissionCard />
      ) : (
        <>
          <ChildMissionHeader
            onStateChange={toggleState} // 상태 변경 핸들러 전달
            selectedStates={selectedStates} // 현재 선택 상태 배열 전달
          />
          {filteredData.length === 0 ? (
            <div className="flex justify-center items-center h-[200px] text-sub02">
              <p className="items-center justify-center text-center">
                <span className="text-B-20 block mb-4">
                  해당하는 미션이 없어요.
                </span>
                <span>다른 조건으로 검색해주세요.</span>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredData.map((mission) => (
                <ChildMissionList
                  key={mission.missionId}
                  missiondata={mission}
                  onClick={() => openModal(mission.missionId)}
                />
              ))}
            </div>
          )}
          {openMissionId && (
            <MissionModal isOpen={isModalOpen} setOpen={setIsModalOpen}>
              <MissionRequestComponent
                setIsModalOpen={setIsModalOpen}
                missionId={openMissionId} // 선택된 미션 ID 전달
              />
            </MissionModal>
          )}
        </>
      )}
    </div>
  );
};
