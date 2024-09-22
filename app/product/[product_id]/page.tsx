"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ScrollWrapper from "@/components/wrappers/ScrollWrapper";
import Input from "@/components/Input";
import InventoryVariation from '@/components/InventoryVariation'
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter()
  const handleCancel = () => {
    console.log("cancel");
  };

  const handleSave = () => {
    //
  };

  const addImage = () => {
    console.log('add')
  }

  return (
    <main>
        <header className="flex justify-between pl-5 pr-5 items-center mb-4 mt-4">
            <div className="flex gap-4">
            <Image src="/svg/Icon.svg" height={16} width={16} alt="start icon" />
            <h1 className="font-bold text-[16px]">Product details</h1>
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
                <div className="flex justify-between pr-5 pl-5 mb-5">
                    <div className="flex items-center">
                      <Image 
                        src="/images/Product-image.png"
                        height={100}
                        width={100}
                        className="mr-2 rounded-lg object-fit"
                        alt="menu icon"
                      />
                      <p>Logo.lmg</p>
                    </div>
                    <div className="flex items-center">
                       <Image
                         src="/svg/more_horiz.svg"
                         height={20}
                         width={20}
                         className="mr-2"
                         alt="menu icon"
                       />
                       <label className="inline-flex items-center me-5 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer   dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#8A226F]"></div>
                       </label>
                    </div>
                </div>
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
                <InventoryVariation />
                <div className="flex flex-col gap-4 ">
                   <Button onClick={addImage} variant="SECONDARY" renderText="Add new option" showLeftIcon={<div>
                    <Image src="/svg/add.svg" height={16} width={16} alt="start icon" />
                   </div>}/>
                </div>
            </div>
            <hr className="mt-5 mb-5"/>
            <ScrollWrapper renderText="Configure variant prices and stocks">
                <div className="flex flex-col justify-between mb-5">
                  <div className="w-full flex justify-between pr-5 pl-5 mb-5">
                      <div className="flex items-center">
                        <div className="flex justify-center items-center bg-[#eee] rounded-lg h-[50px] w-[50px]">
                          <Image 
                            src="/svg/grayIcon.svg"
                            height={25}
                            width={25}
                            className="rounded-lg object-fit"
                            alt="menu icon"
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="tex-black text-sm">Red-l-leather</h2>
                          <p className="text-gray-400 text-[12px]">₦20 . ₦20X</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src="/svg/more_horiz.svg"
                          height={20}
                          width={20}
                          className="mr-2"
                          alt="menu icon"
                        />
                      </div>
                  </div>
                  <div className="flex gap-3 pl-5 pr-5 mb-5">
                    <div className="border rounded-full flex-1 flex justify-between p-3">
                       <span className="font-bold">20</span>
                       <span className="font-bold">₦</span>
                    </div>
                    <div className="border rounded-full flex-1 flex justify-between p-3">
                      <span >20</span>
                      <span className="font-bold">Unit</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between pr-5 pl-5 mb-5">
                      <div className="flex items-center">
                        <div className="flex justify-center items-center bg-[#eee] rounded-lg h-[50px] w-[50px]">
                          <Image 
                            src="/svg/grayIcon.svg"
                            height={25}
                            width={25}
                            className="rounded-lg object-fit"
                            alt="menu icon"
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="tex-black text-sm">Red-l-leather</h2>
                          <p className="text-gray-400 text-[12px]">₦20 . ₦20X</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src="/svg/more_horiz.svg"
                          height={20}
                          width={20}
                          className="mr-2"
                          alt="menu icon"
                        />
                      </div>
                  </div>
                  <div className="w-full flex justify-between pr-5 pl-5">
                      <div className="flex items-center">
                        <div className="flex justify-center items-center bg-[#eee] rounded-lg h-[50px] w-[50px]">
                          <Image 
                            src="/svg/grayIcon.svg"
                            height={25}
                            width={25}
                            className="rounded-lg object-fit"
                            alt="menu icon"
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="tex-black text-sm">Red-l-leather</h2>
                          <p className="text-gray-400 text-[12px]">₦20 . ₦20X</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src="/svg/more_horiz.svg"
                          height={20}
                          width={20}
                          className="mr-2"
                          alt="menu icon"
                        />
                      </div>
                  </div>
                </div>
            </ScrollWrapper>
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
