import React from "react";

const TransactionDetail = ({ label, value = 0, type="" }) => {
  return (
    <div className="flex justify-between my-6">
      <span>{label}</span>
      <span>{value.toLocaleString()}{type=="money" ? "원" : ""}</span>
    </div>
  );
};

export default TransactionDetail;
