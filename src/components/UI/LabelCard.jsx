import React from "react";

const LabelCard = ({ type, title, fileCount, coins }) => {
  return (
    <div className="relative flex flex-col gap-[10px] rounded-xl bg-white p-4 ring ring-indigo-50 w-[300px] group cursor-pointer">
      <div className="flex row items-center gap-[5px] h-[50px]">
        <img
          className="h-[45px] w-[45px]"
          src={`/icons/types/${type}.svg`}
          alt={type}
        />
        <p className="font-semibold text-[16px] leading-[20px]">{title}</p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-center w-[75px] h-[30px] rounded-xl border bg-indigo-500 bg-opacity-50 py-1 text-[12px] font-bold text-white">
          {fileCount} Files
        </div>
        <div className="flex flex-row gap-[7px] items-center h-[30px] justify-center">
          <img className="h-[30px]" src="/icons/coin.svg" alt="" />
          <span className="text-[20px] font-[600]">{coins}</span>
        </div>
      </div>
    </div>
  );
};

export default LabelCard;
