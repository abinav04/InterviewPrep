import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpaneded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpaneded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpaneded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpaneded);
  };

  return (
    <div className="bg-white rounded-lg mb-3 overflow-hidden py-5 px-6 border border-gray-200 group hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-base font-semibold text-gray-400 flex-shrink-0">
            Q
          </span>
          <h3
            className="text-sm font-normal text-gray-900 flex-1"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>
        <div className="flex items-center gap-2 ml-6 flex-shrink-0">
          <button
            className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded transition-colors"
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff size={18} /> : <LuPin size={18} />}
          </button>
          <button
            className="flex items-center gap-2 text-sm font-medium text-teal-700 bg-teal-50 px-4 py-1.5 rounded hover:bg-teal-100 transition-colors"
            onClick={() => {
              setIsExpanded(true);
              onLearnMore();
            }}
          >
            <LuSparkles size={16} />
            <span>Learn More</span>
          </button>
          <button
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpaneded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          maxHeight: `${height}px`,
          overflow: isExpaneded ? "visible" : "hidden",
        }}
      >
        <div ref={contentRef} className="mt-4 pt-4 border-t border-gray-100">
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
