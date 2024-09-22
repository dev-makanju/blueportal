"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ScrollWrapper from "@/components/wrappers/ScrollWrapper";

const Page = () => {
  const handleCancel = () => {
    console.log("cancel");
  };

  const handleSave = () => {
    console.log("save");
  };

  return (
    <main>
        <header className="flex justify-between pl-5 pr-5 items-center mb-4 mt-4">
            <div className="flex gap-4">
                <Image src="/svg/Icon.svg" height={16} width={16} alt="start icon" />
                <h1 className="font-bold text-[16px]">Product preview</h1>
            </div>
            <Image
                src="/svg/more_vert.svg"
                height={20}
                width={20}
                className="mr-2"
                alt="menu icon"
            />
        </header>
        <div>
            <div className="h-[400px]">
                <img
                    src="/images/Frame.png"	
                    className="mr-2 object-cover h-full w-full"
                    alt="menu icon"
                />
            </div>
            <div className="w-full flex gap-2 justify-between mb-2 mt-4 pr-5 pl-5">
                <h1 className="font-bold">Gucci bag – the epitome of luxury and sophistication</h1>
                <div className="flex items-center gap-2">
                    <Image 
                        src="/svg/share.svg"
                        height={25}
                        width={25}
                        className="rounded-full bg-[#eee] p-1"
                        alt="menu icon"
                    />
                    <Image 
                        src="/svg/favorite.svg"
                        height={25}
                        width={25}
                        className="rounded-full bg-[#eee] p-1"
                        alt="menu icon"
                    />
                </div>
            </div>
            <div className="w-full flex gap-2 justify-between mb-2 mt-2 pr-5 pl-5">
                <div className="flex items-center gap-2">
                    <h1 className="text-black text-[20px]">₦18.0</h1><span className="text-gray-400 text-sm">₦28.0</span> <span className="rounded-full bg-[#8A226F] pl-2 pr-2 text-white">25% OFF</span>
                </div>
                <div className="flex items-center">
                    <span className="text-yellow-500">&#9733;</span>
                    <span className="text-yellow-500">&#9733;</span>
                    <span className="text-yellow-500">&#9733;</span>
                    <span className="text-yellow-500">&#9733;</span>
                    <span className="text-yellow-500">&#9733;</span>
                    <span className="ml-2 text-gray-400">(5 sold)</span>
                </div>
            </div>
            <hr className="mt-5 mb-5"/>          
            <div className="w-full flex flex-col gap-2 justify-between mb-2 mt-2 pr-5 pl-5">
                <h1 className="text-black font-bold text-sm">Select variants</h1>
                <p className="text-[12px] text-gray-400">Size: SMALL</p>
                <div className="flex flex-wrap gap-4">
                    <span className='w-[fit-content] text-sm pl-2 pr-2 cursor-pointer rounded-full bg-[#eee] border hover:bg-black hover:text-white'>Filter</span>
                    <span className='w-[fit-content] text-sm pl-2 pr-2 cursor-pointer rounded-full bg-[#eee] border hover:bg-black hover:text-white'>Filter</span>
                    <span className='w-[fit-content] text-sm pl-2 pr-2 cursor-pointer rounded-full bg-[#eee] border hover:bg-black hover:text-white'>Filter</span>
                </div>
                <p className="text-[12px] text-gray-400">Color: White</p>
                <div className="flex flex-wrap gap-4">
                    <span className='w-[fit-content] text-sm pl-2 pr-2 cursor-pointer rounded-full bg-[#eee] border hover:bg-black hover:text-white'>Filter</span>
                    <span className='w-[fit-content] text-sm pl-2 pr-2 cursor-pointer rounded-full bg-[#eee] border hover:bg-black hover:text-white'>Filter</span>
                    <span className='w-[fit-content] text-sm pl-2 pr-2 cursor-pointer rounded-full bg-[#eee] border hover:bg-black hover:text-white'>Filter</span>
                </div>
            </div>
            <hr className="mt-5 mb-5"/>
            <ScrollWrapper renderText="Product description">
                <div className="flex flex-col gap-4 pr-5 pl-5">
                   <p>Wholesale and drop shipping are both welcomed. For wholesale,we will offer discount or free express shipping which only takes 3-7 days to arrive. For drop shipping,we could send the goods to your customers directly and won't leave information about us if you'd like to. How can track my parcel? What can I do when purchase protection time is running out? If your purchase protection time is running out, please contact us and we can help you to extend it. So your money will not go to my account.</p>
                   <p className="text-sm text-[#8A226F]">read more</p>
                </div>
            </ScrollWrapper>
            <hr className="mt-5 mb-5"/>
            <ScrollWrapper renderText="About this vendor">
                <div className="flex flex-col gap-4 pr-5 pl-5">
                 <div className="w-full flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex justify-center border-2 items-center bg-[#eee] rounded-full h-[70px] w-[70px]">
                          <Image 
                            src="/images/Product-Image.png"
                            height={70}
                            width={70}
                            className="rounded-full object-fit"
                            alt="menu icon"
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="tex-black text-sm">Gucci Store</h2>
                          <p className="text-gray-400 text-[12px] flex">Fashion &bull; ★ 5.4 &bull; <Image src='/svg/people.svg' width={15} height={15}/> 100k</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className='text-[#8A2267]'>follow</p>
                      </div>
                  </div>
                  <div className="flex flex-col gap-4">
                   <p> please contact us and we can help you to extend it. So your money will not go to my account.</p>
                   <div className="flex flex-wrap gap-4">
                      <span className='w-[fit-content] text-sm p-2 rounded-full bg-[#eee] border'>Quality goods</span>
                      <span className='w-[fit-content] text-sm p-2 rounded-full bg-[#eee] border'>Nice Design</span>
                      <span className='w-[fit-content] text-sm  p-2 rounded-full bg-[#eee] border'>Quality goods</span>
                      <span className='w-[fit-content] text-sm p-2 rounded-full bg-[#eee] border'>Quality goods</span>
                   </div>
                </div>
                </div>
            </ScrollWrapper>
            <div>
                <hr className="mt-5 mb-5"/>
                <div className="p-5">
                    <Button renderText="Publish" variant="PRIMARY" onClick={handleSave} />
                </div>
            </div>
        </div>
    </main>
  );
};

export default Page;
