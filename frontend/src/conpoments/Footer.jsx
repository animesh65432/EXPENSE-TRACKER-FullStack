import React from "react";
import { expenstrackerwebsiteimages } from "../utils";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col items-center md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <img
            src={expenstrackerwebsiteimages}
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="bg-indigo-700 text-center py-4 mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
