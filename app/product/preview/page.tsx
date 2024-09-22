import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ScrollWrapper from "@/components/wrappers/ScrollWrapper";
import { ProductData } from "../../../types/main";
import ClientNavBtn from "@/components/ClientNavBtn";

const fetchProductData = async (): Promise<ProductData> => {
  return {
    title: "Gucci bag – the epitome of luxury and sophistication",
    price: 18000,
    originalPrice: 28000,
    discount: 25,
    rating: 5.0,
    reviews: 5,
    vendor: {
      name: "Gucci Store",
      followers: "100k",
      rating: 5.4,
    },
  };
};

const Page = async ({ params }: { params: { productId: string } }) => {
  const productData = await fetchProductData();

  return (
    <main>
      <header className="flex justify-between pl-5 pr-5 items-center mb-4 mt-4">
        <div className="flex gap-4">
          <ClientNavBtn />
          <h1 className="font-bold text-[16px]">Product preview</h1>
        </div>
        <Image src="/svg/more_vert.svg" height={20} width={20} className="mr-2" alt="menu icon" />
      </header>
      <div>
        <div className="h-[400px]">
          <img src="/images/Frame.png" className="mr-2 object-cover h-full w-full" alt="menu icon" />
        </div>
        <div className="w-full flex gap-2 justify-between mb-2 mt-4 pr-5 pl-5">
          <h1 className="font-bold">{productData.title}</h1>
          <div className="flex items-center gap-2">
            <Image src="/svg/share.svg" height={25} width={25} className="rounded-full bg-[#eee] p-1" alt="menu icon" />
            <Image src="/svg/favorite.svg" height={25} width={25} className="rounded-full bg-[#eee] p-1" alt="menu icon" />
          </div>
        </div>
        <div className="w-full flex gap-2 justify-between mb-2 mt-2 pr-5 pl-5">
          <div className="flex items-center gap-2">
            <h1 className="text-black text-[20px]">₦{productData.price.toLocaleString()}</h1>
            <span className="text-gray-400 text-sm">₦{productData.originalPrice.toLocaleString()}</span>
            <span className="rounded-full bg-[#8A226F] text-[14px] pl-2 pr-2 text-white">{productData.discount}% OFF</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 text-[10px]">&#9733;</span>
            <span className="text-yellow-500 text-[10px]">&#9733;</span>
            <span className="text-yellow-500 text-[10px]">&#9733;</span>
            <span className="text-yellow-500 text-[10px]">&#9733;</span>
            <span className="text-yellow-500 text-[10px]">&#9733;</span>
            <span className="ml-2 text-gray-400 text-[12px]">({productData.reviews} sold)</span>
          </div>
        </div>
        <hr className="mt-5 mb-5" />
        <ScrollWrapper renderText="Product description">
          <div className="flex flex-col gap-4 pr-5 pl-5">
            <p>Wholesale and drop shipping are both welcomed...</p>
            <p className="text-sm text-[#8A226F]">read more</p>
          </div>
        </ScrollWrapper>
        <hr className="mt-5 mb-5" />
        <ScrollWrapper renderText="About this vendor">
          <div className="flex flex-col gap-4 pr-5 pl-5">
            <div className="w-full flex justify-between mb-2">
              <div className="flex items-center">
                <div className="flex justify-center border-2 items-center bg-[#eee] rounded-full h-[70px] w-[70px]">
                  <Image src="/images/Frame.png" height={70} width={70} className="rounded-full object-fit" alt="menu icon" />
                </div>
                <div className="ml-2">
                  <h2 className="tex-black text-sm">{productData.vendor.name}</h2>
                  <p className="text-gray-400 text-[12px] flex">Fashion &bull; ★ {productData.vendor.rating} &bull; {productData.vendor.followers}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-[#8A2267]">follow</p>
              </div>
            </div>
          </div>
        </ScrollWrapper>
        <div>
          <hr className="mt-5 mb-5" />
          <div className="p-5">
            <Button renderText="Publish" variant="PRIMARY" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
