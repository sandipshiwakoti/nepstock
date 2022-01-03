import React, { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const HeroArea = () => {
  const { search, setSearch, setPage } = useGlobalContext();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    navigate("/photos");
  };

  useEffect(() => {
    setSearch("");
    searchRef.current.focus();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hero-area p-2">
      <h1 className="section-title !text-white">Awesome Images</h1>
      <p className="font-mono text-gray-200 font-bold text-xl md:text-2xl max-w-[40rem] text-center mb-[1rem]">
        Browse high quality stock images and royalty free images for your
        projects
      </p>
      <form className="flex relative" onSubmit={handleSubmit}>
        <input
          type="text"
          className="font-semibold py-[.8rem] pr-[3.2rem] pl-[1rem] text-slate-900 text-2xl w-[20rem] sm:w-[30rem] max-w-[30rem] rounded-md placeholder:font-thin placeholder:text-xl"
          placeholder="Search for awesome images"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button>
          <FaSearch className="text-gray-600 text-2xl absolute right-[1rem] top-[1rem] cursor-pointer hover:text-sky-900" />
        </button>
      </form>
    </div>
  );
};

export default HeroArea;
