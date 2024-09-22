"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ClientNavBtn: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Image onClick={handleBack} src="/svg/Icon.svg" height={16} width={16} alt="start icon" />
  )  
;
};

export default ClientNavBtn;
