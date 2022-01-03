import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import Photo from "../components/Photo";
import { useGlobalContext } from "../context";
import GridLoader from "react-spinners/GridLoader";

const Photos = () => {
  const [loading, setLoading] = useState(true);
  const { search, setSearch, page, setPage, photos, setPhotos } =
    useGlobalContext();
  const searchRef = useRef(null);

  const fetchData = async () => {
    try {
      let searchURL = `https://pixabay.com/api?page=${page}&q=${search}&key=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(searchURL);
      if (response.status === 400) {
        if (process.env.NODE_ENV === "production") {
          console.clear();
        }
        throw new Error("Photo not found!");
      }
      const { hits: data } = await response.json();
      setPhotos((oldPhotos) => {
        if (page === 1) {
          return data;
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  // useEffect(() => {
  //   // setPage(1);
  //   fetchData();
  //   // eslint-disable-next-line
  // }, [setPage]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const innerHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
      const scrollYHeight = window.scrollY;

      if (!loading && innerHeight + scrollYHeight >= bodyHeight - 105) {
        setPage((page) => page + 1);
      }
    });

    return () => {
      window.removeEventListener("scroll", event);
    };
  }, [loading, setPage]);

  useEffect(() => {
    searchRef.current.focus();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white w-full flex flex-col items-center p-[1rem] min-h-[40rem]">
      <h1 className="section-title !text-4xl !my-[1rem]">NepStock Photos</h1>
      <form className="flex relative mb-[2rem]" onSubmit={handleSubmit}>
        <input
          type="text"
          className="font-semibold py-[.8rem] pr-[3.2rem] pl-[.7rem] text-black text-xl w-[20rem] sm:w-[30rem] max-w-[30rem]  rounded-md border-2 border-black placeholder:font-semibold"
          placeholder="Search for awesome images"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button type="submit">
          <FaSearch
            className="text-gray-600 text-2xl absolute right-[1rem] top-[1rem] cursor-pointer hover:text-sky-900"
            type="button"
          />
        </button>
      </form>
      <div className="grid image-gallery grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.5rem]">
        {loading ? (
          <h1>{}</h1>
        ) : photos.length > 0 ? (
          photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })
        ) : (
          <h1 className="col-span-4 text-center text-3xl font-mono font-bold">
            Search not found!
          </h1>
        )}
      </div>
      <GridLoader
        color="gray"
        loading={loading}
        css={{ display: "block", margin: "0 auto" }}
        size={25}
      />
      <FaArrowUp
        className="fixed bottom-0 right-0 text-white cursor-pointer -translate-x-2 -translate-y-3 text-3xl bg-slate-700 rounded-md p-[.2rem] z-50"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
};

export default Photos;
