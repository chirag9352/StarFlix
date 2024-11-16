import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ data, index, trending, media_type }) => {
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const mediaType = data.media_type ?? media_type;
  return (
    <div className="overflow-hidden rounded-lg object-cover relative">
      <Link to={"/" + mediaType + "/" + data.id}>
        {data?.poster_path ? (
          <img
            src={imageURL + data?.poster_path}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center h-full bg-neutral-800">
            No Image Found
          </div>
        )}

        <div className=" absolute top-4">
          {trending && (
            <div className="text-xl font-bold py-2 pl-2 pr-3 text-red-600 rounded-r-full backdrop-blur-3xl bg-black">
              #{index}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
