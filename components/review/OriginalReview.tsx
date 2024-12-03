import React, { useState, useEffect } from "react";

const OriginalReview = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRating =  (val: number) => {
    setRating(val);
  };

  const fetchUserRating = async () => {
    //
  };

  useEffect(() => {
    fetchUserRating();
  }, []);

    return (
    <div className="p-1">
      <small className="p-1">Add rating</small>
      <ul className="flex gap-1 p-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <li
            key={value}
            onClick={() => handleRating(value)}
            className={`border-2 p-1 rounded cursor-pointer ${ 
              rating === value ? "bg-yellow-500 text-[#000]" : ""
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OriginalReview;
