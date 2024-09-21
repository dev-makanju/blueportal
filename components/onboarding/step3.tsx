import React, {useState} from 'react'
import Input from '../Input'
import Image from 'next/image'

const Step3 = () => {
  const [file, setFile] = useState<string>('')
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
        setFile(URL.createObjectURL(e.target.files[0]))
    }  
  }
  return (
    <div className='p-5 flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-4 justify-center border rounded-lg p-5 border-gray-400'>
            <div className='relative w-[80px] h-[80px] bg-[#eee] rounded-full flex items-center justify-center overflow-hidden'>
               <label className='bg-black bg-opacity-10 absolute w-full h-full rounded-full flex justify-center items-center' htmlFor="upload">
                    <Image
                        src={"/svg/add_a_photo.svg"}
                        height={20}
                        width={20}
                        alt="upload"
                    />
               </label>
               {file && (
                   <Image
                        src={file}
                        className='object-cover border'
                        width={100}
                        height={100}
                        alt="image"
                    />
                )}
               <input className='hidden' type="file" id='upload' onChange={handleFileChange} />
            </div>
           <p className='text-[12px] text-gray-400'>Upload store logo</p>
        </div>
        <div className='flex flex-col gap-4'>
           <Input inputType='text' inputName='store-name' holderText='Store name'/>
           <Input inputType='text' inputName='tagname' holderText='Store tag name'/>
           <Input inputType='phone' inputName='store-number' holderText='Store Phone number'/>
           <Input inputType='text' inputName='category' holderText='Category'/>
        </div>
    </div>
  )
}

export default Step3