'use client'
import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NotificationManager from '@/components/notifications/NotificationManager';
import  InstallPrompt  from '@/components/notifications/InstallPrompt';

export default function Home() {

  const router = useRouter(); 
  const onButtonClick = () => {
    router.push('/onboarding')
  }

  return (
    <main className="relative h-screen">
      <NotificationManager/>
      <InstallPrompt/>
      <div className='flex justify-center items-center flex-col mt-4'>
         <Image
            src='/svg/ShoppingSale.svg'
            width={296}
            height={210}
            alt='shopping'
         />
         <h1 className='font-bold text-[36px]'>Welcome</h1>
         <p className='text-sm text-center'>The safest platfrom to shop from social <br/> media vendors</p>
      </div>
      <div className='p-3 rounded-xl border flex flex-col gap-3 border-[#8A226F] bg-[#FFEAFA] w-[296px] m-auto mt-4'>
         <div className='flex gap-2'>
          <Image
              src='/svg/check_circle.svg'
              width={20}
              height={20}
              alt='circle'
          />
          <p className='text-sm font-[500]'>Reach Millions of Shoppers</p>
         </div>
         <div className='flex gap-2'>
          <Image
              src='/svg/check_circle.svg'
              width={20}
              height={20}
              alt='circle'
          />
          <p className='text-sm font-[500]'>Easy Product Listing</p>
         </div>
         <div className='flex gap-2'>
          <Image
              src='/svg/check_circle.svg'
              width={20}
              height={20}
              alt='circle'
          />
          <p className='text-sm font-[500]'>Secure and Fast Payments</p>
         </div>
         <div className='flex gap-2'>
          <Image
              src='/svg/check_circle.svg'
              width={20}
              height={20}
              alt='circle'
          />
          <p className='text-sm font-[500]'>Boost Your Visibility</p>
         </div>
      </div>
      {/* {children} */}
      <div className="absolute bottom-0 border right-0 left-0 pl-2 pr-2 mb-6">
        <Button
          variant="PRIMARY"
          renderText="Get Started"
          onClick={onButtonClick}
        />
      </div>
    </main>
  );
}
