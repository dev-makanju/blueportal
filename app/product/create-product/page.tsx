"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ScrollWrapper from "@/components/wrappers/ScrollWrapper";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter()
  const handleCancel = () => {
    console.log("cancel");
  };

  const handleSave = () => {
    router.push('/product/majshbjwqkbq_mwdhn')
  };

  const addImage = () => {
    console.log('add')
  }

  return (
    <main>
        <header className="flex justify-between pl-5 pr-5 items-center mb-4 mt-4">
            <div className="flex gap-4">
            <Image onClick={() => router.back()} src="/svg/Icon.svg" height={16} width={16} alt="start icon" />
            <h1 className="font-bold text-[16px]">Create a Product</h1>
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
            <div className="pl-5 pr-5 flex justify-between items-center mb-6">
                <div className="flex gap-1 border rounded-full pr-2 pl-2">
                <h1 className="text-sm text-gray-500">Draft</h1>
                <Image src="/svg/check.svg" height={16} width={16} alt="start icon" />
                </div>
                <h1 onClick={() => router.push('/product/preview')} className="font-bold text-[14px] text-[#8A226F]">Preview product</h1>
            </div>            
            <ScrollWrapper renderText="Basic details">
                <div className="flex flex-col gap-4 pr-5 pl-5">
                <Input
                    inputType="text"
                    inputName="store-name"
                    holderText="Product Title"
                />
                <textarea
                    id="message"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-400 "
                    placeholder="Write your thoughts here..."
                ></textarea>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input 
                            inputType="text" 
                            inputName="store-name" 
                            holderText="Product description" 
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            inputType="text"
                            inputName="tagname"
                            holderText="Old Price"
                        />
                    </div>
                </div>
                <textarea
                    id="collection"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-400 "
                    placeholder="Product collection"
                ></textarea>
                <Input
                    inputType="text"
                    inputName="store-name"
                    holderText="Inventory Stocks"
                />
                </div>
            </ScrollWrapper>
            <hr className="mt-5 mb-5"/>
            <ScrollWrapper renderText="Product images">
                <div className="flex flex-col gap-4 pr-5 pl-5">
                   <Button onClick={addImage} variant="SECONDARY" renderText="Add Image" showRightIcon={<div>
                    <Image src="/svg/AddIcon.svg" height={16} width={16} alt="start icon" />
                   </div>}/>
                </div>
            </ScrollWrapper>
            <hr className="mt-5 mb-5"/>
            <div className="flex flex-col gap-4 pr-5 pl-5">
               <h1 className='font-bold text-sm'>Inventory variations</h1>
               <div className='flex flex-row items-center gap-3'>
                    <input  
                        id="red-checkbox" 
                        type="checkbox"  
                        className="w-4 h-4 text-[#8A2267] border-gray-300 focus:ring-transparent accent-[#8A2267]"
                    />
                    <label htmlFor="red-checkbox" className="text-sm text-gray-400">This product is variable; has different colors, sizes, weight, materials, etc.</label>
               </div>
            </div>
            <hr className="mt-5 mb-5"/>
            <ScrollWrapper renderText="Shipping">
                <div className="flex flex-col gap-4 pr-5 pl-5">
                    <div className="flex justify-between items-center me-4">
                        <label htmlFor="red-checkbox" className="text-sm text-black">Self shipping</label>
                        <input 
                            checked 
                            id="red-checkbox" 
                            type="checkbox" 
                            className="w-4 h-4 text-[#8A2267] border-gray-300 focus:ring-transparent accent-[#8A2267]"
                        />
                    </div>
                    <div className="flex justify-between items-center me-4">
                        <label htmlFor="red-checkbox" className="text-sm text-black">InstaShop shipping</label>
                        <input  
                            id="red-checkbox" 
                            type="checkbox"  
                            className="w-4 h-4 text-[#8A2267] border-gray-300 focus:ring-transparent accent-[#8A2267]"
                        />
                    </div>

                    <Input
                        inputType="text"
                        inputName="store-name"
                        holderText="Inventory Stocks"
                    />
                </div>
            </ScrollWrapper>
            <div>
                <hr className="mt-5 mb-5"/>
                <div className="flex gap-2 p-5">
                    <div className="flex-1">
                    <Button
                        renderText="Cancel"
                        variant="NO_FILL"
                        onClick={handleCancel}
                    />
                    </div>
                    <div className="flex-1">
                    <Button renderText="Save" variant="PRIMARY" onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default Page;
