'use client'
import React, {useState} from 'react'
import Step1 from '@/components/onboarding/step1'
import Step2 from '@/components/onboarding/step2'
import Step3 from '@/components/onboarding/step3'
import OnBoardingLayout from '@/components/wrappers/OnBoardingLayout'
import {progressTrackerTypes} from '@/types/main'

const page = () => {
    const [tracker, setTracker] = useState<progressTrackerTypes>({
       progress: 1,
       totalStage: 3,
    })
    const handleUserProgress = () => {
        if(tracker.progress < tracker.totalStage){
            setTracker((prev) => ({
                ...prev,
                progress: prev.progress + 1
            }));
        }
    }

    
    const renderSteps = () => {
        switch(tracker.progress) {
           case 1:
             return <Step1/> 
           case 2:
             return <Step2/>
           case 3:
             return <Step3/>
           default:
             return <Step1/>
        }
    }
    return (
        <OnBoardingLayout progressTracker={tracker} onButtonClick={handleUserProgress}>
            {renderSteps()}
        </OnBoardingLayout>
    )
}

export default page