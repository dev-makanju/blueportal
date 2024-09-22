import React from "react";
import Image from "next/image";
import Button from "../Button";
import { progressTrackerTypes } from '@/types/main'
import { useRouter } from "next/navigation";

export default function OnBoardingLayout({
  children,
  onButtonClick,
  progressTracker,
}: {
  progressTracker: progressTrackerTypes,
  children: React.ReactNode;
  onButtonClick: () => void;
}) {
  const router = useRouter()
  const { progress, totalStage } = progressTracker;
  const handleRedirect  = () => {
    router.back()
  }
  return (
    <main className="relative h-screen">
      <header>
        <div className="flex p-5 gap-4">
          <Image
            onClick={handleRedirect}
            src={"/svg/Icon.svg"}
            height={16}
            width={16}
            alt="start icon"
          />
          <h1 className="font-bold text-[16px]">Get Started</h1>
        </div>
        <div className="flex flex-row gap-4 pt-3 pl-4 pr-4">
          {Array.from({ length: totalStage }).map((_, index) => (
            <div key={index} className="w-full bg-gray-200 rounded-full h-[4px]">
              <div
                className={`bg-[#8A226F] h-[4px] rounded-full`}
                style={{
                  width: `${progress > index ? 100 : 0}%`
                }}
              ></div>
            </div>
          ))}
        </div>
      </header>
      {children}

      <div className="absolute bottom-0 right-0 left-0">
      <hr/>
       <div className="pl-5 pr-5 mt-3 mb-3">   
          <Button
            variant="PRIMARY"
            renderText="Continue"
            onClick={onButtonClick}
          />
       </div>
      </div>
    </main>
  );
}
