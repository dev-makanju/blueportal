import React from "react";

interface SearchProps {
  showModal: boolean;
  handleTrigger: () => void; 
}

const Search: React.FC<SearchProps> = ({ showModal, handleTrigger }) => {
  return (
    <>
      {showModal && (
        <div
          id="popup-modal"
          className="bg-[#00000054] overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full md:inset-0"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleTrigger}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4  md:p-5 text-center">
                <input
                    className="p-2 mt-6 rounded-xl outline-none w-full"
                    type="text"
                    placeholder="search..."
                    />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
