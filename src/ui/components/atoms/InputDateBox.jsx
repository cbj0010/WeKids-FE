import { useEffect, useState } from "react";

const InputDateBox = ({
  width = "100%",
  height = 40,
  value = "",
  label = "미션 만료일",
  onChange,
  className,
}) => {
  const [dateValue, setDateValue] = useState(value);

  useEffect(() => {
    setDateValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDateValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col w-full mb-3" style={{ width }}>
      {label && (
        <label
          htmlFor="date-input"
          className="block text-R-14 font-medium text-sub02 mb-2"
        >
          {label}
        </label>
      )}
      <div className={`rounded-lg shadow-md ${className}`}>
        <input
          id="date-input"
          type="date"
          value={dateValue}
          onChange={handleChange}
          className={`w-full h-full p-2 bg-transparent rounded-md text-R-12 ${value != "" ? "text-black/80" : "text-neutral-400"}  resize-none outline-none`}
          style={{ height }} // 높이를 직접 지정
        />
      </div>
    </div>
  );
};

export default InputDateBox;
