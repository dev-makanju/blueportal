import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface RatingProps {
  userId: string;
  projectId: string;
}

const Review = ({ userId, projectId }: RatingProps) => {
  const [rating, setRating] = useState<number>(0);

  const handleRating = async (val: number) => {
    if (!userId || !projectId) return;

    try {
      setRating(val);
      const response = await fetch("/api/rating/add-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          projectId,
          rating: val,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Rating was not successful, try again");
      } else {
        toast.success("You have rated this project");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await fetch(
        `/api/rating?projectId=${projectId}&userId=${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        const newrating = data[0].rating
        setRating(newrating as number);
      } else {
        toast.error(data?.error || "Could not fetch your rating");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    if (!projectId || !userId) return;
    fetchUserRating();
  }, [projectId, userId]);

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

export default Review;
