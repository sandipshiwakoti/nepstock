import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";
import GridLoader from "react-spinners/GridLoader";
import { NotFound } from "../pages";
import DefaultProfileImage from "../images/default-profile.png";

const SinglePhoto = () => {
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const URL = `https://pixabay.com/api/?id=${id}&key=${process.env.REACT_APP_API_KEY}&type=photo`;
      const response = await fetch(URL);
      if (response.status === 400) {
        if (process.env.NODE_ENV === "production") {
          console.clear();
        }
        throw new Error("Something went wrong!");
      }
      const { hits } = await response.json();
      setPhoto(hits[0]);
      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    // eslint-disable-next-line
  }, []);

  const downloadImage = () => {
    saveAs(photo.largeImageURL, `nepstock-image-${id}.jpg`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[35rem]">
        <GridLoader
          color="gray"
          loading={loading}
          css={{ display: "block", margin: "0 auto" }}
          size={25}
        />
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="bg-white">
      <div className="grid grid-col-1 md:grid-cols-[2fr_1fr] gap-[2rem] p-[2rem] ">
        <img
          src={photo.largeImageURL}
          alt={photo.type}
          className="w-full h-[15rem] sm-[20rem] md:h-[25rem] lg:h-[40rem] object-cover rounded-md shadow-sm"
        />
        <div className="">
          <div className="flex gap-[.5rem] items-center mb-[.5rem]">
            <img
              src={photo.userImageURL}
              alt={photo.user}
              className="rounded-full w-[4rem] h-[4rem]"
              onError={(e) => {
                e.target.src = DefaultProfileImage;
              }}
            />
            <h1 className="text-mono text-xl font-bold">{photo.user}</h1>
          </div>
          <div>
            <h1 className="text-gray-700 capitalize font-semibold">
              {photo.tags}
            </h1>
          </div>
          <div className="flex gap-[.5rem] items-center my-[1rem]">
            <span className="bg-blue-600 text-white text-center px-[1rem] py-[.3rem] font-semibold rounded-md">
              ❤ {photo.likes}
            </span>
            <span className="bg-blue-600 text-white text-center px-[1rem] py-[.3rem] font-semibold rounded-md">
              💬 {photo.comments}
            </span>
          </div>
          <div className="w-full p-[.5rem] bg-gray-200 shadow-xl mb-[1rem] rounded">
            <h1 className="font-semibold font-mono uppercase">
              Photo Information
            </h1>
            <p class="flex justify-between items-center capitalize text-gray-700">
              <span>Original Size</span>
              <span>{(photo.imageSize / 1000000).toFixed(2)} MB</span>
            </p>
            <p class="flex justify-between items-center capitalize text-gray-700">
              <span>Original Dimensions</span>
              <span>
                {photo.imageWidth} x {photo.imageHeight}
              </span>
            </p>
            <p class="flex justify-between items-center capitalize text-gray-700">
              <span>views</span>
              <span>{photo.views}</span>
            </p>
            <p class="flex justify-between items-center capitalize text-gray-700">
              <span>downloads</span>
              <span>{photo.downloads}</span>
            </p>
          </div>
          <button
            className="bg-green-700 w-full text-white text-center px-[2rem] py-[.5rem] mt-[1rem] font-semibold rounded-md"
            onClick={downloadImage}
          >
            <FiDownload className="inline-block mr-[.2rem]" />
            Free Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePhoto;
