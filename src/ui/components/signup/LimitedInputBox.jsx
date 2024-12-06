import { useState, useEffect } from "react";

const LimitedInputBox = ({
  text = "",
  maxLength = 7,
  placeholder = "값을 입력해주세요",
  onChange,
  security = false,
  width,
  height = 51,
  className,
}) => {
  const [inputValue, setInputValue] = useState(text);
  const [isFocused, setIsFocused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsCompleted(inputValue.length > 0);
  };

  const getStyles = () => {
    const baseStyles = {
      width: "100%",
      height: "100%",
      padding: "12px 18px 18px",
      boxSizing: "border-box",
      fontSize: 14,
      transition: "all 0.2s ease-in",
      backgroundColor: "white",
      outline: "none",
      wordBreak: "break-all", // 텍스트 자동 줄바꿈
      whiteSpace: "pre-wrap", // 줄바꿈 유지
      overflow: "auto", // 내용이 넘칠 경우 스크롤
      overflowX: "hidden", // 가로 스크롤 숨김
      overflowY: "hidden", //세로 스크롤 숨김
      resize: "none", // textarea 크기 조절 비활성화
      display: "flex",
      alignItems: "center", // 세로 중앙 정렬
      justifyContent: "center", // 가로 중앙 정렬
      lineHeight: "center", // 텍스트 가로 중앙 정렬
    };

    if (!inputValue && !isFocused) {
      // 입력 전 상태
      return {
        ...baseStyles,
        border: "1px solid #A3A3A3",
        borderRadius: "12px",
        color: "#9FA6B2",
        boxShadow: "none",
      };
    } else if (inputValue && !isFocused) {
      return {
        ...baseStyles,
        border: "1px solid #000000",
        borderRadius: "12px",
        color: "#000000",
        boxShadow: "none",
      };
    } else if (isFocused) {
      // 입력 중 상태 - 떠있는 효과를 위한 그림자 추가
      return {
        ...baseStyles,
        border: "2px solid #000000",
        borderRadius: "12px",
        color: "#000000",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        transform: "translateY(-2px)",
      };
    } else if (isCompleted) {
      // 입력 완료 상태
      return {
        ...baseStyles,
        border: "1px solid #000000",
        borderRadius: "12px",
        color: "#000000",
        boxShadow: "none",
      };
    }
  };

  const containerStyles = {
    width,
    height,
    position: "relative",
    transition: "all 0.2s ease",
  };

  return (
    <div style={containerStyles}>
      <input
        type={`${security ? "password" : "text"}`}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${className} tracking-wides`}
        style={getStyles()}
      />
    </div>
  );
};

export default LimitedInputBox;
