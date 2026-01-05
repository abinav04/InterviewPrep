import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 transition-shadow duration-200 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-xl p-5 cursor-pointer relative min-h-[160px] flex flex-col gap-3"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-14 h-14 bg-white rounded-md flex items-center justify-center mr-4 shadow-sm">
            <span className="text-lg font-semibold text-black">
              {getInitials(role)}
            </span>
          </div>
          <div className="flex-grow space-y-1">
            <h2 className="text-[18px] font-semibold text-gray-900 leading-tight">
              {role}
            </h2>
            <p className="text-xs text-gray-800 leading-snug">
              {topicsToFocus}
            </p>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded-full text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-3 right-3"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="text-[11px] font-medium text-black px-3 py-1.5 border border-gray-900/70 rounded-full bg-white">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>
          <div className="text-[11px] font-medium text-black px-3 py-1.5 border border-gray-900/70 rounded-full bg-white">
            {questions} Q&A
          </div>
          <div className="text-[11px] font-medium text-black px-3 py-1.5 border border-gray-900/70 rounded-full bg-white">
            Last Updated: {lastUpdated}
          </div>
        </div>
        <p className="text-[13px] text-gray-600 font-medium leading-relaxed mt-3 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
