import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import useAuthStore from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMemue = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { user, logout } = useAuthStore();
  console.log(user);
  
  const {setContentType} = useContentStore();
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>
        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to={"/"} className="hover:underline text-white" onClick={() => setContentType("movie")}>
            Movies
          </Link>
          <Link to={"/"} className="hover:underline" onClick={() => setContentType("tv")}>
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>
      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="siz-6 cursor-pointer" />
        </Link>
        <img
          src={user?.image
          }
          alt="Avatar"
          className="h-8 rounded cursor-pointer "
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
      <div className="sm:hidden">
        <Menu className="siz-6 cursor-pointer" onClick={toggleMobileMemue}/>
      </div>
      </div>

      {/* Mobile Navbar Items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMemue}
          >
            Movies
          </Link>
          <Link
            to={"/tv"}
            className="block hover:underline p-2"
            onClick={toggleMobileMemue}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMemue}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
