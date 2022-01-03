import React from "react";
import { Link } from "react-router-dom";
import DefaultProfileImage from "../images/default-profile.png";

const Photo = ({
  id,
  webformatURL: image,
  type,
  user,
  likes,
  comments,
  userImageURL,
}) => {
  return (
    <Link to={`/photos/${id}`}>
      <div className="bg-white shadow-xl relative group overflow-hidden">
        <img
          src={image}
          alt={type}
          className="w-full h-[15rem] object-cover rounded-sm"
        />
        <div className="flex justify-between items-center absolute bottom-0 bg-[rgba(0,0,0,.5)]  w-full p-2 transition-all translate-y-full group-hover:translate-y-0">
          <div className="flex gap-1 items-center">
            <img
              src={userImageURL}
              alt={user}
              className="rounded-full w-[1.8rem] h-[1.8rem]"
              onError={(e) => {
                e.target.src = DefaultProfileImage;
              }}
            />
            <h1 className="font-bold font-mono text-sm capitalize text-white">
              {user}
            </h1>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="text-gray-200">{likes}❤</h1>
            <h1 className="text-gray-200">{comments}💬</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Photo;
