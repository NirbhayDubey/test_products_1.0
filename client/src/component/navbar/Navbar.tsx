import React, { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC<any> = () => {
  return (
    <nav className="pt-6">
      <div className="max-w-6xl mx-auto flex justify-between px-2.5">
        <div className="">
          <img
            className="h-10"
            src="/assets/images/brainerhub_logo.svg"
            alt=""
          />
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <a href="">Sign up</a>
          </div>
          <div>
            <Link to="/product">Goto Products</Link>
          </div>
          <div>
            <Link
              to="/logout"
              className="bg-[#fdc886] py-2.5 px-6 rounded-lg shadow"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
