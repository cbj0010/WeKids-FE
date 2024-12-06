export const assigndata = [
  {
    title: "개인정보 수집 및 이용 동의 (필수)",
    content:
      "금융 상품 가입 및 서비스 제공을 위해 귀하의 개인정보(이름, 연락처, 계좌정보 등)를 수집·이용합니다. 수집된 정보는 계약 이행 및 법령에 따라 보관됩니다.",
  },
  {
    title: "전자금융거래 이용 약관 동의 (필수)",
    content:
      "전자금융거래 이용 시 거래 내역 확인 및 안전한 서비스 제공을 위해 본 약관에 동의합니다. 약관은 서비스 이용 도중 언제든지 열람할 수 있습니다.",
  },
  {
    title: "상품 계약 관련 정보 제공 동의 (필수)",
    content:
      "가입하신 상품의 운영 및 관련 정보 제공을 위해 본 약관에 동의합니다. 상품 운영과 관련된 주요 변동 사항은 사전에 고지됩니다.",
  },
  {
    title: "마케팅 정보 수신 동의 (선택)",
    content:
      "최신 금융 상품 및 이벤트 소식을 SMS, 이메일 등으로 받아보시려면 본 약관에 동의해주세요. 동의를 거부하셔도 금융 상품 가입에는 문제가 없습니다.",
  },
];

export const alarmData = {
  MISSION: {
    emoticon: "COMPLETED",
    title: "완료 미션 바로 보기",
    description: (missionName) =>
      `미션을 확인해보세요. <br/>아이가 ${missionName}미션을 완료했습니다.`,
  },
  READY: {
    emoticon: "DOCUMENT",
    title: "등록된 카드 디자인 확인하기",
    description: () =>
      `아이가 카드 발급 신청했습니다. 부모님의 동의가 필요해요.`,
  },
  CREATED: {
    emoticon: "CARD",
    title: "등록된 카드 디자인 확인하기",
    description: () => `카드 발급이 완료되었습니다!`,
  },
  ANNOUNCEMENT: {
    emoticon: "ANNOUNCEMENT",
    title: "휴일에도 자동이체가 가능합니다!",
    description: () => `2024년 10월 7일부터 휴일에도 자동이체가 가능해요!`,
  },
  MISSION: {
    emoticon: "MISSION",
    title: "부모 동의 알림 확인하기",
    description: () =>
      `가족관계 증명서 확인해주기. <br/>아이가 소셜로그인 가입을 위한 부모 동의 알림을 보냈습니다!`,
  },
};

// export const missionData = {
//   NEW: {
//     emoticon: "MISSION",
//     title: "미션이 등록되었어요.",
//     description: () =>
//       `아이가 미션을 등록했어요 확인해보세요!`,
//   },
//   SUBMIT: {
//     emoticon: "MISSION",
//     title: "미션 인증요청이 들어왔어요.",
//     description: () =>
//       `아이가 미션을 인증했어요 확인해보세요!`,
//   },
//   ACCEPT: {
//     emoticon: "MISSION",
//     title: "부모님이 미션을 승인했어요.",
//     description: () =>
//       `부모님이 미션 인증을 승인하셨어요 확인해보세요!`,
//   },
//   CANCEL: {
//     emoticon: "MISSION",
//     title: "부모님이 미션을 반려했어요.",
//     description: () => `부모님이 미션 인증을 반려하셨어요 다음에는 더 열심히 해봐요!`,
//   },
//   OUTDATED: {
//     emoticon: "MISSION",
//     title: "미션 기한이 지났어요..!",
//     description: () => `미션 기한이 지났어요 다음에는 더 열심히 해봐요!`,
//   },

// };

export const missionData = {
  NEW: {
    emoticon: "MISSION",
    title: "미션이 등록되었어요!",
    description: () => `아이가 미션을 등록했어요 확인해보세요!`,
  },
  SUBMIT: {
    emoticon: "MISSION",
    title: "미션 인증요청이 들어왔어요!",
    description: () => `아이가 미션을 인증했어요 확인해보세요!`,
  },
  ACCEPT: {
    emoticon: "MISSION",
    title: "부모님이 미션을 승인했어요!",
    description: () => `부모님이 미션 인증을 승인하셨어요 확인해보세요!`,
  },
  CANCEL: {
    emoticon: "MISSION",
    title: "부모님이 미션을 반려했어요!",
    description: () =>
      `부모님이 미션 인증을 반려하셨어요 다음에는 더 열심히 해봐요!`,
  },
  OUTDATED: {
    emoticon: "MISSION",
    title: "미션 기한이 지났어요!",
    description: () => `미션 기한이 지났어요 다음에는 더 열심히 해봐요!`,
  },
};

export const cardData = {
  NONE: {
    emoticon: "CARD",
    title: "카드가 아직 없어요.",
    description: () => `혹시 모르니 넣어놓은 값!`,
  },
  READY: {
    emoticon: "CARD",
    title: "카드 발급 대기중이에요!",
    description: () => `아이 카드 발급 인증을 해주세요!`,
  },
  CREATED: {
    emoticon: "CARD",
    title: "카드 발급이 완료되었어요!",
    description: () => `부모님이 카드발급을 완료해주셨어요!`,
  },
};

export const generateYears = (startYear, endYear) => {
  return Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  );
};

export const generateMonths = () => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

export const generateDates = () => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
};

export const year = generateYears(1940, 2024);
export const month = generateMonths();
export const date = generateDates();

export const validationMessages = {
  1: "주민번호와 주민번호 확인이 일치하지 않아요.",
  2: "주민번호 입력칸에 빈칸이 있어요.",
  3: "주민번호 확인칸에 빈칸이 있어요.",
  4: "약관동의를 다 해주세요.",
};
