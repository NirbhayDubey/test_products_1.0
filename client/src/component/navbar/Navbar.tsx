import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { storageRequest } from "../../helpers/storageRequests";

const Navbar: FC<unknown> = () => {
  const location = useLocation();
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const token = storageRequest.getAuth();
    if (token) return setShowLinks(true);
    setShowLinks(false);
  }, [location.pathname]);

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
        <div className="flex items-center gap-8 text-sm">
          {showLinks && (
            <>
              <div>
                <Link to="/product">Products</Link>
              </div>
              <div>
                <Link to="/edit-product">Edit Products</Link>
              </div>
              <div>
                <Link
                  to="/logout"
                  className="bg-[#fdc886] py-2.5 px-6 rounded-lg shadow"
                >
                  Logout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
