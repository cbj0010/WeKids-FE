"use client";
import { getMissionList } from "@/src/apis/mission";
import { useMissionFilterStore } from "@/src/stores/missionFilterStore";
import { useEffect, useState } from "react";
import CustomButton from "../../atoms/CustomButton";
import FilterHeader from "./FilterHeader";
import ParentMissionList from "./ParentMissionList";
import { ParentNoMissionCard } from "./ParentNoMissionCard";
import MissionModal from "../MissionModal";
import MissionAddComponent from "./MissionAddComponent";
import MissionAcceptComponent from "./MissionAcceptComponent";

const ParentMissionHome = ({ initialData }) => {
  const { selectedChild, selectedCategory } = useMissionFilterStore();
  const [updateData, setData] = useState(initialData || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [openMissionId, setOpenMissionId] = useState(null);

  useEffect(() => {
    const fetchFilteredMissions = async () => {
      setIsLoading(true);
      try {
        const params = {
          child: selectedChild ? selectedChild.accountId : "",
          category: selectedCategory || "",
        };
        const newData = await getMissionList(params);
        setData(newData);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredMissions();
  }, [selectedChild, selectedCategory]);

  const openModal = (missionId) => {
    setOpenMissionId(missionId);
    setIsDetailOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <FilterHeader />
      <div className="flex-1 flex justify-center mb-4 overflow-hidden mt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : updateData.length === 0 ? (
          <ParentNoMissionCard />
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
            {updateData.map((mission) => (
              <ParentMissionList
                key={mission.missionId}
                missiondata={mission}
                onClick={() => openModal(mission.missionId)}
              />
            ))}
            {openMissionId && (
              <MissionModal isOpen={isDetailOpen} setOpen={setIsDetailOpen}>
                <MissionAcceptComponent
                  setIsModalOpen={setIsDetailOpen}
                  missionId={openMissionId}
                />
              </MissionModal>
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white w-full p-4 flex justify-center">
        <CustomButton
          onClick={() => setIsModalOpen(true)}
          size="medium"
          color="main"
          rounded={true}
        >
          미션 등록
        </CustomButton>
        <MissionModal isOpen={isModalOpen} setOpen={setIsModalOpen}>
          <MissionAddComponent setIsModalOpen={setIsModalOpen} />
        </MissionModal>
      </div>
    </div>
  );
};

export default ParentMissionHome;
