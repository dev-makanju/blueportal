import React from 'react'

const Comment = () => {
  return (
    <div className="border-2 p-1 mt-5 lg:mt-0 bg-gray-50">
        <h3 className="text-lg  pl-3 pt-2 font-bold mb-4">Discussions</h3>
        <section className="relative rounded-lg">
          <div className="flex-1 overflow-y-auto h-[300px] max-h-[350px]">     
            <div className="flex items-start gap-2.5 border-1 p-1 w-4/5">
                <div className="p-1 font-bold bg-[#FFF] text-sm rounded-full border-2">AB</div>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-[#000">Bonnie Green</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                    </div>
                    <p className="text-sm font-normal py-2 text-[#000]">{`Thats awesome. I think our users will really appreciate the improvements.`}</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
            </div>
            <div className="flex items-start float-right gap-2.5 border-1 p-1 w-4/5">
                <div className="p-1 font-bold bg-[#FFF] text-sm rounded-full border-2">AB</div>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-[#000">Bonnie Green</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                    </div>
                    <p className="text-sm font-normal py-2 text-[#000]">{`Thats awesome. I think our users will really appreciate the improvements.`}</p>
                    <span className="text-sm font-normal text-red-400 cursor-pointer">Failed | Resend</span>
                </div>
            </div>
          </div>
          <div className='absolute left-0 right-0 bottom-0 border-2 rounded-lg text-sm'>
              <input
                type="text"
                placeholder="Type a message..."
                className="mt-2 p-2 w-full rounded focus:outline-none"
              />
          </div>
        </section>
    </div>
  )
}

export default Comment