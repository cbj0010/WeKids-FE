// src/constants/characterInfo.js

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

export const urlPath = {
  HOME: "/",
  TRANSACTION_HISTORY: "/transaction-history",
  ACCOUNT_LIST: "/account-list",
  TRANSFER: "/transfer",
  DONE: "/transfer/done",
  ALARM: "/alarm",
  ALARM_CARD: "/alarm/card",

  SIGNUP_SELECT: "/signup/select", // 부모 자녀 선택(임시)
  SIGNUOP_REGFOM: "/signup/regform", //회원가입 개인정보 입력
  SIGNUOP_REGFOM_PHONE: "/signup/regform/phone", //회원가입 개인정보 입력
  SELECT_PARENT_PASSWORD: "/signup/select/parent/password",
  SELECT_PARENT_PASSWORD_CONFIRM: "/signup/select/parent/password/confirm",
  SELECT_CHILD_APPLY: "/signup/select/child/parent-apply",
  SELECT_CHILD_APPLY_CONFIRM: "/signup/select/child/parent-apply/confirm",
  CARD_VERIFICATION_CONFIRM: "/card/verification/confirm",

  //자식에서 카드신청 url
  CHILD_CARD_SELECT: "/child/card/card-select",
  CHILD_CARD: "/child/card",

  //부모 입장
  PARENT_ACCOUNT: "/parent/account",
  PARENT_CARD_APPLY: "/parent/card/apply",
  PARENT_CARD_PASSWORD: "/parent/card/apply/password",
  PARENT_CARD_CONFIRM: "/parent/card/apply/confirm",
  PARENT_CARD_DELIVERY_COMPLETE: "/parent/card/delivery/completed",
};
