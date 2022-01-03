import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="grid place-items-center gap-[.5rem] bg-slate-900 py-[2rem]">
      <div>
        <a
          href="https://github.com/sandipshiwakoti"
          className="inline-block mr-[1rem]"
        >
          <FaGithub className="text-3xl text-white" />
        </a>
        <a
          href="https://linkedin.com/in/sandip-shiwakoti-a88317208/"
          className="inline-block"
        >
          <FaLinkedin className="text-3xl text-white" />
        </a>
      </div>
      <h1 className="font-semibold text-center text-lg text-gray-100">
        Made with ❤ by Sandip Shiwakoti
      </h1>
    </footer>
  );
};

export default Footer;
