'use client';
import React from "react";
import { ButtonProps } from "@/types/main";

const Button: React.FC<ButtonProps> = ({variant,renderText,onClick, loading ,showRightIcon, showLeftIcon}) => {
  return (
    <div>
       {  variant === 'SECONDARY' ? (
          <button
            type="button"
            disabled={loading}
            className="bg-[#eee] flex items-center justify-center text-[#8A226F] border w-full font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2"
            onClick={onClick}
            >
            {showLeftIcon && <span className="ml-2">{showLeftIcon}</span>}
            {renderText}
            {showRightIcon && <span className="ml-2">{showRightIcon}</span>}
            </button>
       ):(
        <button
            type="button"
            disabled={loading}
            className={`${
            variant == "NO_FILL"
                ? "bg-none text-[#8A226F] border border-[#8A226F]"
                : "bg-[#8A226F] text-white shadow-[0_4px_10px_0_rgba(138,34,111,0.6)]"
            } w-full font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2`}
            onClick={onClick}
        >
            {renderText}
        </button>
       )} 
    </div>
  );
};

export default Button;
