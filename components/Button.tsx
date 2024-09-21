import React from "react";
import { buttonVariant } from "@/types/main";

const Button = ({
  variant,
  renderText,
  onClick,
}: {
  variant: buttonVariant;
  renderText: string;
  onClick: () => void;
}) => {
  return (
    <div className="p-5">
      <button
        type="button"
        className="text-white bg-[#8A226F] w-full shadow-[0_4px_10px_0_rgba(138,34,111,0.6)] font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2"
        onClick={onClick}
      >
        {renderText}
      </button>
    </div>
  );
};

export default Button;
