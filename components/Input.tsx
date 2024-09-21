import React from "react";
import { inputProps } from "@/types/main";

const Input = (props:inputProps ) => {
  return (
    <div>
      <input
        type={props.inputType}
        name={props.inputName}
        id={props.inputName}
        className="border border-gray-400 text-sm rounded-lg font-[400] focus:ring-blue-500 focus:border-[#8a226ec8] block w-full p-[10px]  dark:text-dark dark:focus:ring-blue-500 "
        placeholder={props.holderText}
      />
    </div>
  );
};

export default Input;
