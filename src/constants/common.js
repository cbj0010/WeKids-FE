export const characterInfoMap = {
  HEARTSPRING: {
    name: "하츄핑",
    imagePath: "/images/hachupingImg.svg", // 하츄핑 이미지 경로
    colorClass: "bg-pinkHachu", // CSS 클래스 이름으로 색상 관리
  },
  DADAPING: {
    name: "바로핑",
    imagePath: "/images/dadapingImg.svg", // 바로핑 이미지 경로
    colorClass: "bg-blueDada", // CSS 클래스 이름으로 색상 관리
  },
  GOGOPING: {
    name: "아자핑",
    imagePath: "/images/gogopingImg.svg", // 아자 이미지 경로
    colorClass: "bg-yellowGogo", // CSS 클래스 이름으로 색상 관리
  },
  CHACHAPING: {
    name: "차차핑",
    imagePath: "/images/chachapingImg.svg", // 차차핑 이미지 경로
    colorClass: "bg-yellowChacha", // CSS 클래스 이름으로 색상 관리
  },
  LALAPING: {
    name: "라라핑",
    imagePath: "/images/lalapingImg.svg", // 라라핑 이미지 경로
    colorClass: "bg-purpleLala", // CSS 클래스 이름으로 색상 관리
  },
  HAPPYING: {
    name: "해핑",
    imagePath: "/images/happingImg.svg", // 해핑 이미지 경로
    colorClass: "bg-pinkHap", // CSS 클래스 이름으로 색상 관리
  },
};

export const colorTypeMap = {
  PINK1: {
    name: "하츄핑",
    colorClass: "bg-pinkHachu", // CSS 클래스 이름으로 색상 관리
  },
  BLUE: {
    name: "바로핑",
    colorClass: "bg-blueDada", // CSS 클래스 이름으로 색상 관리
  },
  YELLOW: {
    name: "아자핑",
    colorClass: "bg-yellowGogo", // CSS 클래스 이름으로 색상 관리
  },
  GREEN: {
    name: "차차핑",
    colorClass: "bg-yellowChacha", // CSS 클래스 이름으로 색상 관리
  },
  PURPLE: {
    name: "라라핑",
    colorClass: "bg-purpleLala", // CSS 클래스 이름으로 색상 관리
  },
  PINK2: {
    name: "해핑",
    colorClass: "bg-pinkHap", // CSS 클래스 이름으로 색상 관리
  },
};

export const missionColorMap = {
  ACCEPT: {
    text: "ACC",
    background: "bg-blue01/80",
    iconBg: "bg-main02",
  },
  NEW: {
    text: "NEW",
    background: "bg-main02/20",
    iconBg: "bg-pink01",
  },
  SUBMIT: {
    text: "SUB",
    background: "bg-purple01/20",
    iconBg: "bg-purple01",
  },
  CANCEL: {
    text: "REJ",
    background: "bg-red01/20",
    iconBg: "bg-red01",
  },
  OUTDATED: {
    text: "DONE",
    background: "bg-gray01/20",
    iconBg: "bg-neutral-400",
  },
};

export const urlPath = {
  HOME: "/",
  TRANSACTION_HISTORY: "/transaction-history", //거래 조회
  ACCOUNT_LIST: "/account-list",
  TRANSFER: "/transfer",
  DONE: "/transfer/done",
  ALARM: "/alarm",
  ALARM_CARD: "/alarm/card",
  MISSION: "/mission",

  SIGNUP_SELECT: "/signup/select", // 부모 자녀 선택(임시)
  SIGNUP_REGFOM: "/signup/regform", //회원가입 개인정보 입력
  SIGNUP_REGFOM_PHONE: "/signup/phone", //회원가입 개인정보 입력
  SELECT_PARENT_PASSWORD: "/signup/password",
  SELECT_PARENT_PASSWORD_CONFIRM: "/signup/password/confirm",
  SELECT_CHILD_APPLY: "/signup/parent-apply",
  SELECT_CHILD_APPLY_CONFIRM: "/signup/parent-apply/confirm",
  CARD_VERIFICATION_CONFIRM: "/parent/card/verification/confirm",

  //자식에서 카드신청 url
  CHILD_CARD_SELECT: "/child/card/card-select",
  CHILD_CARD: "/child/card",
  CHILD_CARD_COMPLETE: "/child/card/complete",

  //부모 url
  PARENT_ACCOUNT: "/parent/account",
  PARENT_CARD_APPLY: "/parent/card/apply",
  PARENT_CARD_CHECK: "/parent/card/apply/check",
  PARENT_CARD_PASSWORD: "/parent/card/apply/password",
  PARENT_CARD_CONFIRM: "/parent/card/apply/confirm",
  PARENT_CARD_SETUP: "/parent/card/apply/card-setup",
  PARENT_CARD_ACCOUNT: "/parent/card/apply/account",
  PARENT_CARD_VERIFICATION: "/parent/card/verification",
  PARENT_CARD_ALARM: "/parent/card/alarm",

  PARENT_CARD_DELIVERY: "/parent/card/delivery",
  PARENT_CARD_DELIVERY_COMPLETE: "/parent/card/delivery/completed",

  // 송금 관련
  MISSION_TRANSFER: "/mission/transfer",
  MISSION_TRANSFER_PASSWORD: "/mission/transfer/password", // 송금 비밀번호 등록
  MISSION_TRANSFER_DONE: "/mission/transfer/done", // 송금 완료

  //금융아티클
  FINANCIAL: "/financial",
  MYPAGE: "/mypage",
};
