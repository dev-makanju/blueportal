import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <main className="flex-grow  flex flex-col md:flex-row">
        <section className="md:w-1/2 bg-gray-700 relative rounded-lg shadow-md p-4 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <div className="flex-1 overflow-y-auto h-full">     
            <div className="flex items-start gap-2.5">
                <Image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" width={20} height={20} alt="Jeseimage"/>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                    </div>
                    <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">Thats awesome. I think our users will really appreciate the improvements.</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
            </div>
          </div>
          <div className='absolute left-0 right-0 bottom-0'>
              <input
                type="text"
                placeholder="Type a message..."
                className="mt-2 p-2 w-full rounded bg-gray-600 focus:outline-none focus:ring focus:ring-gray-400"
              />
          </div>
        </section>

        <section className="md:w-1/2 bg-white rounded-lg shadow-md p-4 text-gray-800">
          <h2 className="text-xl font-semibold mb-4">Activities</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-bold text-lg">Team Meeting</h3>
              <p className="text-gray-600">
                Discuss project updates and team assignments. Make sure everyone is on the same page regarding deadlines and deliverables.
              </p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-bold text-lg">Project Update</h3>
              <p className="text-gray-600">
                Share the latest developments on the project. Highlight any challenges faced and brainstorm solutions as a group.
              </p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-bold text-lg">Code Review</h3>
              <p className="text-gray-600">
                Review each other's code to ensure quality and best practices. Provide constructive feedback and suggestions for improvement.
              </p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-bold text-lg">Design Sprint</h3>
              <p className="text-gray-600">
                Collaborate on design concepts and prototypes. Focus on user experience and interface design to enhance the final product.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page