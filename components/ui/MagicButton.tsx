import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button className="p-[3px] relative" onClick={handleClick}>
      <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-500 rounded-lg" />
      <div
        className={`px-8 py-2 flex flex-row justify-center items-center gap-3 bg-white rounded-[6px]  relative group transition duration-200 text-red-600 hover:bg-transparent hover:text-white ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </div>
    </button>
  );
};

export default MagicButton;
